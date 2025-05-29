import { Injectable } from '@nestjs/common';
import { DocumentoEntity } from '../../../core/domain/entities/documento.entity';
import { DocumentoOrmEntity } from '../entities/documento.orm-entity';
import { BaseMapper } from './base.mapper';

@Injectable()
export class DocumentoMapper extends BaseMapper<DocumentoEntity, DocumentoOrmEntity> {
  toDomain(ormEntity: DocumentoOrmEntity): DocumentoEntity {
    return new DocumentoEntity(
      ormEntity.id,
      ormEntity.categoria_id,
      ormEntity.titulo,
      ormEntity.autor,
      ormEntity.editorial,
      ormEntity.tipo,
      ormEntity.fecha_publicacion,
      ormEntity.fecha_registro,
      ormEntity.fecha_actualizacion,
      ormEntity.estado,
    );
  }

  toOrm(domainEntity: DocumentoEntity): DocumentoOrmEntity {
    const ormEntity = new DocumentoOrmEntity();
    
    if (domainEntity.id) {
      ormEntity.id = domainEntity.id;
    }
    
    ormEntity.categoria_id = domainEntity.categoria_id;
    ormEntity.titulo = domainEntity.titulo;
    ormEntity.autor = domainEntity.autor;
    ormEntity.editorial = domainEntity.editorial;
    ormEntity.tipo = domainEntity.tipo;
    ormEntity.fecha_publicacion = domainEntity.fecha_publicacion;
    
    if (domainEntity.fecha_registro) {
      ormEntity.fecha_registro = domainEntity.fecha_registro;
    }
    
    if (domainEntity.fecha_actualizacion) {
      ormEntity.fecha_actualizacion = domainEntity.fecha_actualizacion;
    }
    
    ormEntity.estado = domainEntity.estado;
    
    return ormEntity;
  }
}
