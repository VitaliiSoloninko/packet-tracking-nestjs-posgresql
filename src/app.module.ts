import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { Packet } from './models/packet.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      ...databaseConfig,
      models: [Packet],
    }),
    SequelizeModule.forFeature([Packet]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
