import { Injectable } from '@nestjs/common';
import { CategoriaEntity } from '../../../core/domain/entities/categoria.entity';
import { CategoriaOrmEntity } from '../entities/categoria.orm-entity';
import { BaseMapper } from './base.mapper';

@Injectable()
export class CategoriaMapper extends BaseMapper<CategoriaEntity, CategoriaOrmEntity> {
  toDomain(ormEntity: CategoriaOrmEntity): CategoriaEntity {
    return new CategoriaEntity(
      ormEntity.id,
      ormEntity.nombre,
      ormEntity.descripcion,
      ormEntity.fecha_creacion,
      ormEntity.fecha_actualizacion,
    );
  }

  toOrm(domainEntity: CategoriaEntity): CategoriaOrmEntity {
    const ormEntity = new CategoriaOrmEntity();
    
    if (domainEntity.id) {
      ormEntity.id = domainEntity.id;
    }
    
    ormEntity.nombre = domainEntity.nombre;
    ormEntity.descripcion = domainEntity.descripcion;
    
    if (domainEntity.fecha_creacion) {
      ormEntity.fecha_creacion = domainEntity.fecha_creacion;
    }
    
    if (domainEntity.fecha_actualizacion) {
      ormEntity.fecha_actualizacion = domainEntity.fecha_actualizacion;
    }
    
    return ormEntity;
  }
}
