import { CategoriaEntity } from '../domain/entities/categoria.entity';
import { PaginationOptions, PaginationResult } from './utils/paginate.interface';

export interface CategoriaRepository {
  findAll(options: PaginationOptions): Promise<PaginationResult<CategoriaEntity>>;
  findById(id: number): Promise<CategoriaEntity | null>;
  create(categoria: CategoriaEntity): Promise<CategoriaEntity>;
  update(id: number, categoria: Partial<CategoriaEntity>): Promise<CategoriaEntity>;
  delete(id: number): Promise<boolean>;
}
