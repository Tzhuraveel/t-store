import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';

import { APP_CONFIG_SERVICE } from '#config/app/app-config.constants';
import { AppConfigService } from '#config/app/app-config.service';
import { ClusterService } from '#infra/cluster/services/cluster.service';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(compression());

  const appConfigService = app.get<AppConfigService>(APP_CONFIG_SERVICE);

  await app.listen(appConfigService.port);
}

ClusterService.clusterize(bootstrap);
