import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { LectorRepository } from './../../core/contracts/lector.repository';
import { CreateLectorDto } from './dto/create-lector.dto';
import { UpdateLectorDto } from './dto/update-lector.dto';
import { PaginationDto } from './../pagination.dto';
import { LectorEntity } from './../../core/domain/entities/lector.entity';

@Injectable()
export class LectorService {
  constructor(
    @Inject('LectorRepository')
    private readonly lectorRepository: LectorRepository,
  ) {}

  async create(createLectorDto: CreateLectorDto) {
    const existingLector = await this.lectorRepository.findByIdentificacion(createLectorDto.identificacion);
    
    if (existingLector) {
      throw new BadRequestException('La identificación ya está registrada');
    }

    const lector = new LectorEntity(
      undefined,
      createLectorDto.tipo,
      createLectorDto.nombre,
      createLectorDto.apellido,
      createLectorDto.identificacion,
      createLectorDto.correo,
      createLectorDto.telefono,
      new Date(),
      true,
    );

    return this.lectorRepository.create(lector);
  }

  async findAll(paginationDto: PaginationDto) {
    return this.lectorRepository.findAll({
      page: paginationDto.page,
      limit: paginationDto.limit,
      search: paginationDto.search,
    });
  }

  async findOne(id: number) {
    const lector = await this.lectorRepository.findById(id);
    
    if (!lector) {
      throw new NotFoundException(`Lector con ID ${id} no encontrado`);
    }
    
    return lector;
  }

  async update(id: number, updateLectorDto: UpdateLectorDto) {
    const lector = await this.findOne(id);

    if (updateLectorDto.identificacion && updateLectorDto.identificacion !== lector.identificacion) {
      const existingLector = await this.lectorRepository.findByIdentificacion(updateLectorDto.identificacion);
      if (existingLector) {
        throw new BadRequestException('La identificación ya está registrada');
      }
    }

    return this.lectorRepository.update(id, updateLectorDto);
  }

  async remove(id: number) {
    const lector = await this.findOne(id);
    return this.lectorRepository.delete(id);
  }
}