import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsNotEmpty()
  @IsEmail()
  correo: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  contraseña: string;

  @IsNotEmpty()
  @IsEnum(['Administrador', 'Bibliotecario', 'Consultor'])
  tipo: 'Administrador' | 'Bibliotecario' | 'Consultor';
}