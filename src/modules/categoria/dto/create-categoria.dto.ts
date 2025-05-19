import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoriaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;
<<<<<<< HEAD
}
=======
}
>>>>>>> ca3a3a6 (MDesarrollo del modulo de categorias completo)
