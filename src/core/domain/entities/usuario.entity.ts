export class UsuarioEntity {
  constructor(
    public readonly id: number,
    public nombre: string,
    public apellido: string,
    public correo: string,
<<<<<<< HEAD
=======
    public contraseña: string,
>>>>>>> 5071abc (Core de usuario completado)
    public tipo: 'Administrador' | 'Bibliotecario' | 'Consultor',
    public fecha_creacion: Date,
    public fecha_actualizacion: Date,
  ) {}
}