import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

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
  @IsEnum(['Administrador', 'Bibliotecario', 'Consultor'])
  tipo: 'Administrador' | 'Bibliotecario' | 'Consultor';
}