import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Prestamo } from './prestamo.entity';

@Entity('lectores')
export class Lector {
  @PrimaryGeneratedColumn()
  lector_id: number;

  @Column({ length: 20 })
  tipo: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ length: 20, unique: true })
  identificacion: string;

  @Column({ length: 100, unique: true })
  correo: string;

  @Column({ length: 20, nullable: true })
  telefono: string;

  @CreateDateColumn({ name: 'fecha_registro' })
  fechaRegistro: Date;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Prestamo, prestamo => prestamo.lector)
  prestamos: Prestamo[];
}
