import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterReturnDto {
  @IsNotEmpty()
  @IsDateString()
  fecha_devolucion_real: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}