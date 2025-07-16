import { Module } from '@nestjs/common';
import {
  makeCounterProvider,
  PrometheusModule,
} from '@willsoto/nestjs-prometheus';

import { MetricsController } from './metrics.controller';
import { MetricsService } from './services/metrics.service';

@Module({
  imports: [PrometheusModule.register()],
  controllers: [MetricsController],
  providers: [
    MetricsService,
    makeCounterProvider({
      name: 'http_requests_total',
      help: 'Total HTTP requests',
    }),
  ],
  exports: [MetricsService],
})
export class MetricsModule {}
