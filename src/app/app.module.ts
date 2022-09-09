import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from '../config/config';
import { ProductModule } from '../product/product.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
