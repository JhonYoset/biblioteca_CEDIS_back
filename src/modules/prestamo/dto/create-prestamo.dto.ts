import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePrestamoDto {
  @IsNotEmpty()
  @IsNumber()
  lector_id: number;

  @IsNotEmpty()
  @IsNumber()
  documento_id: number;

  @IsNotEmpty()
  @IsNumber()
  usuario_id: number;

  @IsNotEmpty()
  @IsDateString()
  fecha_prestamo: string;

  @IsNotEmpty()
  @IsDateString()
  fecha_devolucion_programada: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
