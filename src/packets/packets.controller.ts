import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({
    summary: 'Get all packets with optional date range filtering',
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
    description: 'Filter packets from this date (ISO 8601 format: YYYY-MM-DD)',
    example: '2026-01-01',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
    description: 'Filter packets until this date (ISO 8601 format: YYYY-MM-DD)',
    example: '2026-04-30',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all packets ordered by creation date (newest first)',
    type: [Packet],
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid date format provided',
  })
  findAll(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<Packet[]> {
    return this.packetsService.findAll(startDate, endDate);
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
