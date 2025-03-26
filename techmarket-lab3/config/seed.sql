-- Wstawianie kategorii
INSERT INTO categories (name, description) VALUES
('Elektronika', 'Sprzęt elektroniczny i akcesoria'),
('Moda', 'Odzież, obuwie i akcesoria');

-- Wstawianie użytkowników
INSERT INTO users (username, email, password_hash, first_name, last_name) VALUES
('user1', 'user1@example.com', 'hashedpassword1', 'Jan', 'Kowalski'),
('user2', 'user2@example.com', 'hashedpassword2', 'Anna', 'Nowak');

-- Wstawianie produktów
INSERT INTO products (name, category_id, description, price, stock_count, brand, image_url, is_available) VALUES
('Smartphone XYZ', 1, 'Nowoczesny smartfon z dużym ekranem', 1999.99, 10, 'XYZ Electronics', 'https://example.com/smartphone.jpg', true),
('Sneakers ABC', 2, 'Wygodne buty sportowe', 299.99, 50, 'ABC Shoes', 'https://example.com/sneakers.jpg', true);

-- Wstawianie recenzji
INSERT INTO reviews (product_id, user_id, rating, comment) VALUES
(1, 1, '5', 'Świetny telefon, polecam!'),
(2, 2, '4', 'Bardzo wygodne buty.');
