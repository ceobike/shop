import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../database/connection';

// Order status enum
export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

// Payment method enum
export enum PaymentMethod {
  CASH = 'cash',
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  BANK_TRANSFER = 'bank_transfer',
  MOBILE_PAYMENT = 'mobile_payment',
}

// Order attributes interface
export interface IOrder {
  id: string;
  orderNumber: string;
  customer: string;
  storeId: string;
  orderDate: Date;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  updatedAt: Date;
}

// Order creation attributes interface
export interface IOrderCreationAttributes extends Optional<IOrder, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'> {}

// Order model class
export class Order extends Model<IOrder, IOrderCreationAttributes> implements IOrder {
  public id!: string;
  public orderNumber!: string;
  public customer!: string;
  public storeId!: string;
  public orderDate!: Date;
  public totalAmount!: number;
  public status!: OrderStatus;
  public paymentMethod!: PaymentMethod;
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Initialize Order model
Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    customer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    storeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(OrderStatus)),
      allowNull: false,
      defaultValue: OrderStatus.PENDING,
    },
    paymentMethod: {
      type: DataTypes.ENUM(...Object.values(PaymentMethod)),
      allowNull: false,
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
    tableName: 'orders',
    hooks: {
      beforeCreate: (order: Order) => {
        // Generate order number if not provided
        if (!order.orderNumber) {
          const timestamp = new Date().getTime().toString().slice(-6);
          const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
          order.orderNumber = `ORD-${timestamp}-${random}`;
        }
      },
    },
  }
);
