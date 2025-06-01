import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentoEntity } from '../../../core/domain/entities/documento.entity';
import { DocumentoRepository } from '../../../core/contracts/documento.repository';
import { DocumentoOrmEntity } from '../entities/documento.orm-entity';
import { DocumentoMapper } from '../mappers/documento.mapper';
import { PaginationOptions, PaginationResult } from '../../../core/contracts/utils/paginate.interface';

@Injectable()
export class DocumentoImplRepository implements DocumentoRepository {
  constructor(
    @InjectRepository(DocumentoOrmEntity)
    private readonly documentoRepository: Repository<DocumentoOrmEntity>,
    private readonly documentoMapper: DocumentoMapper,
  ) {}

  async findAll(options: PaginationOptions): Promise<PaginationResult<DocumentoEntity>> {
    const { page = 1, limit = 10, search } = options;
    const skip = (page - 1) * limit;

    const queryBuilder = this.documentoRepository.createQueryBuilder('documento')
      .leftJoinAndSelect('documento.categoria', 'categoria');

    if (search) {
      queryBuilder.where(
        'documento.titulo LIKE :search OR documento.autor LIKE :search OR documento.isbn LIKE :search',
        { search: `%${search}%` },
      );
    }

    const [result, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      data: this.documentoMapper.toDomainList(result),
      total,
      currentPage: page,
      totalPages,
      limit,
    };
  }

  async findById(id: number): Promise<DocumentoEntity | null> {
    const documento = await this.documentoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
    return documento ? this.documentoMapper.toDomain(documento) : null;
  }

  async findByCategoria(categoriaId: number, options: PaginationOptions): Promise<PaginationResult<DocumentoEntity>> {
    const { page = 1, limit = 10, search } = options;
    const skip = (page - 1) * limit;

    const queryBuilder = this.documentoRepository.createQueryBuilder('documento')
      .leftJoinAndSelect('documento.categoria', 'categoria')
      .where('documento.categoria_id = :categoriaId', { categoriaId });

    if (search) {
      queryBuilder.andWhere(
        'documento.titulo LIKE :search OR documento.autor LIKE :search',
        { search: `%${search}%` },
      );
    }

    const [result, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      data: this.documentoMapper.toDomainList(result),
      total,
      currentPage: page,
      totalPages,
      limit,
    };
  }

  async create(documento: DocumentoEntity): Promise<DocumentoEntity> {
    const ormDocumento = this.documentoMapper.toOrm(documento);
    const savedDocumento = await this.documentoRepository.save(ormDocumento);
    return this.documentoMapper.toDomain(savedDocumento);
  }

  async update(id: number, documento: Partial<DocumentoEntity>): Promise<DocumentoEntity> {
    await this.documentoRepository.update(id, documento as any);
    const updatedDocumento = await this.documentoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
    return this.documentoMapper.toDomain(updatedDocumento);
  }

  /* ESTA FUNCION PODRIA SER PARA LA BUSQUEDA DE DOCUMENTOS */
  async updateStock(id: number, increment: boolean): Promise<DocumentoEntity> {
    const documento = await this.documentoRepository.findOne({ where: { id } });
    if (!documento) {
      throw new Error('Documento no encontrado');
    }
    const savedDocumento = await this.documentoRepository.save(documento);
    return this.documentoMapper.toDomain(savedDocumento);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.documentoRepository.delete(id);
    return result.affected > 0;
  }
}
