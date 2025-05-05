import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentoService } from './documento.service';
import { DocumentoController } from './documento.controller';
import { DocumentoOrmEntity } from '../../infrastructure/database/entities/documento.orm-entity';
import { DocumentoImplRepository } from '../../infrastructure/database/repositories/documento.impl-repository';
import { DocumentoMapper } from '../../infrastructure/database/mappers/documento.mapper';
import { CategoriaModule } from '../categoria/categoria.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentoOrmEntity]),
    CategoriaModule,
  ],
  controllers: [DocumentoController],
  providers: [
    DocumentoService,
    DocumentoMapper,
    {
      provide: 'DocumentoRepository',
      useClass: DocumentoImplRepository,
    },
  ],
  exports: [DocumentoService, 'DocumentoRepository'],
})
export class DocumentoModule {}