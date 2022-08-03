const { cdk8s, DependencyType } = require('projen');
const project = new cdk8s.ConstructLibraryCdk8s({
  author: 'Ryan Parker',
  authorAddress: 'parkerzr@amazon.com',
  cdk8sVersion: '2.3.21',
  defaultReleaseBranch: 'main',
  name: 'cdk8s-postgres',
  repositoryUrl: 'git@github.com:cdk8s-team/cdk8s-postgres.git',
  peerDeps: [
    'cdk8s-plus-24',
  ],
  description: 'CDK8s construct for deploying postgres clusters using Postgres Operator.',
  packageName: 'cdk8s-postgres',
});
project.deps.removeDependency('constructs', DependencyType.PEER);
project.deps.addDependency('constructs', DependencyType.PEER);
project.tryRemoveFile('.DS_Store');
project.synth();
