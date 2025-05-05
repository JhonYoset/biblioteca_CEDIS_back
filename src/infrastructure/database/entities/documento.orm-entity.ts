import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CategoriaOrmEntity } from './categoria.orm-entity';
import { PrestamoOrmEntity } from './prestamo.orm-entity';

@Entity('documentos')
export class DocumentoOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoria_id: number;

  @ManyToOne(() => CategoriaOrmEntity, categoria => categoria.documentos)
  @JoinColumn({ name: 'categoria_id' })
  categoria: CategoriaOrmEntity;

  @Column()
  titulo: string;

  @Column()
  autor: string;

  @Column()
  editorial: string;

  @Column({
    type: 'enum',
    enum: ['Libro', 'Tesis', 'Diapositiva', 'Otro'],
  })
  tipo: 'Libro' | 'Tesis' | 'Diapositiva' | 'Otro';

  @Column({ nullable: true })
  isbn: string;

  @Column({ type: 'date', nullable: true })
  fecha_publicacion: Date;

  @Column()
  ubicacion: string;

  @Column()
  cantidad_disponible: number;

  @Column()
  cantidad_total: number;

  @CreateDateColumn()
  fecha_registro: Date;

  @UpdateDateColumn()
  fecha_actualizacion: Date;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => PrestamoOrmEntity, prestamo => prestamo.documento)
  prestamos: PrestamoOrmEntity[];
}