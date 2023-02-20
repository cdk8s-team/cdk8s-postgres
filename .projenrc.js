const { Cdk8sTeamJsiiProject } = require('@cdk8s/projen-common');

const project = new Cdk8sTeamJsiiProject({
  defaultReleaseBranch: 'main',
  release: false,
  name: 'cdk8s-postgres',
  peerDeps: [
    'cdk8s',
    'constructs',
    'cdk8s-plus-24',
  ],
  devDeps: [
    '@cdk8s/projen-common',
  ],
  description: 'CDK8s construct for deploying postgres clusters using Postgres Operator.',
});

project.synth();
