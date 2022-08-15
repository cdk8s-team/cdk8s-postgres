const { cdk8s, DependencyType } = require('projen');
const project = new cdk8s.ConstructLibraryCdk8s({
  name: 'cdk8s-postgres',
  packageName: 'cdk8s-postgres',
  description: 'CDK8s construct for deploying postgres clusters using Postgres Operator.',
  author: 'Amazon Web Services',
  authorAddress: 'https://aws.amazon.com',
  cdk8sVersion: '2.3.21',
  defaultReleaseBranch: 'main',
  repositoryUrl: 'git@github.com:cdk8s-team/cdk8s-postgres.git',
  peerDeps: [
    'cdk8s-plus-24',
  ],
  jestOptions: {
    jestConfig: {
      coveragePathIgnorePatterns: [
        '/node_modules/',
        'src/imports/*',
      ],
    },
  },
});
project.deps.removeDependency('constructs', DependencyType.PEER);
project.deps.addDependency('constructs', DependencyType.PEER);
project.tryRemoveFile('.DS_Store');
project.synth();
