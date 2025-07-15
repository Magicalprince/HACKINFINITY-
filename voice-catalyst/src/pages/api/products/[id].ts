import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../../models';

type Data = {
  success: boolean;
  message?: string;
  product?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Get the product ID from the URL
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid product ID'
    });
  }

  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      return getProduct(id, res);
    case 'PUT':
      return updateProduct(id, req, res);
    case 'DELETE':
      return deleteProduct(id, res);
    default:
      return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

// GET /api/products/[id] - Get a single product
async function getProduct(id: string, res: NextApiResponse<Data>) {
  try {
    // Find the product
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    return res.status(200).json({
      success: true,
      product
    });

  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching product'
    });
  }
}

// PUT /api/products/[id] - Update a product
async function updateProduct(id: string, req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    // Find the product
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Get updated data
    const {
      product_name,
      quantity,
      price,
      description_en,
      description_local,
      language_used
    } = req.body;

    // Update product
    await product.update({
      product_name: product_name || product.product_name,
      quantity: quantity || product.quantity,
      price: price || product.price,
      description_en: description_en !== undefined ? description_en : product.description_en,
      description_local: description_local !== undefined ? description_local : product.description_local,
      language_used: language_used || product.language_used
    });

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });

  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating product'
    });
  }
}

// DELETE /api/products/[id] - Delete a product
async function deleteProduct(id: string, res: NextApiResponse<Data>) {
  try {
    // Find the product
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Delete the product
    await product.destroy();

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting product'
    });
  }
} 