import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../database/connection';

// Store attributes interface
export interface IStore {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Store creation attributes interface
export interface IStoreCreationAttributes extends Optional<IStore, 'id' | 'createdAt' | 'updatedAt'> {}

// Store model class
export class Store extends Model<IStore, IStoreCreationAttributes> implements IStore {
  public id!: string;
  public name!: string;
  public address!: string;
  public city!: string;
  public state!: string;
  public zipCode!: string;
  public phone!: string;
  public email!: string;
  public userId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Initialize Store model
Store.init(
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    userId: {
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
    tableName: 'stores',
  }
);
