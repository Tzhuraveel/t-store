import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigurations } from '#config/database/typeorm-configuration.service';

@Module({
  imports: [TypeOrmModule.forRootAsync(TypeOrmConfigurations.config)],
})
export class DatabaseModule {}
