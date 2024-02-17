import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Employee } from './model';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee)
    private employeeModel: typeof Employee,
  ) {}

  async create(name: string) {
    try {
      const response = await this.employeeModel.create({ name });
      return { id: response.id };
    } catch (e) {
      throw e;
    }
  }

  async createAll(names: string[]) {
    try {
      const idArray = [];
      for (const name of names) {
        idArray.push(await this.employeeModel.create({ name }));
      }
      return idArray;
    } catch (e) {
      throw e;
    }
  }

  async findAll() {
    return await this.employeeModel.findAll();
  }

  async findOne(id: number) {
    return await this.employeeModel.findByPk(id);
  }

  async update(id: number, name: string) {
    try {
      return await this.employeeModel.update({ name }, { where: { id } });
    } catch (e) {
      throw e;
    }
  }

  async remove(id: number) {
    return await this.employeeModel.destroy({ where: { id } });
  }
}
