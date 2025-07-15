import type { NextApiRequest, NextApiResponse } from 'next';
import { sequelize, User, Registration, Login, Product } from '../../models';

type Data = {
  success: boolean;
  message: string;
  details?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // This endpoint should only be called in development, and with proper authorization in production
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({
      success: false,
      message: 'This endpoint is disabled in production'
    });
  }

  try {
    // Sync all models to the database
    await sequelize.sync({ force: true }); // force:true drops tables before recreating

    return res.status(200).json({
      success: true,
      message: 'Database tables created successfully',
      details: {
        tables: [
          'registration_table',
          'login_table',
          'user_table',
          'product_catalog'
        ]
      }
    });
  } catch (error: any) {
    console.error('Database setup error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error setting up database tables',
      details: error.message
    });
  }
} 