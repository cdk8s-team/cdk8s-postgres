# cdk8s-postgres

> ⚠️ This project is still in development. Not ready for use.

CDK8s construct for deploying postgres clusters using Postgres Operator.

## ❗ Prerequisites

You'll need to have the Postgres Operator installed in your Kubernetes cluster.

See [Postgres Operator Quickstart guide](https://postgres-operator.readthedocs.io/en/latest/quickstart/).

## :rocket: Quick start

**1. Add the dependency**

```ts
npm install cdk8s-postgres
```

**2. Initialize the Postgres construct**

```ts
import { Cluster } from 'cdk8s-postgres';

new Cluster(this, 'my-postgres', {
  team: 'goldfish', // Creates a team that will have access to the postgres-cluster
});
```

## Connect to the database

1. Forward the port to your local machine

```sh
# Get name of master pod. Replace CLUSTER_NAME with the name of your cluster.
export CLUSTER_NAME=goldfish-cluster
export NAMESPACE=default
export PGMASTER=$(kubectl get pods -o jsonpath={.items..metadata.name} -l application=spilo,cluster-name=$CLUSTER_NAME,spilo-role=master -n $NAMESPACE)

# Set up port forward
kubectl port-forward $PGMASTER 6432:5432 -n $NAMESPACE
```

2. Connect to the database (in another terminal)

```sh
# Get password for a postgres user. Replace CLUSTER_NAME with the name of your cluster.
export CLUSTER_NAME=goldfish-cluster
export PGUSERNAME=postgres
export PGPASSWORD=$(kubectl get secret $PGUSERNAME.$CLUSTER_NAME.credentials.postgresql.acid.zalan.do -o 'jsonpath={.data.password}' | base64 -d)

# Connect to the database
export PGSSLMODE=require
psql -U $PGUSERNAME -h localhost -p 6432
```

## :classical_building: License

This project is licensed under the Apache-2.0 license.
