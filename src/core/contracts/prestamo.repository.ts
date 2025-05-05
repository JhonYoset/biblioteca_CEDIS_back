import { PrestamoEntity } from '../domain/entities/prestamo.entity';
import { PaginationOptions, PaginationResult } from './utils/paginate.interface';

export interface PrestamoRepository {
  findAll(options: PaginationOptions): Promise<PaginationResult<PrestamoEntity>>;
  findById(id: number): Promise<PrestamoEntity | null>;
  findByLector(lectorId: number, options: PaginationOptions): Promise<PaginationResult<PrestamoEntity>>;
  findByDocumento(documentoId: number, options: PaginationOptions): Promise<PaginationResult<PrestamoEntity>>;
  findPendingReturns(): Promise<PrestamoEntity[]>;
  create(prestamo: PrestamoEntity): Promise<PrestamoEntity>;
  update(id: number, prestamo: Partial<PrestamoEntity>): Promise<PrestamoEntity>;
  registerReturn(id: number, fecha_devolucion_real: Date, observaciones?: string): Promise<PrestamoEntity>;
  delete(id: number): Promise<boolean>;
}