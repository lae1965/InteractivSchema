import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { SchemaService } from './schema.service';
import { SchemaController } from './schema.controller';
import { Schema } from './model';

@Module({
  imports: [SequelizeModule.forFeature([Schema])],
  controllers: [SchemaController],
  providers: [SchemaService],
})
export class SchemaModule {}
