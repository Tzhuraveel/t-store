import { DatabaseModule } from '#infra/database/database.module';
import { LocalizationModule } from '#infra/localization/localization.module';
import { HealthModule } from '#modules/health/health.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [LocalizationModule, DatabaseModule, HealthModule],
})
export class AppModule {}
