import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaEntity } from '../../../core/domain/entities/categoria.entity';
import { CategoriaRepository } from '../../../core/contracts/categoria.repository';
import { CategoriaOrmEntity } from '../entities/categoria.orm-entity';
import { CategoriaMapper } from '../mappers/categoria.mapper';
import { PaginationOptions, PaginationResult } from '../../../core/contracts/utils/paginate.interface';

@Injectable()
export class CategoriaImplRepository implements CategoriaRepository {
  constructor(
    @InjectRepository(CategoriaOrmEntity)
    private readonly categoriaRepository: Repository<CategoriaOrmEntity>,
    private readonly categoriaMapper: CategoriaMapper,
  ) {}

  async findAll(options: PaginationOptions): Promise<PaginationResult<CategoriaEntity>> {
    const { page = 1, limit = 10, search } = options;
    const skip = (page - 1) * limit;

    const queryBuilder = this.categoriaRepository.createQueryBuilder('categoria');

    if (search) {
      queryBuilder.where(
        'categoria.nombre LIKE :search',
        { search: `%${search}%` },
      );
    }

    const [result, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      data: this.categoriaMapper.toDomainList(result),
      total,
      currentPage: page,
      totalPages,
      limit,
    };
  }

  async findById(id: number): Promise<CategoriaEntity | null> {
    const categoria = await this.categoriaRepository.findOne({ where: { id } });
    return categoria ? this.categoriaMapper.toDomain(categoria) : null;
  }

  async create(categoria: CategoriaEntity): Promise<CategoriaEntity> {
    const ormCategoria = this.categoriaMapper.toOrm(categoria);
    const savedCategoria = await this.categoriaRepository.save(ormCategoria);
    return this.categoriaMapper.toDomain(savedCategoria);
  }

  async update(id: number, categoria: Partial<CategoriaEntity>): Promise<CategoriaEntity> {
    await this.categoriaRepository.update(id, categoria as any);
    const updatedCategoria = await this.categoriaRepository.findOne({ where: { id } });
    return this.categoriaMapper.toDomain(updatedCategoria);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.categoriaRepository.delete(id);
    return result.affected > 0;
  }
}
