import { typeormConfiguration } from './src/config/database';
import { DataSource } from 'typeorm';

export default new DataSource({ ...typeormConfiguration });
