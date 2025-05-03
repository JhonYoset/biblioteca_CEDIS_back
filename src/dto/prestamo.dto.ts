import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum EstadoPrestamo {
  ACTIVO = 'Activo',
  DEVUELTO = 'Devuelto',
  VENCIDO = 'Vencido',
}

export class CreatePrestamoDto {
  @ApiProperty({ description: 'ID del lector' })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  lector_id: number;

  @ApiProperty({ description: 'ID del documento' })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  documento_id: number;

  @ApiProperty({ description: 'ID del usuario que registra el préstamo' })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  usuario_id: number;

  @ApiProperty({ description: 'Fecha programada de devolución' })
  @IsNotEmpty()
  @IsDateString()
  fecha_devolucion_programada: string;

  @ApiProperty({ description: 'Observaciones del préstamo' })
  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class UpdatePrestamoDto {
  @ApiProperty({ description: 'Fecha real de devolución' })
  @IsOptional()
  @IsDateString()
  fecha_devolucion_real?: string;

  @ApiProperty({ 
    description: 'Estado del préstamo', 
    enum: EstadoPrestamo 
  })
  @IsOptional()
  @IsEnum(EstadoPrestamo)
  estado?: EstadoPrestamo;

  @ApiProperty({ description: 'Observaciones del préstamo' })
  @IsOptional()
  @IsString()
  observaciones?: string;
}