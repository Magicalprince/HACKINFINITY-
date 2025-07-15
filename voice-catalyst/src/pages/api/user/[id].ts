import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../../models';

type Data = {
  success: boolean;
  message?: string;
  user?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Get the user ID from the URL
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid user ID'
    });
  }

  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      return getUser(id, res);
    case 'PUT':
      return updateUser(id, req, res);
    default:
      return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

// GET /api/user/[id] - Get user profile
async function getUser(id: string, res: NextApiResponse<Data>) {
  try {
    // Find the user
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] } // Don't return password
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching user'
    });
  }
}

// PUT /api/user/[id] - Update user profile
async function updateUser(id: string, req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    // Find the user
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get updated data
    const {
      full_name,
      mobile_number,
      location,
      preferred_language
    } = req.body;

    // Update user (only allow certain fields to be updated)
    await user.update({
      full_name: full_name || user.full_name,
      mobile_number: mobile_number || user.mobile_number,
      location: location !== undefined ? location : user.location,
      preferred_language: preferred_language || user.preferred_language,
    });

    // Return updated user without password
    const updatedUser = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating user'
    });
  }
} 