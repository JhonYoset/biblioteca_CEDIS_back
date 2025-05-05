import { IsEnum, IsISBN, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsDateString } from 'class-validator';

export class CreateDocumentoDto {
  @IsNotEmpty()
  @IsNumber()
  categoria_id: number;

  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  autor: string;

  @IsNotEmpty()
  @IsString()
  editorial: string;

  @IsNotEmpty()
  @IsEnum(['Libro', 'Tesis', 'Diapositiva', 'Otro'])
  tipo: 'Libro' | 'Tesis' | 'Diapositiva' | 'Otro';

  @IsOptional()
  @IsISBN()
  isbn?: string;

  @IsOptional()
  @IsDateString()
  fecha_publicacion?: string;

  @IsNotEmpty()
  @IsString()
  ubicacion: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  cantidad_disponible: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  cantidad_total: number;
}
