import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from '../../../core/domain/entities/usuario.entity';
import { UsuarioOrmEntity } from '../entities/usuario.orm-entity';
import { BaseMapper } from './base.mapper';

@Injectable()
export class UsuarioMapper extends BaseMapper<UsuarioEntity, UsuarioOrmEntity> {
  toDomain(ormEntity: UsuarioOrmEntity): UsuarioEntity {
    return new UsuarioEntity(
      ormEntity.id,
      ormEntity.nombre,
      ormEntity.apellido,
      ormEntity.correo,
      ormEntity.tipo,
      ormEntity.fecha_creacion,
      ormEntity.fecha_actualizacion,
    );
  }

  toOrm(domainEntity: UsuarioEntity): UsuarioOrmEntity {
    const ormEntity = new UsuarioOrmEntity();
    
    if (domainEntity.id) {
      ormEntity.id = domainEntity.id;
    }
    
    ormEntity.nombre = domainEntity.nombre;
    ormEntity.apellido = domainEntity.apellido;
    ormEntity.correo = domainEntity.correo;
    ormEntity.tipo = domainEntity.tipo;
    
    if (domainEntity.fecha_creacion) {
      ormEntity.fecha_creacion = domainEntity.fecha_creacion;
    }
    
    if (domainEntity.fecha_actualizacion) {
      ormEntity.fecha_actualizacion = domainEntity.fecha_actualizacion;
    }
    
    return ormEntity;
  }
}
