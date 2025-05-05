import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { PrestamoOrmEntity } from './prestamo.orm-entity';

@Entity('lectores')
export class LectorOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['Estudiante', 'Docente', 'Administrativo'],
  })
  tipo: 'Estudiante' | 'Docente' | 'Administrativo';

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  identificacion: string;

  @Column()
  correo: string;

  @Column()
  telefono: string;

  @CreateDateColumn()
  fecha_registro: Date;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => PrestamoOrmEntity, prestamo => prestamo.lector)
  prestamos: PrestamoOrmEntity[];
}