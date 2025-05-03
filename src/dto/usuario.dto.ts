import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum TipoUsuario {
  ADMINISTRADOR = 'Administrador',
  BIBLIOTECARIO = 'Bibliotecario',
  CONSULTOR = 'Consultor',
}

export class CreateUsuarioDto {
  @ApiProperty({ description: 'Nombre del usuario' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  nombre: string;

  @ApiProperty({ description: 'Apellido del usuario' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  apellido: string;

  @ApiProperty({ description: 'Correo electrónico del usuario' })
  @IsNotEmpty()
  @IsEmail()
  correo: string;

  @ApiProperty({ description: 'Contraseña del usuario' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  contrasena: string;

  @ApiProperty({ 
    description: 'Tipo de usuario', 
    enum: TipoUsuario 
  })
  @IsNotEmpty()
  @IsEnum(TipoUsuario)
  tipo: TipoUsuario;
}

export class UpdateUsuarioDto {
  @ApiProperty({ description: 'Nombre del usuario' })
  @IsString()
  @Length(2, 100)
  nombre?: string;

  @ApiProperty({ description: 'Apellido del usuario' })
  @IsString()
  @Length(2, 100)
  apellido?: string;

  @ApiProperty({ description: 'Correo electrónico del usuario' })
  @IsEmail()
  correo?: string;

  @ApiProperty({ description: 'Contraseña del usuario' })
  @IsString()
  @Length(6, 50)
  contrasena?: string;

  @ApiProperty({ 
    description: 'Tipo de usuario', 
    enum: TipoUsuario 
  })
  @IsEnum(TipoUsuario)
  tipo?: TipoUsuario;
}