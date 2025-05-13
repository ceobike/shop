import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../database/connection';

// Product attributes interface
export interface IProduct {
  id: string;
  name: string;
  sku: string;
  description: string;
  category: string;
  price: number;
  cost: number;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Product creation attributes interface
export interface IProductCreationAttributes extends Optional<IProduct, 'id' | 'createdAt' | 'updatedAt'> {}

// Product model class
export class Product extends Model<IProduct, IProductCreationAttributes> implements IProduct {
  public id!: string;
  public name!: string;
  public sku!: string;
  public description!: string;
  public category!: string;
  public price!: number;
  public cost!: number;
  public storeId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Initialize Product model
Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    storeId: {
      type: DataTypes.UUID,
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
    tableName: 'products',
  }
);
