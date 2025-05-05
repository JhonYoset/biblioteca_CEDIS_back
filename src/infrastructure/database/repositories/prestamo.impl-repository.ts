import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { PrestamoEntity } from '../../../core/domain/entities/prestamo.entity';
import { PrestamoRepository } from '../../../core/contracts/prestamo.repository';
import { PrestamoOrmEntity } from '../entities/prestamo.orm-entity';
import { PrestamoMapper } from '../mappers/prestamo.mapper';
import { PaginationOptions, PaginationResult } from '../../../core/contracts/utils/paginate.interface';

@Injectable()
export class PrestamoImplRepository implements PrestamoRepository {
  constructor(
    @InjectRepository(PrestamoOrmEntity)
    private readonly prestamoRepository: Repository<PrestamoOrmEntity>,
    private readonly prestamoMapper: PrestamoMapper,
  ) {}

  async findAll(options: PaginationOptions): Promise<PaginationResult<PrestamoEntity>> {
    const { page = 1, limit = 10, search } = options;
    const skip = (page - 1) * limit;

    const queryBuilder = this.prestamoRepository.createQueryBuilder('prestamo')
      .leftJoinAndSelect('prestamo.lector', 'lector')
      .leftJoinAndSelect('prestamo.documento', 'documento')
      .leftJoinAndSelect('prestamo.usuario', 'usuario');

    if (search) {
      queryBuilder.where(
        'lector.nombre LIKE :search OR lector.apellido LIKE :search OR documento.titulo LIKE :search',
        { search: `%${search}%` },
      );
    }

    const [result, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      data: this.prestamoMapper.toDomainList(result),
      total,
      currentPage: page,
      totalPages,
      limit,
    };
  }

  async findById(id: number): Promise<PrestamoEntity | null> {
    const prestamo = await this.prestamoRepository.findOne({
      where: { id },
      relations: ['lector', 'documento', 'usuario'],
    });
    return prestamo ? this.prestamoMapper.toDomain(prestamo) : null;
  }

  async findByLector(lectorId: number, options: PaginationOptions): Promise<PaginationResult<PrestamoEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [result, total] = await this.prestamoRepository.findAndCount({
      where: { lector_id: lectorId },
      relations: ['lector', 'documento', 'usuario'],
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: this.prestamoMapper.toDomainList(result),
      total,
      currentPage: page,
      totalPages,
      limit,
    };
  }

  async findByDocumento(documentoId: number, options: PaginationOptions): Promise<PaginationResult<PrestamoEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [result, total] = await this.prestamoRepository.findAndCount({
      where: { documento_id: documentoId },
      relations: ['lector', 'documento', 'usuario'],
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: this.prestamoMapper.toDomainList(result),
      total,
      currentPage: page,
      totalPages,
      limit,
    };
  }

  async findPendingReturns(): Promise<PrestamoEntity[]> {
    const today = new Date();
    const prestamos = await this.prestamoRepository.find({
      where: {
        fecha_devolucion_programada: LessThan(today),
        fecha_devolucion_real: null,
        estado: 'Prestado',
      },
      relations: ['lector', 'documento', 'usuario'],
    });

    return this.prestamoMapper.toDomainList(prestamos);
  }

  async create(prestamo: PrestamoEntity): Promise<PrestamoEntity> {
    const ormPrestamo = this.prestamoMapper.toOrm(prestamo);
    const savedPrestamo = await this.prestamoRepository.save(ormPrestamo);
    return this.prestamoMapper.toDomain(savedPrestamo);
  }

  async update(id: number, prestamo: Partial<PrestamoEntity>): Promise<PrestamoEntity> {
    await this.prestamoRepository.update(id, prestamo as any);
    const updatedPrestamo = await this.prestamoRepository.findOne({
      where: { id },
      relations: ['lector', 'documento', 'usuario'],
    });
    return this.prestamoMapper.toDomain(updatedPrestamo);
  }

  async registerReturn(id: number, fecha_devolucion_real: Date, observaciones?: string): Promise<PrestamoEntity> {
    await this.prestamoRepository.update(id, {
      fecha_devolucion_real,
      estado: 'Devuelto',
      observaciones: observaciones || null,
    });

    const updatedPrestamo = await this.prestamoRepository.findOne({
      where: { id },
      relations: ['lector', 'documento', 'usuario'],
    });

    return this.prestamoMapper.toDomain(updatedPrestamo);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.prestamoRepository.delete(id);
    return result.affected > 0;
  }
}