import * as path from 'node:path';

import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { DatabaseConfigModule } from './database-config.module';
import { DatabaseConfigService } from './database-config.service';

export class TypeOrmConfigurations {
  static get config(): TypeOrmModuleAsyncOptions {
    const dbDirectory = path.join(
      process.cwd(),
      'dist',
      'src',
      'infra',
      'database',
    );
    return {
      imports: [DatabaseConfigModule],
      useFactory: (databaseConfigService: DatabaseConfigService) => ({
        type: 'postgres',
        host: databaseConfigService.host,
        port: databaseConfigService.port,
        username: databaseConfigService.user,
        password: databaseConfigService.password,
        database: databaseConfigService.database,
        synchronize: true,
        entities: [path.join(dbDirectory, 'entities', '*.entity.js')],
        migrations: [path.join(dbDirectory, 'migrations', '*.js')],
        extra: {
          max: 100,
        },
      }),
      inject: [DatabaseConfigService],
    };
  }
}
