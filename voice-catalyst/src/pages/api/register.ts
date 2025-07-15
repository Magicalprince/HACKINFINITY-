import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { Registration, User, Login } from '../../models';
import sequelize from '../../config/db';

type Data = {
  success: boolean;
  message: string;
  user?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Test database connection first
    await sequelize.authenticate();

    const { 
      full_name, 
      email, 
      mobile_number, 
      password, 
      location, 
      preferred_language, 
      user_role 
    } = req.body;

    // Validate input
    if (!full_name || !email || !mobile_number || !password || !user_role) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Use a transaction to ensure all operations succeed or fail together
    const result = await sequelize.transaction(async (t) => {
      // Create registration record
      const registration = await Registration.create({
        full_name,
        email,
        mobile_number,
        password: hashedPassword,
        location: location || null,
        preferred_language: preferred_language || 'en',
        user_role
      }, { transaction: t });

      // Create user record
      const user = await User.create({
        full_name,
        email,
        mobile_number,
        password: hashedPassword,
        location: location || null,
        preferred_language: preferred_language || 'en',
        user_role
      }, { transaction: t });

      // Create login record
      const login = await Login.create({
        email,
        password: hashedPassword,
        user_id: user.user_id
      }, { transaction: t });

      return { user, registration };
    });

    // Return success
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: result.user.user_id,
        name: result.user.full_name,
        email: result.user.email
      }
    });

  } catch (error: any) {
    console.error('Registration error:', error);

    // Check if error is a unique constraint violation
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error registering user'
    });
  }
} 