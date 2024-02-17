import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { WorkPlacesService } from './work-places.service';
import { WorkPlacesController } from './work-places.controller';
import { WorkPlace } from './model';

@Module({
  imports: [SequelizeModule.forFeature([WorkPlace])],
  controllers: [WorkPlacesController],
  providers: [WorkPlacesService],
})
export class WorkPlacesModule {}
