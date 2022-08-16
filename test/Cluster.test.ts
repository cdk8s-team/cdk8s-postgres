import { Chart, Testing } from 'cdk8s';
import { Cluster, UserFlag } from '../src/index';

test('generates a postgresql manifest, when Cluster options are not configured', () => {
  const app = Testing.app();
  const chart = new Chart(app, 'chart');

  new Cluster(chart, 'postgres');
  app.synth();

  const manifest = Testing.synth(chart);
  expect(manifest).toStrictEqual(
    [{
      apiVersion: 'acid.zalan.do/v1',
      kind: 'postgresql',
      metadata: {
        name: 'postgres-cluster',
        namespace: 'default',
      },
      spec: {
        databases: {
          postgres: 'postgres',
        },
        numberOfInstances: 1,
        postgresql: {
          version: '14',
        },
        teamId: 'postgres',
        users: {
          postgres: [
            'LOGIN',
          ],
        },
        volume: {
          size: '1Gi',
        },
      },
    }],
  );
});

test('apiVersion is "acid.zalan.do/v1", when Cluster options are not configured', () => {
  const app = Testing.app();
  const chart = new Chart(app, 'chart');

  new Cluster(chart, 'postgres');
  app.synth();

  const manifest = Testing.synth(chart);
  expect(manifest).toStrictEqual([
    expect.objectContaining({
      apiVersion: 'acid.zalan.do/v1',
    }),
  ]);
});

test('kind is "postgresql", when Cluster options are not configured', () => {
  const app = Testing.app();
  const chart = new Chart(app, 'chart');

  new Cluster(chart, 'postgres');
  app.synth();

  const manifest = Testing.synth(chart);
  expect(manifest).toStrictEqual([
    expect.objectContaining({
      kind: 'postgresql',
    }),
  ],
  );
});

test('number of postgres instances defaults to 1, when Cluster options are not configured', () => {
  const app = Testing.app();
  const chart = new Chart(app, 'chart');

  new Cluster(chart, 'postgres');
  app.synth();

  const manifest = Testing.synth(chart);
  expect(manifest).toStrictEqual([
    expect.objectContaining({
      spec: expect.objectContaining({
        numberOfInstances: 1,
      }),
    }),
  ],
  );
});

test('postgres version defaults to v14, when Cluster options are not configured', () => {
  const app = Testing.app();
  const chart = new Chart(app, 'chart');

  new Cluster(chart, 'postgres');
  app.synth();

  const manifest = Testing.synth(chart);
  expect(manifest).toStrictEqual([
    expect.objectContaining({
      spec: expect.objectContaining({
        postgresql: expect.objectContaining({
          version: '14',
        }),
      }),
    }),
  ]);
});

test('volume size defaults to 1Gi, when Cluster options are not configured', () => {
  const app = Testing.app();
  const chart = new Chart(app, 'chart');

  new Cluster(chart, 'postgres');
  app.synth();

  const manifest = Testing.synth(chart);
  expect(manifest).toStrictEqual([
    expect.objectContaining({
      spec: expect.objectContaining({
        volume: expect.objectContaining({
          size: '1Gi',
        }),
      }),
    }),
  ]);
});


test('teamId defaults to construct id, when Cluster options are not configured', () => {
  const app = Testing.app();
  const chart = new Chart(app, 'chart');

  const CONSTRUCT_ID = 'postgres';
  new Cluster(chart, CONSTRUCT_ID);
  app.synth();

  const manifest = Testing.synth(chart);
  expect(manifest).toStrictEqual([
    expect.objectContaining({
      spec: expect.objectContaining({
        teamId: CONSTRUCT_ID,
      }),
    }),
  ]);
});


test('cluster name defaults to "<construct id>-cluster", when Cluster options are not configured', () => {
  const app = Testing.app();
  const chart = new Chart(app, 'chart');

  const CONSTRUCT_ID = 'postgres';
  new Cluster(chart, CONSTRUCT_ID);
  app.synth();

  const manifest = Testing.synth(chart);
  expect(manifest).toStrictEqual([
    expect.objectContaining({
      metadata: expect.objectContaining({
        name: `${CONSTRUCT_ID}-cluster`,
      }),
    }),
  ]);
});


test('default user is "postgres" with LOGIN user flag, when Cluster options are not configured', () => {
  const app = Testing.app();
  const chart = new Chart(app, 'chart');

  new Cluster(chart, 'postgres');
  app.synth();

  const manifest = Testing.synth(chart);
  expect(manifest).toStrictEqual([
    expect.objectContaining({
      spec: expect.objectContaining({
        users: {
          postgres: ['LOGIN'],
        },
      }),
    }),
  ]);
});

test('namespace is "my-namespace", when namespace is defined in Cluster options', () => {
  const app = Testing.app();
  const chart = new Chart(app, 'chart');

  const NAMESPACE = 'my-namespace';
  new Cluster(chart, 'postgres', {
    namespace: NAMESPACE,
  });
  app.synth();

  const manifest = Testing.synth(chart);
  expect(manifest).toStrictEqual([
    expect.objectContaining({
      metadata: expect.objectContaining({
        namespace: NAMESPACE,
      }),
    }),
  ]);
});


test('team is "my-team", when team is defined in Cluster options', () => {
  const app = Testing.app();
  const chart = new Chart(app, 'chart');

  const TEAM = 'my-team';
  new Cluster(chart, 'postgres', {
    team: TEAM,
  });
  app.synth();

  const manifest = Testing.synth(chart);
  expect(manifest).toStrictEqual([
    expect.objectContaining({
      spec: expect.objectContaining({
        teamId: TEAM,
      }),
    }),
  ]);
});

test('user "my-user" is created with LOGIN user flag, when users is defined in Cluster options', () => {
  const app = Testing.app();
  const chart = new Chart(app, 'chart');

  const USERNAME = 'my-user';
  new Cluster(chart, 'postgres', {
    users: {
      [USERNAME]: { flags: [UserFlag.LOGIN] },
    },
  });
  app.synth();

  const manifest = Testing.synth(chart);
  expect(manifest).toStrictEqual([
    expect.objectContaining({
      spec: expect.objectContaining({
        users: expect.objectContaining({
          [USERNAME]: ['LOGIN'],
        }),
      }),
    }),
  ]);
});


test('user "my-user" has user flags for Logging in, create DB, and create role, when users is defined in Cluster options', () => {
  const app = Testing.app();
  const chart = new Chart(app, 'chart');
  const USERNAME = 'my-user';

  const USER_FLAGS = [UserFlag.LOGIN, UserFlag.CREATEDB, UserFlag.CREATEROLE];
  new Cluster(chart, 'postgres', {
    users: {
      [USERNAME]: { flags: USER_FLAGS },
    },
  });
  app.synth();

  const manifest = Testing.synth(chart);
  expect(manifest).toStrictEqual([
    expect.objectContaining({
      spec: expect.objectContaining({
        users: expect.objectContaining({
          [USERNAME]: USER_FLAGS,
        }),
      }),
    }),
  ]);
});


test('database "my-db" is assigned to default "postgres" user, when databases is defined in Cluster options', () => {
  const app = Testing.app();
  const chart = new Chart(app, 'chart');

  const DATABASE = 'my-db';
  new Cluster(chart, 'postgres', {
    databases: {
      [DATABASE]: '',
    },
  });
  app.synth();

  const manifest = Testing.synth(chart);
  expect(manifest).toStrictEqual([
    expect.objectContaining({
      spec: expect.objectContaining({
        databases: {
          [DATABASE]: 'postgres',
        },
      }),
    }),
  ]);
});
