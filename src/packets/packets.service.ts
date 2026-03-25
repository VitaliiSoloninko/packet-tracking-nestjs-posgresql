import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
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

  async findAll(startDate?: string, endDate?: string): Promise<Packet[]> {
    const whereClause: any = {};

    // Validate and apply date filters
    if (startDate || endDate) {
      whereClause.createdAt = {};

      if (startDate) {
        const start = new Date(startDate);
        if (isNaN(start.getTime())) {
          throw new BadRequestException(
            'Invalid startDate format. Use YYYY-MM-DD',
          );
        }
        whereClause.createdAt[Op.gte] = start;
      }

      if (endDate) {
        const end = new Date(endDate);
        if (isNaN(end.getTime())) {
          throw new BadRequestException(
            'Invalid endDate format. Use YYYY-MM-DD',
          );
        }
        // Set end date to end of day (23:59:59.999)
        end.setHours(23, 59, 59, 999);
        whereClause.createdAt[Op.lte] = end;
      }
    }

    return this.packetModel.findAll({
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
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
