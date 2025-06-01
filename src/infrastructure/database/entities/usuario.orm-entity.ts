import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { PrestamoOrmEntity } from './prestamo.orm-entity';

@Entity('usuarios')
export class UsuarioOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  correo: string;

  @Column({
    type: 'enum',
    enum: ['Administrador', 'Bibliotecario', 'Consultor'],
  })
  tipo: 'Administrador' | 'Bibliotecario' | 'Consultor';

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_actualizacion: Date;

  @OneToMany(() => PrestamoOrmEntity, prestamo => prestamo.usuario)
  prestamos: PrestamoOrmEntity[];
  
}