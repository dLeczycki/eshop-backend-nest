import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

import { config } from '../config/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ProductModule } from '../product/product.module';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      database: config.database.name,
      entities: ['dist/**/**.entity{.ts,.js}'],
      bigNumberStrings: false,
      logging: config.database.logging,
      synchronize: config.database.synchronize,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ProductModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
