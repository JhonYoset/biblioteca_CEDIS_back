export class LectorEntity {
  constructor(
    public readonly id: number,
    public tipo: 'Estudiante' | 'Docente' | 'Administrativo',
    public nombre: string,
    public apellido: string,
    public identificacion: string,
    public correo: string,
    public telefono: string,
    public fecha_registro: Date,
    public estado: boolean,
  ) {}
}