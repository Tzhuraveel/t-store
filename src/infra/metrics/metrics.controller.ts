import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { collectDefaultMetrics, Registry } from 'prom-client';

import { SkipAuth } from '#modules/auth/decorators/skip-auth.decorator';

@Controller('metrics')
export class MetricsController {
  private readonly registry = new Registry();

  constructor() {
    collectDefaultMetrics({ register: this.registry });
  }

  @Get()
  @SkipAuth()
  async getMetrics(@Res() res: Response) {
    res.set('Content-Type', this.registry.contentType);
    res.end(await this.registry.metrics());
  }
}
