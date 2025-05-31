import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  apellido?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsEnum(['Administrador', 'Bibliotecario', 'Consultor'])
  tipo?: 'Administrador' | 'Bibliotecario' | 'Consultor';
}