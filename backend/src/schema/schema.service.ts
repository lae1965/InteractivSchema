import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { unlinkSync } from 'fs';
import { join } from 'path';

import { CreateSchemaDto } from './dto/create-schema.dto';
import { Schema } from './model';
import { WorkPlace } from 'src/work-places/model';
import config from 'src/config';

@Injectable()
export class SchemaService {
  constructor(
    @InjectModel(Schema)
    private schemaModel: typeof Schema,
  ) {}

  async create(createSchemaDto: CreateSchemaDto) {
    try {
      return await this.schemaModel.create(createSchemaDto);
    } catch (e) {
      unlinkSync(join(config().publicPath, createSchemaDto.img));
      throw e;
    }
  }

  async findAll() {
    const response = await this.schemaModel.findAll({
      attributes: ['id', 'name'],
    });
    return response.map((schema) => schema.toJSON());
  }

  async findOne(id: number) {
    return await this.schemaModel.findByPk(id, { include: WorkPlace });
  }

  async remove(id: number) {
    const img = await this.schemaModel.findByPk(id, { attributes: ['img'] });
    if (!img) return 0;
    unlinkSync(join(config().publicPath, img.toJSON().img));
    return await this.schemaModel.destroy({ where: { id } });
  }
}
