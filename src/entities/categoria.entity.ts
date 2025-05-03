import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Documento } from './documento.entity';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  categoria_id: number;

  @Column({ length: 100, unique: true })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion: Date;

  @OneToMany(() => Documento, documento => documento.categoria)
  documentos: Documento[];
}