import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { DataType, Model, Column, Table, HasOne } from 'sequelize-typescript';

import { WorkPlace } from 'src/work-places/model';

@Table({ timestamps: false })
export class Employee extends Model<
  InferAttributes<Employee>,
  InferCreationAttributes<Employee>
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ unique: true })
  name: string;

  @HasOne(() => WorkPlace, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  workPlace: WorkPlace;
}
