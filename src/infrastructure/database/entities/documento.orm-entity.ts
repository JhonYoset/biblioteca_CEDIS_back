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

  @Column({ type: 'date', nullable: true })
  fecha_publicacion: Date;

  @CreateDateColumn()
  fecha_registro: Date;

  @UpdateDateColumn()
  fecha_actualizacion: Date;

  @Column({
    type: 'enum',
    enum: ['Disponible', 'No disponible', 'Reservador'],
  })
  estado: 'Disponible' | 'No disponible' | 'Reservado';
  
  @OneToMany(() => PrestamoOrmEntity, prestamo => prestamo.documento)
  prestamos: PrestamoOrmEntity[];
}