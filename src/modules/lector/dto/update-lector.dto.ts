import { IsEmail, IsEnum, IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateLectorDto {
  @IsOptional()
  @IsEnum(['Estudiante', 'Docente', 'Administrativo'])
  tipo?: 'Estudiante' | 'Docente' | 'Administrativo';

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  apellido?: string;

  @IsOptional()
  @IsString()
  identificacion?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}
