import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfiguration } from 'src/config/database';

@Module({
  imports: [TypeOrmModule.forRoot({ ...typeormConfiguration })],
})
export class DatabaseModule {}
