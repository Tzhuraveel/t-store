import { AppConfig } from './configuration.interface';

const appConfig: AppConfig = {
  port: Number(process.env.APP_PORT),
  host: process.env.APP_HOST,
  environment: process.env.NODE_ENV,
};

export default appConfig;
