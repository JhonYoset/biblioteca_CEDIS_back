import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { CategoriaOrmEntity } from '../../infrastructure/database/entities/categoria.orm-entity';
import { CategoriaImplRepository } from '../../infrastructure/database/repositories/categoria.impl-repository';
import { CategoriaMapper } from '../../infrastructure/database/mappers/categoria.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaOrmEntity])],
  controllers: [CategoriaController],
  providers: [
    CategoriaService,
    CategoriaMapper,
    {
      provide: 'CategoriaRepository',
      useClass: CategoriaImplRepository,
    },
  ],
  exports: [CategoriaService, 'CategoriaRepository'],
})
export class CategoriaModule {}
