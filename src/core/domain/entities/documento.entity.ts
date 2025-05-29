export class DocumentoEntity {
  constructor(
    public readonly id: number,
    public categoria_id: number,
    public titulo: string,
    public autor: string,
    public editorial: string,
    public tipo: 'Libro' | 'Tesis' | 'Diapositiva' | 'Otro',
    public fecha_publicacion: Date,
    public fecha_registro: Date,
    public fecha_actualizacion: Date,
    public estado: 'Disponible' | 'No disponible' | 'Reservado',
  ) {}
}