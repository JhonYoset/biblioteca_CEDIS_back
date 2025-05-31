import { LectorEntity } from '../domain/entities/lector.entity';
import { PaginationOptions, PaginationResult } from './utils/paginate.interface';

export interface LectorRepository {
  findAll(options: PaginationOptions): Promise<PaginationResult<LectorEntity>>;
  findById(id: number): Promise<LectorEntity | null>;
  findByIdentificacion(identificacion: string): Promise<LectorEntity | null>;
  findByEmail(email: string): Promise<LectorEntity | null>; // ✅ NUEVO MÉTODO
  create(lector: LectorEntity): Promise<LectorEntity>;
  update(id: number, lector: Partial<LectorEntity>): Promise<LectorEntity>;
  delete(id: number): Promise<boolean>;
}