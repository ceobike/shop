import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../database/connection';

// Inventory attributes interface
export interface IInventory {
  id: string;
  productId: string;
  storeId: string;
  quantity: number;
  minQuantity: number;
  maxQuantity: number;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Inventory creation attributes interface
export interface IInventoryCreationAttributes extends Optional<IInventory, 'id' | 'lastUpdated' | 'createdAt' | 'updatedAt'> {}

// Inventory model class
export class Inventory extends Model<IInventory, IInventoryCreationAttributes> implements IInventory {
  public id!: string;
  public productId!: string;
  public storeId!: string;
  public quantity!: number;
  public minQuantity!: number;
  public maxQuantity!: number;
  public lastUpdated!: Date;
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Initialize Inventory model
Inventory.init(
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
      defaultValue: 0,
    },
    minQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    maxQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    lastUpdated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
    tableName: 'inventory',
    hooks: {
      beforeUpdate: (inventory: Inventory) => {
        inventory.lastUpdated = new Date();
      },
    },
  }
);
