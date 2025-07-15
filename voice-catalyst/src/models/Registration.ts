import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

class Registration extends Model {
  public registration_id!: number;
  public full_name!: string;
  public email!: string;
  public mobile_number!: string;
  public password!: string;
  public location!: string;
  public preferred_language!: string;
  public user_role!: string;
  public registered_at!: Date;
}

Registration.init({
  registration_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  full_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  mobile_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  preferred_language: {
    type: DataTypes.STRING(10),
    allowNull: true,
    defaultValue: 'en',
  },
  user_role: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  registered_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  sequelize,
  tableName: 'registration_table',
  timestamps: false,
});

export default Registration; 