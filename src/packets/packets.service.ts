import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Packet } from '../models/packet.model';
import { CreatePacketDto } from './dto/create-packet.dto';
import { UpdatePacketDto } from './dto/update-packet.dto';

@Injectable()
export class PacketsService {
  constructor(
    @InjectModel(Packet)
    private packetModel: typeof Packet,
  ) {}

  create(createPacketDto: CreatePacketDto) {
    return 'This action adds a new packet';
  }

  async findAll(): Promise<Packet[]> {
    return this.packetModel.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} packet`;
  }

  update(id: number, updatePacketDto: UpdatePacketDto) {
    return `This action updates a #${id} packet`;
  }

  remove(id: number) {
    return `This action removes a #${id} packet`;
  }
}
