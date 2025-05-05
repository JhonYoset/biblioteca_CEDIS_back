import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioOrmEntity } from '../../infrastructure/database/entities/usuario.orm-entity';
import { UsuarioImplRepository } from '../../infrastructure/database/repositories/usuario.impl-repository';
import { UsuarioMapper } from '../../infrastructure/database/mappers/usuario.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioOrmEntity])],
  controllers: [UsuarioController],
  providers: [
    UsuarioService,
    UsuarioMapper,
    {
      provide: 'UsuarioRepository',
      useClass: UsuarioImplRepository,
    },
  ],
  exports: [UsuarioService, 'UsuarioRepository'],
})
export class UsuarioModule {}