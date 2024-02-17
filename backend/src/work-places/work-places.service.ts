import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';

import { CreateWorkPlaceDto } from './dto/create-work-place.dto';
import { UpdateWorkPlaceDto } from './dto/update-work-place.dto';
import { WorkPlace } from './model';

@Injectable()
export class WorkPlacesService {
  constructor(
    @InjectModel(WorkPlace)
    private workPlaceModel: typeof WorkPlace,
  ) {}

  async create(createWorkPlaceDto: CreateWorkPlaceDto) {
    try {
      const response = await this.workPlaceModel.create(createWorkPlaceDto);
      return { id: response.id };
    } catch (e) {
      throw e;
    }
  }

  async getAll() {
    return await this.workPlaceModel.findAll();
  }

  async update(id: number, updateWorkPlaceDto: UpdateWorkPlaceDto) {
    console.log('ID:', id);
    console.log('updateDTO:', updateWorkPlaceDto);

    try {
      return await this.workPlaceModel.update(updateWorkPlaceDto, {
        where: { id },
      });
    } catch (e) {
      throw e;
    }
  }

  async remove(id: number) {
    return await this.workPlaceModel.destroy({ where: { id } });
  }
}
