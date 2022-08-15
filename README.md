# cdk8s-postgres

CDK8s construct for deploying postgres clusters using Postgres Operator.

> ⚠️ This project is still in development and is not ready for production use.

## ❗ Prerequisites

You'll need to have the Postgres Operator installed in your Kubernetes cluster.

Install the Postgres Operator using the following [Kustomization](https://github.com/kubernetes-sigs/kustomize) manifest:

```sh
kubectl apply -k github.com/zalando/postgres-operator/manifests
```

> See [Postgres Operator Quickstart guide](https://postgres-operator.readthedocs.io/en/latest/quickstart/) for more information.

## :rocket: Usage

**1. Add this package as a dependency**

```ts
npm install cdk8s-postgres
```

**2. Initialize a Postgres Cluster**

The `Cluster` construct provisions a new Postgres cluster that will be managed by the Postgres Operator.

```ts
import { Cluster } from 'cdk8s-postgres';

new Cluster(this, 'my-postgres-cluster', {
  team: 'goldfish', // Creates a team that will have access to the postgres-cluster
});
```

## :satellite: Connect to the database

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

## :door: Using escape hatches

You can utilize escape hatches to make changes to the configurations that are not yet exposed by the library.

For more information regarding escape hatches, take a look at [cdk8s documentation](https://cdk8s.io/docs/latest/concepts/escape-hatches/).

## :lock: Security

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more information.

## :classical_building: License

This project is licensed under the Apache-2.0 license.
