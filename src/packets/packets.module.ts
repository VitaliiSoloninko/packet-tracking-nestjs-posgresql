import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Packet } from '../models/packet.model';
import { PacketsController } from './packets.controller';
import { PacketsService } from './packets.service';

@Module({
  imports: [SequelizeModule.forFeature([Packet])],
  controllers: [PacketsController],
  providers: [PacketsService],
})
export class PacketsModule {}
