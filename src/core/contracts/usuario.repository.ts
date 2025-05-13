import { UsuarioEntity } from '../domain/entities/usuario.entity';
import { PaginationOptions, PaginationResult } from './utils/paginate.interface';

export interface UsuarioRepository {
  findAll(options: PaginationOptions): Promise<PaginationResult<UsuarioEntity>>;
  findById(id: number): Promise<UsuarioEntity | null>;
  findByEmail(email: string): Promise<UsuarioEntity | null>;
  create(usuario: UsuarioEntity): Promise<UsuarioEntity>;
  update(id: number, usuario: Partial<UsuarioEntity>): Promise<UsuarioEntity>;
  delete(id: number): Promise<boolean>;
}