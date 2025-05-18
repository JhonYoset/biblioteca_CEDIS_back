import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { DocumentoOrmEntity } from './documento.orm-entity';

@Entity('categorias')
export class CategoriaOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column()
  descripcion: string;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_actualizacion: Date;

  @OneToMany(() => DocumentoOrmEntity, documento => documento.categoria)
  documentos: DocumentoOrmEntity[];
}
