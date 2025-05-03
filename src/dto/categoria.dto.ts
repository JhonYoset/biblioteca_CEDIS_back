import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({ description: 'Nombre de la categoría' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  nombre: string;

  @ApiProperty({ description: 'Descripción de la categoría' })
  @IsOptional()
  @IsString()
  descripcion?: string;
}

export class UpdateCategoriaDto {
  @ApiProperty({ description: 'Nombre de la categoría' })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  nombre?: string;

  @ApiProperty({ description: 'Descripción de la categoría' })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
