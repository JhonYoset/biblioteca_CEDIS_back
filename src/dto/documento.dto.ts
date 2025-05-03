import { IsEnum, IsInt, IsISBN, IsNotEmpty, IsOptional, IsPositive, IsString, Length, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum TipoDocumento {
  LIBRO = 'Libro',
  TESIS = 'Tesis',
  DIAPOSITIVA = 'Diapositiva',
  OTRO = 'Otro',
}

export class CreateDocumentoDto {
  @ApiProperty({ description: 'ID de la categoría' })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  categoria_id: number;

  @ApiProperty({ description: 'Título del documento' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  titulo: string;

  @ApiProperty({ description: 'Autor del documento' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  autor: string;

  @ApiProperty({ description: 'Editorial del documento' })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  editorial?: string;

  @ApiProperty({ 
    description: 'Tipo de documento', 
    enum: TipoDocumento 
  })
  @IsNotEmpty()
  @IsEnum(TipoDocumento)
  tipo: TipoDocumento;

  @ApiProperty({ description: 'ISBN del documento' })
  @IsOptional()
  @IsISBN()
  isbn?: string;

  @ApiProperty({ description: 'Año de publicación' })
  @IsOptional()
  @IsInt()
  @Min(1000)
  anio_publicacion?: number;

  @ApiProperty({ description: 'Ubicación física del documento' })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  ubicacion?: string;

  @ApiProperty({ description: 'Cantidad total de ejemplares' })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  cantidad_total: number;

  @ApiProperty({ description: 'Cantidad disponible de ejemplares' })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  cantidad_disponible: number;
}

export class UpdateDocumentoDto {
  @ApiProperty({ description: 'ID de la categoría' })
  @IsOptional()
  @IsInt()
  @IsPositive()
  categoria_id?: number;

  @ApiProperty({ description: 'Título del documento' })
  @IsOptional()
  @IsString()
  @Length(2, 255)
  titulo?: string;

  @ApiProperty({ description: 'Autor del documento' })
  @IsOptional()
  @IsString()
  @Length(2, 255)
  autor?: string;

  @ApiProperty({ description: 'Editorial del documento' })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  editorial?: string;

  @ApiProperty({ 
    description: 'Tipo de documento', 
    enum: TipoDocumento 
  })
  @IsOptional()
  @IsEnum(TipoDocumento)
  tipo?: TipoDocumento;

  @ApiProperty({ description: 'ISBN del documento' })
  @IsOptional()
  @IsISBN()
  isbn?: string;

  @ApiProperty({ description: 'Año de publicación' })
  @IsOptional()
  @IsInt()
  @Min(1000)
  anio_publicacion?: number;

  @ApiProperty({ description: 'Ubicación física del documento' })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  ubicacion?: string;

  @ApiProperty({ description: 'Cantidad total de ejemplares' })
  @IsOptional()
  @IsInt()
  @Min(0)
  cantidad_total?: number;

  @ApiProperty({ description: 'Cantidad disponible de ejemplares' })
  @IsOptional()
  @IsInt()
  @Min(0)
  cantidad_disponible?: number;

  @ApiProperty({ description: 'Estado del documento (activo/inactivo)' })
  @IsOptional()
  estado?: boolean;
}