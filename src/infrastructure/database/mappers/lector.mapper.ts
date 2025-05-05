import { Injectable } from '@nestjs/common';
import { LectorEntity } from '../../../core/domain/entities/lector.entity';
import { LectorOrmEntity } from '../entities/lector.orm-entity';
import { BaseMapper } from './base.mapper';

@Injectable()
export class LectorMapper extends BaseMapper<LectorEntity, LectorOrmEntity> {
  toDomain(ormEntity: LectorOrmEntity): LectorEntity {
    return new LectorEntity(
      ormEntity.id,
      ormEntity.tipo,
      ormEntity.nombre,
      ormEntity.apellido,
      ormEntity.identificacion,
      ormEntity.correo,
      ormEntity.telefono,
      ormEntity.fecha_registro,
      ormEntity.estado,
    );
  }

  toOrm(domainEntity: LectorEntity): LectorOrmEntity {
    const ormEntity = new LectorOrmEntity();
    
    if (domainEntity.id) {
      ormEntity.id = domainEntity.id;
    }
    
    ormEntity.tipo = domainEntity.tipo;
    ormEntity.nombre = domainEntity.nombre;
    ormEntity.apellido = domainEntity.apellido;
    ormEntity.identificacion = domainEntity.identificacion;
    ormEntity.correo = domainEntity.correo;
    ormEntity.telefono = domainEntity.telefono;
    
    if (domainEntity.fecha_registro) {
      ormEntity.fecha_registro = domainEntity.fecha_registro;
    }
    
    ormEntity.estado = domainEntity.estado;
    
    return ormEntity;
  }
}
