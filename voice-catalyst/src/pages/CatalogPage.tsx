import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { getUserById, getProductsByUserId } from '../utils/dummyData';
import { User, Product } from '../types';

const CatalogPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!userId) {
      setError('Catalog not found');
      setIsLoading(false);
      return;
    }
    
    // Get user and products
    const userData = getUserById(userId);
    if (userData) {
      setUser(userData);
      const userProducts = getProductsByUserId(userData.id);
      setProducts(userProducts);
    } else {
      setError('Catalog not found');
    }
    
    setIsLoading(false);
  }, [userId]);
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (error || !user) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Catalog Not Found</h1>
          <p className="text-gray-600">
            The catalog you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {user.name}'s Catalog
          </h1>
          <p className="text-gray-600">
            {user.role} · {user.location}
          </p>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600">This catalog is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showActions={false}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CatalogPage; 