import { DatabaseConfig } from './configuration.interface';

const databaseConfig: DatabaseConfig = {
  port: Number(process.env.DATABASE_PORT),
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

export default databaseConfig;
