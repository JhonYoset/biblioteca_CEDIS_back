import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { LectorOrmEntity } from './lector.orm-entity';
import { DocumentoOrmEntity } from './documento.orm-entity';
import { UsuarioOrmEntity } from './usuario.orm-entity';

@Entity('reservas')
export class ReservaOrmEntity {
  @PrimaryGeneratedColumn()
  reserva_id: number;

  @Column({ type: 'timestamp' })
  fecha_inicio_reserva: Date;

  @Column({ type: 'timestamp' })
  fecha_final_reserva: Date;

  @Column()
  estado_reserva: String;

  // realacion con la tabla documentos
  @ManyToOne(() => DocumentoOrmEntity, documento => documento.reservas)
  @JoinColumn({ name: 'doc_fisico_id' })
  documento: DocumentoOrmEntity;

  // relacion con la tabla lector
  @ManyToOne(() =>  LectorOrmEntity, lector => lector.reservas)
  @JoinColumn({ name: 'lector_id' })
  lector: LectorOrmEntity;
}