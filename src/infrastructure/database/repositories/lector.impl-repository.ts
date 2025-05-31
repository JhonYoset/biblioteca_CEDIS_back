import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LectorEntity } from '../../../core/domain/entities/lector.entity';
import { LectorRepository } from '../../../core/contracts/lector.repository';
import { LectorOrmEntity } from '../entities/lector.orm-entity';
import { LectorMapper } from '../mappers/lector.mapper';
import { PaginationOptions, PaginationResult } from '../../../core/contracts/utils/paginate.interface';

@Injectable()
export class LectorImplRepository implements LectorRepository {
  constructor(
    @InjectRepository(LectorOrmEntity)
    private readonly lectorRepository: Repository<LectorOrmEntity>,
    private readonly lectorMapper: LectorMapper,
  ) {}

  async findAll(options: PaginationOptions): Promise<PaginationResult<LectorEntity>> {
    const { page = 1, limit = 10, search } = options;
    const skip = (page - 1) * limit;

    const queryBuilder = this.lectorRepository.createQueryBuilder('lector');

    if (search) {
      queryBuilder.where(
        'lector.nombre LIKE :search OR lector.apellido LIKE :search OR lector.identificacion LIKE :search',
        { search: `%${search}%` },
      );
    }

    const [result, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      data: this.lectorMapper.toDomainList(result),
      total,
      currentPage: page,
      totalPages,
      limit,
    };
  }

  async findById(id: number): Promise<LectorEntity | null> {
    const lector = await this.lectorRepository.findOne({ where: { id } });
    return lector ? this.lectorMapper.toDomain(lector) : null;
  }

  async findByIdentificacion(identificacion: string): Promise<LectorEntity | null> {
    const lector = await this.lectorRepository.findOne({ where: { identificacion } });
    return lector ? this.lectorMapper.toDomain(lector) : null;
  }

  // ✅ NUEVO MÉTODO OPTIMIZADO
  async findByEmail(email: string): Promise<LectorEntity | null> {
    const lector = await this.lectorRepository.findOne({ where: { correo: email } });
    return lector ? this.lectorMapper.toDomain(lector) : null;
  }

  async create(lector: LectorEntity): Promise<LectorEntity> {
    const ormLector = this.lectorMapper.toOrm(lector);
    const savedLector = await this.lectorRepository.save(ormLector);
    return this.lectorMapper.toDomain(savedLector);
  }

  async update(id: number, lector: Partial<LectorEntity>): Promise<LectorEntity> {
    await this.lectorRepository.update(id, lector as any);
    const updatedLector = await this.lectorRepository.findOne({ where: { id } });
    return this.lectorMapper.toDomain(updatedLector);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.lectorRepository.delete(id);
    return result.affected > 0;
  }
}