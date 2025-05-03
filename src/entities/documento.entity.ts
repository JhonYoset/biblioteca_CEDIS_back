import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Categoria } from './categoria.entity';
import { Prestamo } from './prestamo.entity';

@Entity('documentos')
export class Documento {
  @PrimaryGeneratedColumn()
  documento_id: number;

  @Column()
  categoria_id: number;

  @Column({ length: 255 })
  titulo: string;

  @Column({ length: 255 })
  autor: string;

  @Column({ length: 100, nullable: true })
  editorial: string;

  @Column({ length: 20 })
  tipo: string;

  @Column({ length: 20, nullable: true })
  isbn: string;

  @Column({ nullable: true })
  anio_publicacion: number;

  @Column({ length: 100, nullable: true })
  ubicacion: string;

  @Column({ default: 0 })
  cantidad_disponible: number;

  @Column({ default: 0 })
  cantidad_total: number;

  @CreateDateColumn({ name: 'fecha_registro' })
  fechaRegistro: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion: Date;

  @Column({ default: true })
  estado: boolean;

  @ManyToOne(() => Categoria, categoria => categoria.documentos)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @OneToMany(() => Prestamo, prestamo => prestamo.documento)
  prestamos: Prestamo[];
}
