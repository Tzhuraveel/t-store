import cluster from 'node:cluster';
import os from 'node:os';
import process from 'node:process';

const numCPUs = os.cpus().length - 1;

export class ClusterService {
  static clusterize(callback: () => void): void {
    if (cluster.isPrimary) {
      console.log(`MASTER SERVER (${process.pid}) IS RUNNING `);

      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });
    } else {
      callback();
    }
  }
}
