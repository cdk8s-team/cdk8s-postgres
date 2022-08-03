import * as kplus from 'cdk8s-plus-24';
import { Construct } from 'constructs';
import { Postgresql as RawCluster } from './imports/postgresql-acid.zalan.do';
import { PostgresVersion, User, UserFlag } from './types';


export interface ClusterProps {
  /**
   * Name of the team that the cluster belongs to. You cannot change this after the
   * cluster is created. Clusters will be prefixed with this team id.
   *
   * The name will be lower cased.
   */
  readonly team: string;

  /**
   * Users to register with the cluster.
   *
   * @default - 'postgres' user is created with the LOGIN privileges. See USER FLAGS for more information.
   */
  readonly users?: {
    [username: string]: User;
  };


  /**
   * A map of database names to users who own the database. The owner users should already
   * exist on the cluster (i.e. mentioned in the user parameter).
   *
   * @default - if not provided the default database will be created with the
   * name "postgres". If no users are provided for the cluster it will be assigned to the
   * default user "postgres".
   */
  readonly databases?: { [database: string]: string };

  /**
   * The number of Postgres database instances to create.
   *
   * @default 1
   */
  readonly instances?: number;

  /**
   * The size of the target volume. Can be in Gi or Mi units.
   *
   * @default 1Gi
   */
  readonly size?: string;

  /**
   * Postgres Version
   * Defaults to latest version.
   *
   * @default - PostgresVersion.VALUE_14
   */
  readonly version?: PostgresVersion;

  /**
   * Namespace where the operator creates all Postgres resources. The Postgres Operator must be
   * installed in this namespace for resources to be recognized. Changing it after the cluster
   * creation results in deploying or updating a completely separate cluster in the target namespace.
   *
   * @default - undefined (will be assigned to the 'default' namespace)
   */
  readonly namespace?: string;
}

export class Cluster extends Construct {
  public readonly team: ClusterProps['team'];
  public readonly users: ClusterProps['users'];
  public readonly databases: ClusterProps['databases'];
  public readonly clusterName: string;
  public readonly namespace?: ClusterProps['namespace'];
  /**
   * If any user was configured with an alternative namespace.
   */
  private readonly _hasSecretNamespace: boolean;

  constructor(scope: Construct, id: string, props: ClusterProps) {
    super(scope, id);
    const { namespace, team, version, size, instances, databases, users } = props;
    this.team = team;
    this.clusterName = `${this.team}-cluster`;
    this.users = users ?? { postgres: { flags: [UserFlag.LOGIN] } };
    this.namespace = namespace ?? 'default';
    this.databases = databases;
    this._hasSecretNamespace = Object.entries(this.users ?? {}).some(([_username, user]) => Boolean(user.namespace));

    new RawCluster(this, 'PostgresCluster', {
      metadata: {
        // Name is required for the Postgres Operator to recognize the resource.
        name: this.clusterName,
        namespace: this.namespace,
      },
      spec: {
        enable_cross_namespace_secret: this._hasSecretNamespace ? true : false,
        users: Object.entries(this.users ?? {})?.reduce((prev, [username, user]) => ({
          ...prev,
          [this._namespacedUsername(username)]: [...user.flags],
        }), {}),
        databases: this.databases,
        numberOfInstances: instances ?? 1,
        postgresql: {
          // @ts-expect-error - We copied the enum but TS thinks they're different.
          version: version ?? PostgresVersion.VALUE_14,
        },
        teamId: this.team,
        volume: {
          size: size ?? '1Gi',
        },
      },
    });
  }

  /**
   * Returns the username with it's namespace (if an alternative namespace was provided).
   *
   * @example
   * namespacedUsername('postgres') => 'infrastructure.postgres'
   */
  private _namespacedUsername(username: string) {
    const user = this.users?.[username];
    if (!user) {
      throw new Error(`User "${username}" not found in cluster ${this.clusterName}.`);
    }
    return user?.namespace ? `${user.namespace}.${username}` : username;
  }

  /**
   * Returns the credentials secret for the given user.
   */
  public userCredentials(username: string) {
    return kplus.Secret.fromSecretName(
      this,
      'credentials',
      `${this._namespacedUsername(username)}.${this.clusterName}.credentials.postgresql.acid.zalan.do`,
    );
  }
}
