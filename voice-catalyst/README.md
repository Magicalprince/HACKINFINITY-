# say2sale (formerly VoiceCatalyst)

A modern web application for creating digital product catalogs using voice input.

## Features

- Create digital catalogs with voice input
- Multilingual support
- QR code generation for catalog sharing
- User registration and authentication
- Product management (add, edit, delete)

## Technology Stack

- Frontend: React with TypeScript
- Styling: Tailwind CSS
- Backend: Next.js API routes
- Database: MySQL
- Authentication: Firebase Auth + SQL database

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd voice-catalyst
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the MySQL database:
   - Create a database named `voicecatalyst_db`
   - Execute the SQL script in `src/scripts/init-database.sql`
   - Alternatively, start the development server and visit `/api/setup-db` to initialize the database tables (development only)

4. Create a `.env` file with the following environment variables:
   ```
   # Database
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=voicecatalyst_db
   DB_PORT=3306

   # Next.js
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

5. Start the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### registration_table
- `registration_id`: INT (Primary Key, Auto Increment)
- `full_name`: VARCHAR(100)
- `email`: VARCHAR(100) (Unique)
- `mobile_number`: VARCHAR(20)
- `password`: VARCHAR(255)
- `location`: VARCHAR(100) (Optional)
- `preferred_language`: VARCHAR(10) (Default: 'en')
- `user_role`: VARCHAR(50)
- `registered_at`: TIMESTAMP

### user_table
- `user_id`: INT (Primary Key, Auto Increment)
- `full_name`: VARCHAR(100)
- `email`: VARCHAR(100) (Unique)
- `mobile_number`: VARCHAR(20)
- `password`: VARCHAR(255)
- `location`: VARCHAR(100) (Optional)
- `preferred_language`: VARCHAR(10) (Default: 'en')
- `user_role`: VARCHAR(50)
- `created_at`: TIMESTAMP

### login_table
- `login_id`: INT (Primary Key, Auto Increment)
- `email`: VARCHAR(100)
- `password`: VARCHAR(255)
- `user_id`: INT (Foreign Key to user_table.user_id)

### product_catalog
- `product_id`: INT (Primary Key, Auto Increment)
- `user_id`: INT (Foreign Key to user_table.user_id)
- `product_name`: VARCHAR(100)
- `quantity`: VARCHAR(50)
- `price`: DECIMAL(10, 2)
- `description_en`: TEXT
- `description_local`: TEXT
- `language_used`: VARCHAR(10) (Default: 'en')
- `added_on`: TIMESTAMP

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login an existing user

### User
- `GET /api/user/:id` - Get user profile
- `PUT /api/user/:id` - Update user profile

### Products
- `GET /api/products?userId=:userId` - Get all products for a user
- `POST /api/products` - Create a new product
- `GET /api/products/:id` - Get a single product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

## License

This project is licensed under the MIT License.
