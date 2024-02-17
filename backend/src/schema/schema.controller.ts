import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  HttpCode,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { SchemaService } from './schema.service';
import { CreateSchemaDto } from './dto/create-schema.dto';
import { HelperFileLoader } from './../util/HelperFileLoader';

const helperFileLoader = new HelperFileLoader();
@Controller('schema')
export class SchemaController {
  constructor(private readonly schemaService: SchemaService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: helperFileLoader.destinationPath,
        filename: helperFileLoader.customFileName,
      }),
    }),
  )
  async create(
    @Body() createSchemaDto: CreateSchemaDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      createSchemaDto.img = file.filename;
      return await this.schemaService.create(createSchemaDto);
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError')
        throw new BadRequestException({
          error: `The schema "${createSchemaDto.name}" is already exist.`,
        });
      throw e;
    }
  }

  @Get()
  async findAll() {
    return await this.schemaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response = await this.schemaService.findOne(+id);
    if (!!response) return response;
    throw new NotFoundException({
      error: `The schema with id = ${id} does not exist`,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    if (await this.schemaService.remove(+id)) return;
    throw new NotFoundException({
      error: `The schema with id = ${id} does not exist`,
    });
  }
}
