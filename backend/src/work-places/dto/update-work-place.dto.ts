import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkPlaceDto } from './create-work-place.dto';

export class UpdateWorkPlaceDto extends PartialType(CreateWorkPlaceDto) {}
