# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Cluster <a name="Cluster" id="cdk8s-postgres.Cluster"></a>

#### Initializers <a name="Initializers" id="cdk8s-postgres.Cluster.Initializer"></a>

```typescript
import { Cluster } from 'cdk8s-postgres'

new Cluster(scope: Construct, id: string, props: ClusterProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-postgres.Cluster.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk8s-postgres.Cluster.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-postgres.Cluster.Initializer.parameter.props">props</a></code> | <code><a href="#cdk8s-postgres.ClusterProps">ClusterProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk8s-postgres.Cluster.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk8s-postgres.Cluster.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk8s-postgres.Cluster.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk8s-postgres.ClusterProps">ClusterProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk8s-postgres.Cluster.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk8s-postgres.Cluster.userCredentials">userCredentials</a></code> | Returns the credentials secret for the given user. |

---

##### `toString` <a name="toString" id="cdk8s-postgres.Cluster.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `userCredentials` <a name="userCredentials" id="cdk8s-postgres.Cluster.userCredentials"></a>

```typescript
public userCredentials(username: string): ISecret
```

Returns the credentials secret for the given user.

###### `username`<sup>Required</sup> <a name="username" id="cdk8s-postgres.Cluster.userCredentials.parameter.username"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk8s-postgres.Cluster.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk8s-postgres.Cluster.isConstruct"></a>

```typescript
import { Cluster } from 'cdk8s-postgres'

Cluster.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk8s-postgres.Cluster.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-postgres.Cluster.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk8s-postgres.Cluster.property.clusterName">clusterName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-postgres.Cluster.property.team">team</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-postgres.Cluster.property.databases">databases</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#cdk8s-postgres.Cluster.property.labels">labels</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#cdk8s-postgres.Cluster.property.namespace">namespace</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-postgres.Cluster.property.users">users</a></code> | <code>{[ key: string ]: <a href="#cdk8s-postgres.User">User</a>}</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk8s-postgres.Cluster.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `clusterName`<sup>Required</sup> <a name="clusterName" id="cdk8s-postgres.Cluster.property.clusterName"></a>

```typescript
public readonly clusterName: string;
```

- *Type:* string

---

##### `team`<sup>Required</sup> <a name="team" id="cdk8s-postgres.Cluster.property.team"></a>

```typescript
public readonly team: string;
```

- *Type:* string

---

##### `databases`<sup>Optional</sup> <a name="databases" id="cdk8s-postgres.Cluster.property.databases"></a>

```typescript
public readonly databases: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `labels`<sup>Optional</sup> <a name="labels" id="cdk8s-postgres.Cluster.property.labels"></a>

```typescript
public readonly labels: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `namespace`<sup>Optional</sup> <a name="namespace" id="cdk8s-postgres.Cluster.property.namespace"></a>

```typescript
public readonly namespace: string;
```

- *Type:* string

---

##### `users`<sup>Optional</sup> <a name="users" id="cdk8s-postgres.Cluster.property.users"></a>

```typescript
public readonly users: {[ key: string ]: User};
```

- *Type:* {[ key: string ]: <a href="#cdk8s-postgres.User">User</a>}

---


## Structs <a name="Structs" id="Structs"></a>

### ClusterProps <a name="ClusterProps" id="cdk8s-postgres.ClusterProps"></a>

#### Initializer <a name="Initializer" id="cdk8s-postgres.ClusterProps.Initializer"></a>

```typescript
import { ClusterProps } from 'cdk8s-postgres'

const clusterProps: ClusterProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-postgres.ClusterProps.property.team">team</a></code> | <code>string</code> | Name of the team that the cluster belongs to. |
| <code><a href="#cdk8s-postgres.ClusterProps.property.databases">databases</a></code> | <code>{[ key: string ]: string}</code> | A map of database names to users who own the database. |
| <code><a href="#cdk8s-postgres.ClusterProps.property.instances">instances</a></code> | <code>number</code> | The number of Postgres database instances to create. |
| <code><a href="#cdk8s-postgres.ClusterProps.property.labels">labels</a></code> | <code>{[ key: string ]: string}</code> | Labels to apply to all Postgres resources. |
| <code><a href="#cdk8s-postgres.ClusterProps.property.namespace">namespace</a></code> | <code>string</code> | Namespace where the operator creates all Postgres resources. |
| <code><a href="#cdk8s-postgres.ClusterProps.property.size">size</a></code> | <code>string</code> | The size of the target volume. |
| <code><a href="#cdk8s-postgres.ClusterProps.property.users">users</a></code> | <code>{[ key: string ]: <a href="#cdk8s-postgres.User">User</a>}</code> | Users to register with the cluster. |
| <code><a href="#cdk8s-postgres.ClusterProps.property.version">version</a></code> | <code><a href="#cdk8s-postgres.PostgresVersion">PostgresVersion</a></code> | Postgres Version Defaults to latest version. |

---

##### `team`<sup>Required</sup> <a name="team" id="cdk8s-postgres.ClusterProps.property.team"></a>

```typescript
public readonly team: string;
```

- *Type:* string

Name of the team that the cluster belongs to.

You cannot change this after the
cluster is created. Clusters will be prefixed with this team id.

The name will be lower cased.

---

##### `databases`<sup>Optional</sup> <a name="databases" id="cdk8s-postgres.ClusterProps.property.databases"></a>

```typescript
public readonly databases: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* if not provided the default database will be created with the name "postgres". If no users are provided for the cluster it will be assigned to the default user "postgres".

A map of database names to users who own the database.

The owner users should already
exist on the cluster (i.e. mentioned in the user parameter).

---

##### `instances`<sup>Optional</sup> <a name="instances" id="cdk8s-postgres.ClusterProps.property.instances"></a>

```typescript
public readonly instances: number;
```

- *Type:* number
- *Default:* 1

The number of Postgres database instances to create.

---

##### `labels`<sup>Optional</sup> <a name="labels" id="cdk8s-postgres.ClusterProps.property.labels"></a>

```typescript
public readonly labels: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* { app: "postgres" }

Labels to apply to all Postgres resources.

---

##### `namespace`<sup>Optional</sup> <a name="namespace" id="cdk8s-postgres.ClusterProps.property.namespace"></a>

```typescript
public readonly namespace: string;
```

- *Type:* string
- *Default:* undefined (will be assigned to the 'default' namespace)

Namespace where the operator creates all Postgres resources.

The Postgres Operator must be
installed in this namespace for resources to be recognized. Changing it after the cluster
creation results in deploying or updating a completely separate cluster in the target namespace.

---

##### `size`<sup>Optional</sup> <a name="size" id="cdk8s-postgres.ClusterProps.property.size"></a>

```typescript
public readonly size: string;
```

- *Type:* string
- *Default:* 1Gi

The size of the target volume.

Can be in Gi or Mi units.

---

##### `users`<sup>Optional</sup> <a name="users" id="cdk8s-postgres.ClusterProps.property.users"></a>

```typescript
public readonly users: {[ key: string ]: User};
```

- *Type:* {[ key: string ]: <a href="#cdk8s-postgres.User">User</a>}
- *Default:* 'postgres' user is created with the LOGIN privileges. See USER FLAGS for more information.

Users to register with the cluster.

---

##### `version`<sup>Optional</sup> <a name="version" id="cdk8s-postgres.ClusterProps.property.version"></a>

```typescript
public readonly version: PostgresVersion;
```

- *Type:* <a href="#cdk8s-postgres.PostgresVersion">PostgresVersion</a>
- *Default:* PostgresVersion.VALUE_14

Postgres Version Defaults to latest version.

---

### User <a name="User" id="cdk8s-postgres.User"></a>

A Postgres user.

#### Initializer <a name="Initializer" id="cdk8s-postgres.User.Initializer"></a>

```typescript
import { User } from 'cdk8s-postgres'

const user: User = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-postgres.User.property.flags">flags</a></code> | <code><a href="#cdk8s-postgres.UserFlag">UserFlag</a>[]</code> | Permission flags for the user. |
| <code><a href="#cdk8s-postgres.User.property.namespace">namespace</a></code> | <code>string</code> | An alternative namespace to store the credentials secret in. |

---

##### `flags`<sup>Required</sup> <a name="flags" id="cdk8s-postgres.User.property.flags"></a>

```typescript
public readonly flags: UserFlag[];
```

- *Type:* <a href="#cdk8s-postgres.UserFlag">UserFlag</a>[]

Permission flags for the user.

---

##### `namespace`<sup>Optional</sup> <a name="namespace" id="cdk8s-postgres.User.property.namespace"></a>

```typescript
public readonly namespace: string;
```

- *Type:* string
- *Default:* the same namespace as the cluster.

An alternative namespace to store the credentials secret in.

---



## Enums <a name="Enums" id="Enums"></a>

### PostgresVersion <a name="PostgresVersion" id="cdk8s-postgres.PostgresVersion"></a>

Supported PostgreSQL versions.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk8s-postgres.PostgresVersion.VALUE_9_5">VALUE_9_5</a></code> | 9.5. |
| <code><a href="#cdk8s-postgres.PostgresVersion.VALUE_9_6">VALUE_9_6</a></code> | 9.6. |
| <code><a href="#cdk8s-postgres.PostgresVersion.VALUE_10">VALUE_10</a></code> | 10. |
| <code><a href="#cdk8s-postgres.PostgresVersion.VALUE_11">VALUE_11</a></code> | 11. |
| <code><a href="#cdk8s-postgres.PostgresVersion.VALUE_12">VALUE_12</a></code> | 12. |
| <code><a href="#cdk8s-postgres.PostgresVersion.VALUE_13">VALUE_13</a></code> | 13. |
| <code><a href="#cdk8s-postgres.PostgresVersion.VALUE_14">VALUE_14</a></code> | 14. |

---

##### `VALUE_9_5` <a name="VALUE_9_5" id="cdk8s-postgres.PostgresVersion.VALUE_9_5"></a>

9.5.

---


##### `VALUE_9_6` <a name="VALUE_9_6" id="cdk8s-postgres.PostgresVersion.VALUE_9_6"></a>

9.6.

---


##### `VALUE_10` <a name="VALUE_10" id="cdk8s-postgres.PostgresVersion.VALUE_10"></a>

10.

---


##### `VALUE_11` <a name="VALUE_11" id="cdk8s-postgres.PostgresVersion.VALUE_11"></a>

11.

---


##### `VALUE_12` <a name="VALUE_12" id="cdk8s-postgres.PostgresVersion.VALUE_12"></a>

12.

---


##### `VALUE_13` <a name="VALUE_13" id="cdk8s-postgres.PostgresVersion.VALUE_13"></a>

13.

---


##### `VALUE_14` <a name="VALUE_14" id="cdk8s-postgres.PostgresVersion.VALUE_14"></a>

14.

---


### UserFlag <a name="UserFlag" id="cdk8s-postgres.UserFlag"></a>

Flags that grant Postgres privileges to users.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk8s-postgres.UserFlag.BYPASSRLS">BYPASSRLS</a></code> | *No description.* |
| <code><a href="#cdk8s-postgres.UserFlag.NOBYPASSRLS">NOBYPASSRLS</a></code> | *No description.* |
| <code><a href="#cdk8s-postgres.UserFlag.CREATEDB">CREATEDB</a></code> | *No description.* |
| <code><a href="#cdk8s-postgres.UserFlag.NOCREATEDB">NOCREATEDB</a></code> | *No description.* |
| <code><a href="#cdk8s-postgres.UserFlag.CREATEROLE">CREATEROLE</a></code> | *No description.* |
| <code><a href="#cdk8s-postgres.UserFlag.NOCREATEROLE">NOCREATEROLE</a></code> | *No description.* |
| <code><a href="#cdk8s-postgres.UserFlag.INHERIT">INHERIT</a></code> | *No description.* |
| <code><a href="#cdk8s-postgres.UserFlag.NOINHERIT">NOINHERIT</a></code> | *No description.* |
| <code><a href="#cdk8s-postgres.UserFlag.LOGIN">LOGIN</a></code> | *No description.* |
| <code><a href="#cdk8s-postgres.UserFlag.NOLOGIN">NOLOGIN</a></code> | *No description.* |
| <code><a href="#cdk8s-postgres.UserFlag.REPLICATION">REPLICATION</a></code> | *No description.* |
| <code><a href="#cdk8s-postgres.UserFlag.NOREPLICATION">NOREPLICATION</a></code> | *No description.* |
| <code><a href="#cdk8s-postgres.UserFlag.SUPERUSER">SUPERUSER</a></code> | *No description.* |
| <code><a href="#cdk8s-postgres.UserFlag.NOSUPERUSER">NOSUPERUSER</a></code> | *No description.* |

---

##### `BYPASSRLS` <a name="BYPASSRLS" id="cdk8s-postgres.UserFlag.BYPASSRLS"></a>

---


##### `NOBYPASSRLS` <a name="NOBYPASSRLS" id="cdk8s-postgres.UserFlag.NOBYPASSRLS"></a>

---


##### `CREATEDB` <a name="CREATEDB" id="cdk8s-postgres.UserFlag.CREATEDB"></a>

---


##### `NOCREATEDB` <a name="NOCREATEDB" id="cdk8s-postgres.UserFlag.NOCREATEDB"></a>

---


##### `CREATEROLE` <a name="CREATEROLE" id="cdk8s-postgres.UserFlag.CREATEROLE"></a>

---


##### `NOCREATEROLE` <a name="NOCREATEROLE" id="cdk8s-postgres.UserFlag.NOCREATEROLE"></a>

---


##### `INHERIT` <a name="INHERIT" id="cdk8s-postgres.UserFlag.INHERIT"></a>

---


##### `NOINHERIT` <a name="NOINHERIT" id="cdk8s-postgres.UserFlag.NOINHERIT"></a>

---


##### `LOGIN` <a name="LOGIN" id="cdk8s-postgres.UserFlag.LOGIN"></a>

---


##### `NOLOGIN` <a name="NOLOGIN" id="cdk8s-postgres.UserFlag.NOLOGIN"></a>

---


##### `REPLICATION` <a name="REPLICATION" id="cdk8s-postgres.UserFlag.REPLICATION"></a>

---


##### `NOREPLICATION` <a name="NOREPLICATION" id="cdk8s-postgres.UserFlag.NOREPLICATION"></a>

---


##### `SUPERUSER` <a name="SUPERUSER" id="cdk8s-postgres.UserFlag.SUPERUSER"></a>

---


##### `NOSUPERUSER` <a name="NOSUPERUSER" id="cdk8s-postgres.UserFlag.NOSUPERUSER"></a>

---

