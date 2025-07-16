import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';

@Injectable()
export class MetricsService {
  constructor(
    @InjectMetric('http_requests_total') private counter: Counter<string>,
  ) {}

  countRequest() {
    this.counter.inc(); // збільшує лічильник запитів
  }
}
