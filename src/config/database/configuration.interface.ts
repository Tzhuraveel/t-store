export interface DatabaseConfig {
  port: number;
  host: string;
  database: string;
  username: string;
  password: string;
  ssl?: boolean;
}
