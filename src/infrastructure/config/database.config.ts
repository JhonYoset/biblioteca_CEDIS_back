import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: 'localhost', 
  port: 5432,
  username: 'admin',
  password: 'root',
  database: 'postgres',
  entities: [__dirname + '/../database/entities/*.orm-entity.{js,ts}'],
  synchronize: true, // Solo en desarrollo
});