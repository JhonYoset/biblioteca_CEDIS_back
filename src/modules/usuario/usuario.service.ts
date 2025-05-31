import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { UsuarioRepository } from '../../core/contracts/usuario.repository';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PaginationDto } from '../pagination.dto';
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

    const usuario = new UsuarioEntity(
      undefined,
      createUsuarioDto.nombre,
      createUsuarioDto.apellido,
      createUsuarioDto.correo,
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

  async findByEmail(email: string) {
    return this.usuarioRepository.findByEmail(email);
  }

  async findOrCreateByGoogleProfile(profile: any) {
    const email = profile.emails[0].value;
    
    // Buscar usuario existente
    let usuario = await this.usuarioRepository.findByEmail(email);
    
    if (!usuario) {
      // Determinar el tipo de usuario basado en el dominio del email
      const userType = this.determineUserTypeByEmail(email);
      
      // Crear nuevo usuario
      const newUsuario = new UsuarioEntity(
        undefined,
        profile.name.givenName || profile.displayName,
        profile.name.familyName || '',
        email,
        userType,
        new Date(),
        new Date(),
      );
      
      usuario = await this.usuarioRepository.create(newUsuario);
    }
    
    return usuario;
  }

  private determineUserTypeByEmail(email: string): 'Administrador' | 'Bibliotecario' | 'Consultor' {
    // Lista de emails de administradores (configurable)
    const adminEmails = [
      'admin@biblioteca.unsa.edu.pe',
      'bibliotecario@unsa.edu.pe',
      // Agregar más emails según sea necesario
    ];
    
    if (adminEmails.includes(email.toLowerCase())) {
      return 'Administrador';
    }
    
    // Por defecto, los usuarios son consultores
    return 'Consultor';
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.findOne(id);

    if (updateUsuarioDto.correo && updateUsuarioDto.correo !== usuario.correo) {
      const existingUser = await this.usuarioRepository.findByEmail(updateUsuarioDto.correo);
      if (existingUser) {
        throw new BadRequestException('El correo ya está registrado');
      }
    }

    return this.usuarioRepository.update(id, updateUsuarioDto);
  }

  async remove(id: number) {
    const usuario = await this.findOne(id);
    return this.usuarioRepository.delete(id);
  }
}