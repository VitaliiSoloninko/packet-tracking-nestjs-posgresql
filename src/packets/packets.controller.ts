import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Packet } from '../models/packet.model';
import { CreatePacketDto } from './dto/create-packet.dto';
import { UpdatePacketDto } from './dto/update-packet.dto';
import { PacketsService } from './packets.service';

@ApiTags('packets')
@Controller('packets')
export class PacketsController {
  constructor(private readonly packetsService: PacketsService) {}

  @Post()
  create(@Body() createPacketDto: CreatePacketDto) {
    return this.packetsService.create(createPacketDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all packets' })
  @ApiResponse({
    status: 200,
    description: 'Return all packets ordered by creation date (newest first)',
    type: [Packet],
  })
  findAll(): Promise<Packet[]> {
    return this.packetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePacketDto: UpdatePacketDto) {
    return this.packetsService.update(+id, updatePacketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packetsService.remove(+id);
  }
}
