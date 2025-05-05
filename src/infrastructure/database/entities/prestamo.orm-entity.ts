import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LectorOrmEntity } from './lector.orm-entity';
import { DocumentoOrmEntity } from './documento.orm-entity';
import { UsuarioOrmEntity } from './usuario.orm-entity';

@Entity('prestamos')
export class PrestamoOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lector_id: number;

  @ManyToOne(() => LectorOrmEntity, lector => lector.prestamos)
  @JoinColumn({ name: 'lector_id' })
  lector: LectorOrmEntity;

  @Column()
  documento_id: number;

  @ManyToOne(() => DocumentoOrmEntity, documento => documento.prestamos)
  @JoinColumn({ name: 'documento_id' })
  documento: DocumentoOrmEntity;

  @Column()
  usuario_id: number;

  @ManyToOne(() => UsuarioOrmEntity, usuario => usuario.prestamos)
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioOrmEntity;

  @Column({ type: 'date' })
  fecha_prestamo: Date;

  @Column({ type: 'date' })
  fecha_devolucion_programada: Date;

  @Column({ type: 'date', nullable: true })
  fecha_devolucion_real: Date;

  @Column()
  estado: string; // 'Prestado', 'Devuelto', 'Atrasado'

  @Column({ nullable: true })
  observaciones: string;
}