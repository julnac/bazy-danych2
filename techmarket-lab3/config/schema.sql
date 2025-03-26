 CREATE TABLE categories (
   id SERIAL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   description TEXT
 );

 CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   username VARCHAR(255) UNIQUE NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   password_hash VARCHAR(255) NOT NULL,
   first_name VARCHAR(255),
   last_name VARCHAR(255)
 );

 CREATE TABLE products (
   id SERIAL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   category_id INTEGER NOT NULL,
   description TEXT NOT NULL,
   price DECIMAL(10,2) NOT NULL,
   stock_ount INT NOT NULL,
   brand VARCHAR(100) NOT NULL,
   image_url VARCHAR(500) NOT NULL,
   is_available BOOLEAN DEFAULT true,
   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
 );

 CREATE TABLE reviews (
   id SERIAL PRIMARY KEY,
   product_id INTEGER NOT NULL,
   user_id INTEGER NOT NULL,
   rating ENUM('1', '2', '3', '4', '5') NOT NULL DEFAULT '3',
   comment TEXT,
   FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
