import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryColumn()
  id: string;

  @Column()
  orid: string;

  @Column()
  salesforce_id: string;

  @Column()
  type: string;

  @Column()
  status: string;
}
