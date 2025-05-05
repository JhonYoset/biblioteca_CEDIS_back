import { DocumentoEntity } from '../domain/entities/documento.entity';
import { PaginationOptions, PaginationResult } from './utils/paginate.interface';

export interface DocumentoRepository {
  findAll(options: PaginationOptions): Promise<PaginationResult<DocumentoEntity>>;
  findById(id: number): Promise<DocumentoEntity | null>;
  findByCategoria(categoriaId: number, options: PaginationOptions): Promise<PaginationResult<DocumentoEntity>>;
  create(documento: DocumentoEntity): Promise<DocumentoEntity>;
  update(id: number, documento: Partial<DocumentoEntity>): Promise<DocumentoEntity>;
  delete(id: number): Promise<boolean>;
  updateStock(id: number, increment: boolean): Promise<DocumentoEntity>;
}
