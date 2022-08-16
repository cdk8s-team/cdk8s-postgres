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
   *
   * @default - ID of the construct.
   */
  readonly team?: string;

  /**
   * Users to register with the cluster.
   *
   * @default - 'postgres' user is created with the LOGIN privileges. See USER FLAGS for more information.
   */
  readonly users?: {
    [username: string]: User;
  };


  /**
   * A mapping of Database names to usernames of users assigned to the database. The assigned user should already
   * exist on the cluster (i.e. defined in the "users" option).
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
  private readonly _defaultUsername = 'postgres';
  private readonly _defaultDatabase = 'postgres';
  public readonly team: NonNullable<ClusterProps['team']>;
  public readonly users: NonNullable<ClusterProps['users']>;
  public readonly databases: NonNullable<ClusterProps['databases']>;
  public readonly clusterName: string;
  public readonly namespace?: ClusterProps['namespace'];
  public readonly size?: NonNullable<ClusterProps['size']>;

  constructor(scope: Construct, id: string, props?: ClusterProps) {
    super(scope, id);
    const {
      namespace = 'default',
      team = this.node.id,
      users = { [this._defaultUsername]: { flags: [UserFlag.LOGIN] } },
      databases = { [this._defaultDatabase]: this._defaultUsername },
      size='1Gi',
      instances = 1,
      version = PostgresVersion.VALUE_14,
    } = props ?? {};
    this.namespace = namespace;
    this.team = team;
    this.clusterName = `${this.team}-cluster`;
    this.users = users;
    // Default database assignments to default user
    this.databases = Object.entries(databases).reduce((prev, [database, owner]) => ({ ...prev, [database]: owner || this._defaultUsername }), {});
    this.size = size;

    // If database is assigned to default user and "users" was configured (overriding default users), then add the default user to the Cluster.
    if (Object.entries(this.databases).some(([_database, owner]) => owner === this._defaultUsername) && !(this._defaultUsername in this.users) ) {
      this.users = { ...this.users, [this._defaultUsername]: { flags: [UserFlag.LOGIN] } };
      // TODO: Consider throwing an error here instead. We might want to assume that if "users" is provided, then the user is opting to handle the Cluster's users management themselves.
      // throw new Error('"users" was provided but a database is missing an assignment. Please assign each database to a user that matches a user in the provided "users" option.');
    }

    const unknownDatabaseUsers = Object.entries(this.databases).filter(([_database, owner]) => !(owner in this.users) );
    if (unknownDatabaseUsers.length > 0) {
      throw new Error(`Unknown user assigned to database. ${unknownDatabaseUsers.map(([database, owner]) => `"${database}" database is assigned to unknown user "${owner}"`).join(', ')}. Databases may only be assigned to users defined in the Cluster's "users" option.`);
    }

    new RawCluster(this, 'PostgresCluster', {
      metadata: {
        // Name is required for the Postgres Operator to recognize the resource.
        name: this.clusterName,
        namespace: this.namespace,
      },
      spec: {
        enable_cross_namespace_secret: this._someUsersHaveProperty('namespace'),
        users: Object.entries(this.users)?.reduce((prev, [username, user]) => ({
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
          size: size,
        },
      },
    });
  }


  /**
   * Returns true if any user has the given property.
   */
  private _someUsersHaveProperty(prop: keyof User) {
    return Object.values(this.users).some(user => user[prop]);
  }

  /**
   * Returns the username with it's namespace (if an alternative namespace was provided).
   *
   *  @example
   * **With** namespace defined on a user
   *  ```ts
   *  new Cluster(this, 'my-cluster', {
   *    users: {
   *     'my-user': {
   *        namespace: 'infrastructure',
   *      },
   *    },
   *  });
   *
   *  this._namespacedUsername('my-user'); // 'infrastructure.my-user'
   *  ```
   *
   *  @example
   * **Without** namespace defined on a user
   *  ```ts
   *  new Cluster(this, 'my-cluster', {
   *    users: {
   *      'my-user': {}
   *    },
   *  });
   *
   *  this._namespacedUsername('my-user'); // 'my-user'
   *  ```
   */
  private _namespacedUsername(username: string) {
    const user = this.users?.[username];
    if (!user) {
      throw new Error(`User "${username}" not found in cluster ${this.clusterName}.`);
    }
    return 'namespace' in user ? `${user.namespace}.${username}` : username;
  }

  /**
   * Returns a secret containing the credentials for a given user.
   */
  public userCredentials(username: string) {
    return kplus.Secret.fromSecretName(
      this,
      'credentials',
      `${this._namespacedUsername(username)}.${this.clusterName}.credentials.postgresql.acid.zalan.do`,
    );
  }
}
