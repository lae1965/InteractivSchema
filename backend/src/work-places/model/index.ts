import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  DataType,
  Model,
  Column,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { Employee } from 'src/employees/model';
import { Schema } from 'src/schema/model';

@Table({ timestamps: false })
export class WorkPlace extends Model<
  InferAttributes<WorkPlace>,
  InferCreationAttributes<WorkPlace>
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  x: number;

  @Column
  y: number;

  @ForeignKey(() => Schema)
  @Column
  schemaId: number;

  @BelongsTo(() => Schema)
  schema: Schema;

  @ForeignKey(() => Employee)
  @Column({
    unique: true,
  })
  employeeId: number;

  @BelongsTo(() => Employee)
  employee: Employee;
}
