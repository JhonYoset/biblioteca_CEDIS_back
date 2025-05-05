import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLectorDto {
  @IsNotEmpty()
  @IsEnum(['Estudiante', 'Docente', 'Administrativo'])
  tipo: 'Estudiante' | 'Docente' | 'Administrativo';

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsNotEmpty()
  @IsString()
  identificacion: string;

  @IsNotEmpty()
  @IsEmail()
  correo: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;
}
