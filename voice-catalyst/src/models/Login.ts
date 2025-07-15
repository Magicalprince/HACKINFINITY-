import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

class Login extends Model {
  public login_id!: number;
  public email!: string;
  public password!: string;
  public user_id!: number;
}

Login.init({
  login_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'login_table',
  timestamps: false,
});

export default Login; 