import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { DataType, Model, Column, Table, HasMany } from 'sequelize-typescript';

import { WorkPlace } from 'src/work-places/model';

@Table({ timestamps: false })
export class Schema extends Model<
  InferAttributes<Schema>,
  InferCreationAttributes<Schema>
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ unique: true })
  name: string;

  @Column
  img: string;

  @Column
  width: number;

  @Column
  height: number;

  @HasMany(() => WorkPlace, { onDelete: 'CASCADE' })
  workPlace: WorkPlace[];
}
