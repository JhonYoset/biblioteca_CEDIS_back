import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectorService } from './lector.service';
import { LectorController } from './lector.controller';
import { LectorOrmEntity } from '../../infrastructure/database/entities/lector.orm-entity';
import { LectorImplRepository } from '../../infrastructure/database/repositories/lector.impl-repository';
import { LectorMapper } from '../../infrastructure/database/mappers/lector.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([LectorOrmEntity])],
  controllers: [LectorController],
  providers: [
    LectorService,
    LectorMapper,
    {
      provide: 'LectorRepository',
      useClass: LectorImplRepository,
    },
  ],
  exports: [LectorService, 'LectorRepository'],
})
export class LectorModule {}