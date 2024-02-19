import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { EmployeesModule } from './employees/employees.module';

import { SchemaModule } from './schema/schema.module';
import { WorkPlacesModule } from './work-places/work-places.module';
import { Schema } from './schema/model';
import { WorkPlace } from './work-places/model';
import { Employee } from './employees/model';
import config from './config';

console.log('MODE:', process.env.NODE_ENV);
console.log('PUBLIC:', config[process.env.NODE_ENV].publicPath);
console.log('DATABASE:', config[process.env.NODE_ENV].databaseStorage);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    EmployeesModule,
    SchemaModule,
    WorkPlacesModule,
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: config[process.env.NODE_ENV].databaseStorage,
      models: [Schema, WorkPlace, Employee],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: config[process.env.NODE_ENV].publicPath,
    }),
  ],
})
export class AppModule {}
