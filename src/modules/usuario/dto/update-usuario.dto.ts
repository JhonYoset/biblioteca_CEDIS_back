import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

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
  @IsString()
  @MinLength(6)
  contraseña?: string;

  @IsOptional()
  @IsEnum(['Administrador', 'Bibliotecario', 'Consultor'])
  tipo?: 'Administrador' | 'Bibliotecario' | 'Consultor';
<<<<<<< HEAD
}
=======
}
>>>>>>> d966938 (modulo de usuario completo)
