import { IsEnum, IsISBN, IsNumber, IsOptional, IsPositive, IsString, IsDateString, IsBoolean } from 'class-validator';

export class UpdateDocumentoDto {
  @IsOptional()
  @IsNumber()
  categoria_id?: number;

  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  autor?: string;

  @IsOptional()
  @IsString()
  editorial?: string;

  @IsOptional()
  @IsEnum(['Libro', 'Tesis', 'Diapositiva', 'Otro'])
  tipo?: 'Libro' | 'Tesis' | 'Diapositiva' | 'Otro';


  @IsOptional()
  @IsDateString()
  fecha_publicacion?: string;

  @IsOptional()
  @IsBoolean()
  @IsEnum(['Disponible', 'No disponible', 'Reservado'])
  estado?: 'Disponible' | 'No disponible' | 'Reservado';
  
}