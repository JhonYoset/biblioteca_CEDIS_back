export class DocumentoEntity {
  constructor(
    public readonly id: number,
    public categoria_id: number,
    public titulo: string,
    public autor: string,
    public editorial: string,
    public tipo: 'Libro' | 'Tesis' | 'Diapositiva' | 'Otro',
    public isbn: string,
    public fecha_publicacion: Date,
    public ubicacion: string,
    public cantidad_disponible: number,
    public cantidad_total: number,
    public fecha_registro: Date,
    public fecha_actualizacion: Date,
    public estado: boolean,
  ) {}
}