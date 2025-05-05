import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UsuarioEntity } from '../../../core/domain/entities/usuario.entity';
import { UsuarioRepository } from '../../../core/contracts/usuario.repository';
import { UsuarioOrmEntity } from '../entities/usuario.orm-entity';
import { UsuarioMapper } from '../mappers/usuario.mapper';
import { PaginationOptions, PaginationResult } from '../../../core/contracts/utils/paginate.interface';

@Injectable()
export class UsuarioImplRepository implements UsuarioRepository {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly usuarioRepository: Repository<UsuarioOrmEntity>,
    private readonly usuarioMapper: UsuarioMapper,
  ) {}

  async findAll(options: PaginationOptions): Promise<PaginationResult<UsuarioEntity>> {
    const { page = 1, limit = 10, search } = options;
    const skip = (page - 1) * limit;

    const queryBuilder = this.usuarioRepository.createQueryBuilder('usuario');

    if (search) {
      queryBuilder.where(
        'usuario.nombre LIKE :search OR usuario.apellido LIKE :search OR usuario.correo LIKE :search',
        { search: `%${search}%` },
      );
    }

    const [result, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      data: this.usuarioMapper.toDomainList(result),
      total,
      currentPage: page,
      totalPages,
      limit,
    };
  }

  async findById(id: number): Promise<UsuarioEntity | null> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    return usuario ? this.usuarioMapper.toDomain(usuario) : null;
  }

  async findByEmail(email: string): Promise<UsuarioEntity | null> {
    const usuario = await this.usuarioRepository.findOne({ where: { correo: email } });
    return usuario ? this.usuarioMapper.toDomain(usuario) : null;
  }

  async create(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    const ormUsuario = this.usuarioMapper.toOrm(usuario);
    const savedUsuario = await this.usuarioRepository.save(ormUsuario);
    return this.usuarioMapper.toDomain(savedUsuario);
  }

  async update(id: number, usuario: Partial<UsuarioEntity>): Promise<UsuarioEntity> {
    await this.usuarioRepository.update(id, usuario as any);
    const updatedUsuario = await this.usuarioRepository.findOne({ where: { id } });
    return this.usuarioMapper.toDomain(updatedUsuario);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.usuarioRepository.delete(id);
    return result.affected > 0;
  }
}