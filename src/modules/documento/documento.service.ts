import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { DocumentoRepository } from './../../core/contracts/documento.repository';
import { CategoriaRepository } from './../../core/contracts/categoria.repository';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { PaginationDto } from './../pagination.dto';
import { DocumentoEntity } from './../../core/domain/entities/documento.entity';

@Injectable()
export class DocumentoService {
  constructor(
    @Inject('DocumentoRepository')
    private readonly documentoRepository: DocumentoRepository,
    @Inject('CategoriaRepository')
    private readonly categoriaRepository: CategoriaRepository,
  ) {}

  async create(createDocumentoDto: CreateDocumentoDto) {
    const categoria = await this.categoriaRepository.findById(createDocumentoDto.categoria_id);
    
    if (!categoria) {
      throw new BadRequestException(`Categoría con ID ${createDocumentoDto.categoria_id} no encontrada`);
    }

    const documento = new DocumentoEntity(
      undefined,
      createDocumentoDto.categoria_id,
      createDocumentoDto.titulo,
      createDocumentoDto.autor,
      createDocumentoDto.editorial,
      createDocumentoDto.tipo,
      createDocumentoDto.fecha_publicacion ? new Date(createDocumentoDto.fecha_publicacion) : undefined,
      new Date(),
      new Date(),
      createDocumentoDto.estado,
    );

    return this.documentoRepository.create(documento);
  }

  async findAll(paginationDto: PaginationDto) {
    return this.documentoRepository.findAll({
      page: paginationDto.page,
      limit: paginationDto.limit,
      search: paginationDto.search,
    });
  }

  async findByCategoria(categoriaId: number, paginationDto: PaginationDto) {
    return this.documentoRepository.findByCategoria(categoriaId, {
      page: paginationDto.page,
      limit: paginationDto.limit,
      search: paginationDto.search,
    });
  }

  async findOne(id: number) {
    const documento = await this.documentoRepository.findById(id);
    
    if (!documento) {
      throw new NotFoundException(`Documento con ID ${id} no encontrado`);
    }
    
    return documento;
  }

  async update(id: number, updateDocumentoDto: UpdateDocumentoDto) {
    const documento = await this.findOne(id);

    if (updateDocumentoDto.categoria_id) {
      const categoria = await this.categoriaRepository.findById(updateDocumentoDto.categoria_id);
      if (!categoria) {
        throw new BadRequestException(`Categoría con ID ${updateDocumentoDto.categoria_id} no encontrada`);
      }
    }

    const updateData: any = { ...updateDocumentoDto };
    if (updateDocumentoDto.fecha_publicacion) {
      updateData.fecha_publicacion = new Date(updateDocumentoDto.fecha_publicacion);
    }

    return this.documentoRepository.update(id, updateData);
  }

  async remove(id: number) {
    const documento = await this.findOne(id);
    return this.documentoRepository.delete(id);
  }
}