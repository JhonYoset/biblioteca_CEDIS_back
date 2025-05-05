import { Injectable } from '@nestjs/common';
import { PrestamoEntity } from '../../../core/domain/entities/prestamo.entity';
import { PrestamoOrmEntity } from '../entities/prestamo.orm-entity';
import { BaseMapper } from './base.mapper';

@Injectable()
export class PrestamoMapper extends BaseMapper<PrestamoEntity, PrestamoOrmEntity> {
  toDomain(ormEntity: PrestamoOrmEntity): PrestamoEntity {
    return new PrestamoEntity(
      ormEntity.id,
      ormEntity.lector_id,
      ormEntity.documento_id,
      ormEntity.usuario_id,
      ormEntity.fecha_prestamo,
      ormEntity.fecha_devolucion_programada,
      ormEntity.fecha_devolucion_real,
      ormEntity.estado,
      ormEntity.observaciones,
    );
  }

  toOrm(domainEntity: PrestamoEntity): PrestamoOrmEntity {
    const ormEntity = new PrestamoOrmEntity();
    
    if (domainEntity.id) {
      ormEntity.id = domainEntity.id;
    }
    
    ormEntity.lector_id = domainEntity.lector_id;
    ormEntity.documento_id = domainEntity.documento_id;
    ormEntity.usuario_id = domainEntity.usuario_id;
    ormEntity.fecha_prestamo = domainEntity.fecha_prestamo;
    ormEntity.fecha_devolucion_programada = domainEntity.fecha_devolucion_programada;
    ormEntity.fecha_devolucion_real = domainEntity.fecha_devolucion_real;
    ormEntity.estado = domainEntity.estado;
    ormEntity.observaciones = domainEntity.observaciones;
    
    return ormEntity;
  }
}