import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamoService } from './prestamo.service';
import { PrestamoController } from './prestamo.controller';
import { PrestamoOrmEntity } from '../../infrastructure/database/entities/prestamo.orm-entity';
import { PrestamoImplRepository } from '../../infrastructure/database/repositories/prestamo.impl-repository';
import { PrestamoMapper } from '../../infrastructure/database/mappers/prestamo.mapper';
import { LectorModule } from '../lector/lector.module';
import { DocumentoModule } from '../documento/documento.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PrestamoOrmEntity]),
    LectorModule,
    DocumentoModule,
    UsuarioModule,
  ],
  controllers: [PrestamoController],
  providers: [
    PrestamoService,
    PrestamoMapper,
    {
      provide: 'PrestamoRepository',
      useClass: PrestamoImplRepository,
    },
  ],
  exports: [PrestamoService, 'PrestamoRepository'],
})
export class PrestamoModule {}