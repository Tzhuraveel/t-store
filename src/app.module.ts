import { HttpExceptionFilter } from '#common/http';
import { DatabaseModule } from '#infra/database/database.module';
import { LocalizationModule } from '#infra/localization/localization.module';
import { HealthModule } from '#modules/health/health.module';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [LocalizationModule, DatabaseModule, HealthModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
