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
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: true,
  })
  trackingNumber: string;

  @Column({
    type: DataType.DECIMAL(9, 6),
    allowNull: false,
  })
  lat: number;

  @Column({
    type: DataType.DECIMAL(9, 6),
    allowNull: false,
  })
  lng: number;

  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    defaultValue: PacketStatus.PENDING,
  })
  status: PacketStatus;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt: Date;
}
