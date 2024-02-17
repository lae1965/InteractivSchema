import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    try {
      return await this.employeesService.create(createEmployeeDto.name);
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError')
        throw new BadRequestException({
          error: `The name "${createEmployeeDto.name}" is already exist.`,
        });
      throw e;
    }
  }

  @Post('all')
  async createAll(@Body() names: string[]) {
    return await this.employeesService.createAll(names);
  }

  @Get()
  async findAll() {
    return await this.employeesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response = await this.employeesService.findOne(+id);
    if (!!response) return response;
    throw new NotFoundException({
      error: `The employee with id = ${id} does not exist`,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    try {
      const response = await this.employeesService.update(
        +id,
        updateEmployeeDto.name,
      );
      if (response[0]) return true;
      throw new NotFoundException({
        error: `The employee with id = ${id} does not exist`,
      });
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError')
        throw new BadRequestException({
          error: `The name "${updateEmployeeDto.name}" is already exist.`,
        });
      throw e;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    if (await this.employeesService.remove(+id)) return;
    throw new NotFoundException({
      error: `The employee with id = ${id} does not exist`,
    });
  }
}
