export class PrestamoEntity {
  constructor(
    public readonly id: number,
    public lector_id: number,
    public documento_id: number,
    public usuario_id: number,
    public fecha_prestamo: Date,
    public fecha_devolucion_programada: Date,
    public fecha_devolucion_real: Date | null,
    public estado: string, // 'Prestado', 'Devuelto', 'Atrasado'
    public observaciones: string,
  ) {}
}