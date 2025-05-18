export class CategoriaEntity {
  constructor(
    public readonly id: number,
    public nombre: string,
    public descripcion: string,
    public fecha_creacion: Date,
    public fecha_actualizacion: Date,
  ) {}
}