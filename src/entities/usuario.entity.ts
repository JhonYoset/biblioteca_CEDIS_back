import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Prestamo } from './prestamo.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  usuario_id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ length: 100, unique: true })
  correo: string;

  @Column({ length: 255 })
  contrasena: string;

  @Column({ length: 20 })
  tipo: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion: Date;

  @OneToMany(() => Prestamo, prestamo => prestamo.usuario)
  prestamos: Prestamo[];
}
