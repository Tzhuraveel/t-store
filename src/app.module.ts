import { DatabaseModule } from '#infra/database/database.module';
import { HealthModule } from '#modules/health/health.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, HealthModule],
})
export class AppModule {}
