import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum TipoLector {
  ESTUDIANTE = 'Estudiante',
  DOCENTE = 'Docente',
  ADMINISTRATIVO = 'Administrativo',
}

export class CreateLectorDto {
  @ApiProperty({ 
    description: 'Tipo de lector', 
    enum: TipoLector 
  })
  @IsNotEmpty()
  @IsEnum(TipoLector)
  tipo: TipoLector;

  @ApiProperty({ description: 'Nombre del lector' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  nombre: string;

  @ApiProperty({ description: 'Apellido del lector' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  apellido: string;

  @ApiProperty({ description: 'Identificación del lector' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  identificacion: string;

  @ApiProperty({ description: 'Correo electrónico del lector' })
  @IsNotEmpty()
  @IsEmail()
  correo: string;

  @ApiProperty({ description: 'Teléfono del lector' })
  @IsOptional()
  @IsString()
  @Length(5, 20)
  telefono?: string;
}

export class UpdateLectorDto {
  @ApiProperty({ 
    description: 'Tipo de lector', 
    enum: TipoLector 
  })
  @IsOptional()
  @IsEnum(TipoLector)
  tipo?: TipoLector;

  @ApiProperty({ description: 'Nombre del lector' })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  nombre?: string;

  @ApiProperty({ description: 'Apellido del lector' })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  apellido?: string;

  @ApiProperty({ description: 'Correo electrónico del lector' })
  @IsOptional()
  @IsEmail()
  correo?: string;

  @ApiProperty({ description: 'Teléfono del lector' })
  @IsOptional()
  @IsString()
  @Length(5, 20)
  telefono?: string;
}