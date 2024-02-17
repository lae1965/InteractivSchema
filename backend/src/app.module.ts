import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { EmployeesModule } from './employees/employees.module';
import { SchemaModule } from './schema/schema.module';
import { WorkPlacesModule } from './work-places/work-places.module';
import { Schema } from './schema/model';
import { WorkPlace } from './work-places/model';
import { Employee } from './employees/model';

@Module({
  imports: [
    EmployeesModule,
    SchemaModule,
    WorkPlacesModule,
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'database.sqlite3',
      models: [Schema, WorkPlace, Employee],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
})
export class AppModule {}
