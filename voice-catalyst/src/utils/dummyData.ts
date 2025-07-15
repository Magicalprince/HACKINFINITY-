import { User, Product, Language } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', displayName: 'English' },
  { code: 'hi', name: 'Hindi', displayName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', displayName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', displayName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', displayName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', displayName: 'മലയാളം' },
];

export const DUMMY_USERS: User[] = [
  {
    id: '1',
    name: 'Raj Kumar',
    mobileNumber: '9876543210',
    location: 'Chennai',
    preferredLanguage: 'ta',
    role: 'Farmer',
  },
  {
    id: '2',
    name: 'Meena Kumari',
    mobileNumber: '8765432109',
    location: 'Delhi',
    preferredLanguage: 'hi',
    role: 'Artisan',
  },
  {
    id: '3',
    name: 'Venkat Rao',
    mobileNumber: '7654321098',
    location: 'Bangalore',
    preferredLanguage: 'kn',
    role: 'Kirana Shop Owner',
  },
];

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: uuidv4(),
    userId: '1',
    name: 'Organic Rice',
    quantity: '25 kg',
    price: 1200,
    descriptionEnglish: 'Fresh organic rice grown without pesticides',
    descriptionLocal: 'பூச்சிக்கொல்லிகள் இல்லாமல் வளர்க்கப்பட்ட புதிய கரிம அரிசி',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    userId: '1',
    name: 'Fresh Tomatoes',
    quantity: '5 kg',
    price: 150,
    descriptionEnglish: 'Farm fresh tomatoes',
    descriptionLocal: 'பண்ணையில் இருந்து புதிய தக்காளிகள்',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    userId: '2',
    name: 'Handmade Pottery',
    quantity: '10 pieces',
    price: 2500,
    descriptionEnglish: 'Beautiful handcrafted pottery made with traditional techniques',
    descriptionLocal: 'पारंपरिक तकनीकों से बनाई गई सुंदर हस्तशिल्प मिट्टी के बर्तन',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    userId: '3',
    name: 'Toor Dal',
    quantity: '2 kg',
    price: 220,
    descriptionEnglish: 'Premium quality toor dal',
    descriptionLocal: 'ಅತ್ಯುತ್ತಮ ಗುಣಮಟ್ಟದ ತೊಗರಿ ಬೇಳೆ',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return DUMMY_USERS.find(user => user.id === id);
};

// Function to get products by user ID
export const getProductsByUserId = (userId: string): Product[] => {
  return DUMMY_PRODUCTS.filter(product => product.userId === userId);
};

// Function to generate a dummy QR code URL
export const generateCatalogShareUrl = (userId: string): string => {
  return `${window.location.origin}/catalog/${userId}`;
}; 