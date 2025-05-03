import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Lector } from './lector.entity';
import { Documento } from './documento.entity';
import { Usuario } from './usuario.entity';

@Entity('prestamos')
export class Prestamo {
  @PrimaryGeneratedColumn()
  prestamo_id: number;

  @Column()
  lector_id: number;

  @Column()
  documento_id: number;

  @Column()
  usuario_id: number;

  @CreateDateColumn({ name: 'fecha_prestamo' })
  fechaPrestamo: Date;

  @Column({ name: 'fecha_devolucion_programada' })
  fechaDevolucionProgramada: Date;

  @Column({ name: 'fecha_devolucion_real', nullable: true })
  fechaDevolucionReal: Date;

  @Column({ length: 20 })
  estado: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @ManyToOne(() => Lector, lector => lector.prestamos)
  @JoinColumn({ name: 'lector_id' })
  lector: Lector;

  @ManyToOne(() => Documento, documento => documento.prestamos)
  @JoinColumn({ name: 'documento_id' })
  documento: Documento;

  @ManyToOne(() => Usuario, usuario => usuario.prestamos)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;
}