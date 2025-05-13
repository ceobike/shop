import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../database/connection';

// Procurement status enum
export enum ProcurementStatus {
  PENDING = 'pending',
  ORDERED = 'ordered',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

// Procurement attributes interface
export interface IProcurement {
  id: string;
  productId: string;
  storeId: string;
  quantity: number;
  price: number;
  supplier: string;
  orderDate: Date;
  deliveryDate: Date | null;
  status: ProcurementStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Procurement creation attributes interface
export interface IProcurementCreationAttributes extends Optional<IProcurement, 'id' | 'deliveryDate' | 'createdAt' | 'updatedAt'> {}

// Procurement model class
export class Procurement extends Model<IProcurement, IProcurementCreationAttributes> implements IProcurement {
  public id!: string;
  public productId!: string;
  public storeId!: string;
  public quantity!: number;
  public price!: number;
  public supplier!: string;
  public orderDate!: Date;
  public deliveryDate!: Date | null;
  public status!: ProcurementStatus;
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Initialize Procurement model
Procurement.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    storeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    supplier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(ProcurementStatus)),
      allowNull: false,
      defaultValue: ProcurementStatus.PENDING,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'procurement',
  }
);
