import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdatePrestamoDto {
  @IsOptional()
  @IsDateString()
  fecha_devolucion_programada?: string;

  @IsOptional()
  @IsDateString()
  fecha_devolucion_real?: string;

  @IsOptional()
  @IsEnum(['Prestado', 'Devuelto', 'Atrasado'])
  estado?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}