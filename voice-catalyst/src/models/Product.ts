import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

class Product extends Model {
  public product_id!: number;
  public user_id!: number;
  public product_name!: string;
  public quantity!: string;
  public price!: number;
  public description_en!: string;
  public description_local!: string;
  public language_used!: string;
  public added_on!: Date;
}

Product.init({
  product_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  product_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description_en: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  description_local: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  language_used: {
    type: DataTypes.STRING(10),
    allowNull: true,
    defaultValue: 'en',
  },
  added_on: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  sequelize,
  tableName: 'product_catalog',
  timestamps: false,
});

export default Product; 