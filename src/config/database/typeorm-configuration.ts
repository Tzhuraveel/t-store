import * as path from 'node:path';
import { DataSourceOptions } from 'typeorm';
import databaseConfig from './configuration';

export const typeormConfiguration: DataSourceOptions = {
  type: 'postgres',
  host: databaseConfig.host,
  port: databaseConfig.port,
  database: databaseConfig.database,
  password: databaseConfig.password,
  username: databaseConfig.username,
  entities: [
    path.join(
      process.cwd(),
      'dist',
      'src',
      'infra',
      'database',
      'entities',
      '*.entity.js',
    ),
  ],
  migrations: [
    path.join(
      process.cwd(),
      'dist',
      'src',
      'infra',
      'database',
      'migrations',
      '*.js',
    ),
  ],
};
