import User from './User';
import Registration from './Registration';
import Login from './Login';
import Product from './Product';
import sequelize from '../config/db';

// Define relationships
User.hasMany(Product, { foreignKey: 'user_id' });
Product.belongsTo(User, { foreignKey: 'user_id' });

// Export all models
export {
  User,
  Registration,
  Login,
  Product,
  sequelize
}; 