import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Get,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { WorkPlacesService } from './work-places.service';
import { CreateWorkPlaceDto } from './dto/create-work-place.dto';
import { UpdateWorkPlaceDto } from './dto/update-work-place.dto';

@Controller('workplaces')
export class WorkPlacesController {
  constructor(private readonly workPlacesService: WorkPlacesService) {}

  @Post()
  async create(@Body() createWorkPlaceDto: CreateWorkPlaceDto) {
    try {
      return await this.workPlacesService.create(createWorkPlaceDto);
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError')
        throw new BadRequestException({
          error: `This employee already has his own workplace.`,
        });
      throw e;
    }
  }

  @Get()
  async getAll() {
    return await this.workPlacesService.getAll();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWorkPlaceDto: UpdateWorkPlaceDto,
  ) {
    try {
      const response = await this.workPlacesService.update(
        +id,
        updateWorkPlaceDto,
      );
      if (response[0]) return true;
      throw new NotFoundException({
        error: `The workplace with id = ${id} does not exist`,
      });
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError')
        throw new BadRequestException({
          error: `This employee already has his own workplace.`,
        });
      throw e;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    if (await this.workPlacesService.remove(+id)) return;
    throw new NotFoundException({
      error: `The workplace with id = ${id} does not exist`,
    });
  }
}
