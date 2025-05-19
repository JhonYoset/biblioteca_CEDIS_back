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
  @IsISBN()
  isbn?: string;

  @IsOptional()
  @IsDateString()
  fecha_publicacion?: string;

  @IsOptional()
  @IsString()
  ubicacion?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  cantidad_disponible?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  cantidad_total?: number;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}