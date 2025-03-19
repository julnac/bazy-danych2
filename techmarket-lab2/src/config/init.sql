CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stockCount INT NOT NULL,
    brand VARCHAR(100) NOT NULL,
    imageUrl VARCHAR(500) NOT NULL,
    isAvailable BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, category, description, price, stockCount, brand, imageUrl, isAvailable) VALUES 
('MacBook Pro 16', 'Laptopy', 'Laptop Apple z procesorem M1 Pro, 16GB RAM, 512GB SSD', 9999.99, 15, 'Apple', 'https://example.com/macbook.jpg', true),
('Dell XPS 15', 'Laptopy', 'Laptop Dell z procesorem Intel i7, 16GB RAM, 1TB SSD', 8499.99, 10, 'Dell', 'https://example.com/dellxps.jpg', true)
ON CONFLICT (product_id) DO NOTHING;