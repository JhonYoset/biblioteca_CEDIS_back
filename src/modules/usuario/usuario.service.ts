import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { UsuarioRepository } from '../../core/contracts/usuario.repository';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PaginationDto } from '../pagination.dto';
import * as bcrypt from 'bcrypt';
import { UsuarioEntity } from '../../core/domain/entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const existingUser = await this.usuarioRepository.findByEmail(createUsuarioDto.correo);
    
    if (existingUser) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(createUsuarioDto.contraseña, 10);

    const usuario = new UsuarioEntity(
      undefined,
      createUsuarioDto.nombre,
      createUsuarioDto.apellido,
      createUsuarioDto.correo,
      hashedPassword,
      createUsuarioDto.tipo,
      new Date(),
      new Date(),
    );

    return this.usuarioRepository.create(usuario);
  }

  async findAll(paginationDto: PaginationDto) {
    return this.usuarioRepository.findAll({
      page: paginationDto.page,
      limit: paginationDto.limit,
      search: paginationDto.search,
    });
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findById(id);
    
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    
    return usuario;
  }

  // This is the missing method needed by the AuthService
  async findByEmail(email: string) {
    return this.usuarioRepository.findByEmail(email);
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.findOne(id);

    if (updateUsuarioDto.correo && updateUsuarioDto.correo !== usuario.correo) {
      const existingUser = await this.usuarioRepository.findByEmail(updateUsuarioDto.correo);
      if (existingUser) {
        throw new BadRequestException('El correo ya está registrado');
      }
    }

    let hashedPassword: string;
    if (updateUsuarioDto.contraseña) {
      hashedPassword = await bcrypt.hash(updateUsuarioDto.contraseña, 10);
    }

    const updatedData = {
      ...updateUsuarioDto,
      ...(hashedPassword && { contraseña: hashedPassword }),
    };

    return this.usuarioRepository.update(id, updatedData);
  }

  async remove(id: number) {
    const usuario = await this.findOne(id);
    return this.usuarioRepository.delete(id);
  }
}