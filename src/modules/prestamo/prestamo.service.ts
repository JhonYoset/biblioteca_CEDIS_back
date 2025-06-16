import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { PrestamoRepository } from './../../core/contracts/prestamo.repository';
import { LectorRepository } from './../../core/contracts/lector.repository';
import { DocumentoRepository } from './../../core/contracts/documento.repository';
import { UsuarioRepository } from './../../core/contracts/usuario.repository';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { RegisterReturnDto } from './dto/register-return.dto';
import { PaginationDto } from './../pagination.dto';
import { PrestamoEntity } from './../../core/domain/entities/prestamo.entity';

@Injectable()
export class PrestamoService {
  constructor(
    @Inject('PrestamoRepository')
    private readonly prestamoRepository: PrestamoRepository,
    @Inject('LectorRepository')
    private readonly lectorRepository: LectorRepository,
    @Inject('DocumentoRepository')
    private readonly documentoRepository: DocumentoRepository,
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async create(createPrestamoDto: CreatePrestamoDto) {
    // Verificar que exista el lector
    const lector = await this.lectorRepository.findById(createPrestamoDto.lector_id);
    if (!lector) {
      throw new BadRequestException(`Lector con ID ${createPrestamoDto.lector_id} no encontrado`);
    }

    // Verificar que el lector esté activo
    if (!lector.estado) {
      throw new BadRequestException('El lector no está activo');
    }

    // Verificar que exista el documento
    const documento = await this.documentoRepository.findById(createPrestamoDto.documento_id);
    if (!documento) {
      throw new BadRequestException(`Documento con ID ${createPrestamoDto.documento_id} no encontrado`);
    }

    // Verificar que exista el usuario
    const usuario = await this.usuarioRepository.findById(createPrestamoDto.usuario_id);
    if (!usuario) {
      throw new BadRequestException(`Usuario con ID ${createPrestamoDto.usuario_id} no encontrado`);
    }

    // Verificar disponibilidad del documento
    /*if (documento.cantidad_disponible <= 0) {
      throw new BadRequestException('No hay ejemplares disponibles para préstamo');
    }*/

    // Crear el préstamo
    const prestamo = new PrestamoEntity(
      undefined,
      createPrestamoDto.lector_id,
      createPrestamoDto.documento_id,
      createPrestamoDto.usuario_id,
      new Date(createPrestamoDto.fecha_prestamo),
      new Date(createPrestamoDto.fecha_devolucion_programada),
      null,
      'Prestado',
      createPrestamoDto.observaciones || null,
    );

    const createdPrestamo = await this.prestamoRepository.create(prestamo);

    // Actualizar stock del documento
    await this.documentoRepository.updateStock(documento.id, false);

    return createdPrestamo;
  }

  async findAll(paginationDto: PaginationDto) {
    return this.prestamoRepository.findAll({
      page: paginationDto.page,
      limit: paginationDto.limit,
      search: paginationDto.search,
    });
  }

  async findByLector(lectorId: number, paginationDto: PaginationDto) {
    return this.prestamoRepository.findByLector(lectorId, {
      page: paginationDto.page,
      limit: paginationDto.limit,
    });
  }

  async findByDocumento(documentoId: number, paginationDto: PaginationDto) {
    return this.prestamoRepository.findByDocumento(documentoId, {
      page: paginationDto.page,
      limit: paginationDto.limit,
    });
  }

  async findPendingReturns() {
    const prestamos = await this.prestamoRepository.findPendingReturns();
    
    // Actualizar el estado de los préstamos vencidos
    for (const prestamo of prestamos) {
      if (prestamo.estado !== 'Atrasado') {
        await this.prestamoRepository.update(prestamo.id, { estado: 'Atrasado' });
      }
    }

    return prestamos;
  }

  async findOne(id: number) {
    const prestamo = await this.prestamoRepository.findById(id);
    
    if (!prestamo) {
      throw new NotFoundException(`Préstamo con ID ${id} no encontrado`);
    }
    
    return prestamo;
  }

  async registerReturn(id: number, registerReturnDto: RegisterReturnDto) {
    const prestamo = await this.findOne(id);

    if (prestamo.fecha_devolucion_real) {
      throw new BadRequestException('Este préstamo ya fue devuelto');
    }

    const updatedPrestamo = await this.prestamoRepository.registerReturn(
      id,
      new Date(registerReturnDto.fecha_devolucion_real),
      registerReturnDto.observaciones,
    );

    // Actualizar stock del documento
    await this.documentoRepository.updateStock(prestamo.documento_id, true);

    return updatedPrestamo;
  }

  async update(id: number, updatePrestamoDto: UpdatePrestamoDto) {
    const prestamo = await this.findOne(id);

    const updateData: any = { ...updatePrestamoDto };
    if (updatePrestamoDto.fecha_devolucion_programada) {
      updateData.fecha_devolucion_programada = new Date(updatePrestamoDto.fecha_devolucion_programada);
    }
    if (updatePrestamoDto.fecha_devolucion_real) {
      updateData.fecha_devolucion_real = new Date(updatePrestamoDto.fecha_devolucion_real);
    }

    return this.prestamoRepository.update(id, updateData);
  }

  async remove(id: number) {
    const prestamo = await this.findOne(id);

    // Si el préstamo no ha sido devuelto, actualizar el stock
    if (!prestamo.fecha_devolucion_real) {
      await this.documentoRepository.updateStock(prestamo.documento_id, true);
    }

    return this.prestamoRepository.delete(id);
  }
}