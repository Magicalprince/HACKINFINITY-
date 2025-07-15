import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaCopy, FaQrcode } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';
import Layout from '../components/Layout';
import VoiceInput from '../components/VoiceInput';
import FormInput from '../components/FormInput';
// Commented out since it's unused
// import FormSelect from '../components/FormSelect';
import ProductCard from '../components/ProductCard';
import { 
  getUserById, 
  getProductsByUserId, 
  generateCatalogShareUrl,
  LANGUAGES, 
} from '../utils/dummyData';
import { Product, User } from '../types';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [showQRModal, setShowQRModal] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [voiceLanguage, setVoiceLanguage] = useState('en');
  
  const [productForm, setProductForm] = useState({
    name: '',
    quantity: '',
    price: '',
    descriptionEnglish: '',
    descriptionLocal: '',
  });
  
  useEffect(() => {
    // Check if user ID is in location state
    const userId = location.state?.userId || localStorage.getItem('userId');
    
    if (!userId) {
      // Redirect to login if no user ID
      navigate('/login');
      return;
    }
    
    // Store user ID in local storage for persistence
    localStorage.setItem('userId', userId);
    
    // Get user and their products
    const userData = getUserById(userId);
    if (userData) {
      setUser(userData);
      setVoiceLanguage(userData.preferredLanguage);
      
      // Get user's products
      const userProducts = getProductsByUserId(userData.id);
      setProducts(userProducts);
    } else {
      // Redirect to login if user not found
      navigate('/login');
    }
    
    setIsLoading(false);
  }, [location.state, navigate]);
  
  // Handle voice input
  const handleVoiceTranscription = (text: string) => {
    console.log('Voice transcription:', text);
    
    // Simulate processing the voice input
    // In a real app, this would be processed by a backend service
    
    // For demo, we'll just simulate filling the form based on language
    let productData = {
      name: '',
      quantity: '',
      price: '',
      descriptionEnglish: '',
      descriptionLocal: '',
    };
    
    switch (voiceLanguage) {
      case 'hi':
        productData = {
          name: 'चावल',
          quantity: '25 किलो',
          price: '1200',
          descriptionEnglish: 'High quality organic rice',
          descriptionLocal: 'उच्च गुणवत्ता वाला जैविक चावल',
        };
        break;
      case 'ta':
        productData = {
          name: 'அரிசி',
          quantity: '25 கிலோ',
          price: '1200',
          descriptionEnglish: 'High quality organic rice',
          descriptionLocal: 'உயர் தரமான கரிம அரிசி',
        };
        break;
      default:
        productData = {
          name: 'Rice',
          quantity: '25 kg',
          price: '1200',
          descriptionEnglish: 'High quality organic rice',
          descriptionLocal: 'High quality organic rice',
        };
    }
    
    // Set the form data
    setProductForm(productData);
    
    // Show the product form
    setShowProductForm(true);
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Handle product form submission
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : `product-${Date.now()}`,
      userId: user?.id || '',
      name: productForm.name,
      quantity: productForm.quantity,
      price: parseFloat(productForm.price),
      descriptionEnglish: productForm.descriptionEnglish,
      descriptionLocal: productForm.descriptionLocal,
      createdAt: editingProduct ? editingProduct.createdAt : new Date(),
      updatedAt: new Date(),
    };
    
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => p.id === editingProduct.id ? newProduct : p));
    } else {
      // Add new product
      setProducts([...products, newProduct]);
    }
    
    // Reset form and editing state
    setProductForm({
      name: '',
      quantity: '',
      price: '',
      descriptionEnglish: '',
      descriptionLocal: '',
    });
    setEditingProduct(null);
    setShowProductForm(false);
  };
  
  // Handle edit product
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      quantity: product.quantity,
      price: product.price.toString(),
      descriptionEnglish: product.descriptionEnglish,
      descriptionLocal: product.descriptionLocal,
    });
    setShowProductForm(true);
  };
  
  // Handle delete product
  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };
  
  // Copy catalog link to clipboard
  const copyLinkToClipboard = () => {
    const catalogUrl = generateCatalogShareUrl(user?.id || '');
    navigator.clipboard.writeText(catalogUrl)
      .then(() => {
        alert('Catalog link copied to clipboard!');
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  };
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  const catalogUrl = generateCatalogShareUrl(user?.id || '');
  const languageOptions = LANGUAGES.map((lang) => ({
    value: lang.code,
    label: lang.displayName,
  }));
  
  return (
    <Layout showLoginButton={false} showRegisterButton={false}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gradient">
            Welcome, {user?.name || 'User'}
          </h1>
          <button 
            onClick={handleLogout}
            className="btn btn-secondary"
          >
            Logout
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Voice Input */}
          <div className="md:col-span-1">
            <div className="card mb-6 border-l-4 border-l-green-500">
              <h2 className="text-xl font-semibold mb-4">Add Product by Voice</h2>
              
              <div className="mb-4">
                <label className="form-label">Voice Language</label>
                <div className="relative">
                  <select
                    className="form-input appearance-none border-green-100"
                    value={voiceLanguage}
                    onChange={(e) => setVoiceLanguage(e.target.value)}
                  >
                    {languageOptions.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <VoiceInput 
                onTranscription={handleVoiceTranscription}
                language={voiceLanguage}
              />
              
              <div className="mt-4">
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setProductForm({
                      name: '',
                      quantity: '',
                      price: '',
                      descriptionEnglish: '',
                      descriptionLocal: '',
                    });
                    setShowProductForm(true);
                  }}
                  className="btn btn-secondary w-full"
                >
                  Add Product Manually
                </button>
              </div>
            </div>
            
            <div className="card border-l-4 border-l-green-600">
              <h2 className="text-xl font-semibold mb-4">Share Your Catalog</h2>
              <div className="flex flex-col space-y-3">
                <button
                  onClick={copyLinkToClipboard}
                  className="btn btn-secondary flex items-center justify-center"
                >
                  <div className="mr-2">
                    {FaCopy({ size: 16 })}
                  </div>
                  Copy Link
                </button>
                
                <button
                  onClick={() => setShowQRModal(true)}
                  className="btn btn-secondary flex items-center justify-center"
                >
                  <div className="mr-2">
                    {FaQrcode({ size: 16 })}
                  </div>
                  Show QR Code
                </button>
                
                <Link
                  to={`/catalog/${user?.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary flex items-center justify-center"
                >
                  View Public Catalog
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right Column - Products & Form */}
          <div className="md:col-span-2">
            {showProductForm ? (
              <div className="card mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <button
                    onClick={() => setShowProductForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                </div>
                
                <form onSubmit={handleProductSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      id="name"
                      label="Product Name"
                      value={productForm.name}
                      onChange={handleInputChange}
                      required
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormInput
                        id="quantity"
                        label="Quantity"
                        value={productForm.quantity}
                        onChange={handleInputChange}
                        required
                      />
                      
                      <FormInput
                        id="price"
                        label="Price (₹)"
                        type="number"
                        value={productForm.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label htmlFor="descriptionEnglish" className="form-label">
                      Description (English)
                    </label>
                    <textarea
                      id="descriptionEnglish"
                      name="descriptionEnglish"
                      className="form-input"
                      rows={3}
                      value={productForm.descriptionEnglish}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="mt-4">
                    <label htmlFor="descriptionLocal" className="form-label">
                      Description (Local Language)
                    </label>
                    <textarea
                      id="descriptionLocal"
                      name="descriptionLocal"
                      className="form-input"
                      rows={3}
                      value={productForm.descriptionLocal}
                      onChange={handleInputChange}
                      required
                      dir={voiceLanguage === 'ar' ? 'rtl' : 'ltr'}
                    />
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="btn btn-primary w-full"
                    >
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gradient">Your Products</h2>
                  <span className="text-gray-600">
                    {products.length} {products.length === 1 ? 'product' : 'products'}
                  </span>
                </div>
                
                {products.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        showActions
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="card text-center py-10">
                    <p className="text-gray-600 mb-4">
                      You haven't added any products yet.
                    </p>
                    <button
                      onClick={() => setShowProductForm(true)}
                      className="btn btn-primary"
                    >
                      Add Your First Product
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Catalog QR Code</h3>
              <p className="text-gray-600 mb-6">
                Scan this QR code to view your catalog
              </p>
              <div className="flex justify-center mb-6">
                <QRCodeSVG
                  value={catalogUrl}
                  size={220}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  level="H"
                  includeMargin={true}
                />
              </div>
              <button
                onClick={() => setShowQRModal(false)}
                className="btn btn-primary w-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard; 