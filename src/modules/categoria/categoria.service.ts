import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CategoriaRepository } from './../../core/contracts/categoria.repository';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PaginationDto } from './../pagination.dto';
import { CategoriaEntity } from './../../core/domain/entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @Inject('CategoriaRepository')
    private readonly categoriaRepository: CategoriaRepository,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    const categoria = new CategoriaEntity(
      undefined,
      createCategoriaDto.nombre,
      createCategoriaDto.descripcion,
      new Date(),
      new Date(),
    );

    return this.categoriaRepository.create(categoria);
  }

  async findAll(paginationDto: PaginationDto) {
    return this.categoriaRepository.findAll({
      page: paginationDto.page,
      limit: paginationDto.limit,
      search: paginationDto.search,
    });
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepository.findById(id);
    
    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }
    
    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id);
    return this.categoriaRepository.update(id, updateCategoriaDto);
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    return this.categoriaRepository.delete(id);
  }
}