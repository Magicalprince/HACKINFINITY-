import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../../models';

type Data = {
  success: boolean;
  message?: string;
  products?: any[];
  product?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    case 'POST':
      return createProduct(req, res);
    default:
      return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

// GET /api/products - Get all products for a user
async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    // Find all products for this user
    const products = await Product.findAll({
      where: { user_id: userId },
      order: [['added_on', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      products
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching products'
    });
  }
}

// POST /api/products - Create a new product
async function createProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const {
      user_id,
      product_name,
      quantity,
      price,
      description_en,
      description_local,
      language_used
    } = req.body;

    // Validate input
    if (!user_id || !product_name || !quantity || !price) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Create new product
    const product = await Product.create({
      user_id,
      product_name,
      quantity,
      price,
      description_en: description_en || '',
      description_local: description_local || '',
      language_used: language_used || 'en'
    });

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });

  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating product'
    });
  }
} 