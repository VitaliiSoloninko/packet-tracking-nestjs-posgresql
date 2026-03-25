import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

export enum PacketStatus {
  PENDING = 'pending',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

@Table({
  tableName: 'packets',
  timestamps: true,
})
export class Packet extends Model<Packet> {
  @ApiProperty({
    description: 'Unique identifier for the packet',
    example: 1,
    type: 'integer',
  })
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @ApiProperty({
    description: 'Unique tracking number (UUID v4)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: 'string',
    format: 'uuid',
  })
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: true,
  })
  trackingNumber: string;

  @ApiProperty({
    description: 'Latitude coordinate of packet location',
    example: 55.751244,
    type: 'number',
    minimum: -90,
    maximum: 90,
  })
  @Column({
    type: DataType.DECIMAL(9, 6),
    allowNull: false,
  })
  lat: number;

  @ApiProperty({
    description: 'Longitude coordinate of packet location',
    example: 37.618423,
    type: 'number',
    minimum: -180,
    maximum: 180,
  })
  @Column({
    type: DataType.DECIMAL(9, 6),
    allowNull: false,
  })
  lng: number;

  @ApiProperty({
    description: 'Current status of the packet',
    example: PacketStatus.PENDING,
    enum: PacketStatus,
    default: PacketStatus.PENDING,
  })
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    defaultValue: PacketStatus.PENDING,
  })
  status: PacketStatus;

  @ApiProperty({
    description: 'Date and time when the packet record was created',
    example: '2026-03-25T10:00:00.000Z',
    type: 'string',
    format: 'date-time',
  })
  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the packet record was last updated',
    example: '2026-03-25T12:30:00.000Z',
    type: 'string',
    format: 'date-time',
  })
  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt: Date;
}
