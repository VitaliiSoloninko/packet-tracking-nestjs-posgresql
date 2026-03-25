import { PartialType } from '@nestjs/swagger';
import { CreatePacketDto } from './create-packet.dto';

export class UpdatePacketDto extends PartialType(CreatePacketDto) {}
