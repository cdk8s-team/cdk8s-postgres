import * as cdk8s from 'cdk8s';
import { Cluster } from '../src/index';

test('generates manifest, when provided the minimal parameters', () => {
  const app = new cdk8s.App();
  const chart = new cdk8s.Chart(app, 'chart');

  new Cluster(chart, 'postgres', {
    team: 'goldfish',
  });

  app.synth();
});
