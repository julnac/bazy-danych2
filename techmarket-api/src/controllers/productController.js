import products from "../data/products.js"

export const getAllProducts = (req, res) => {
    res.json(products);
};

export const getProductById = (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

export const createProduct = (req, res) => {
    const newProduct = req.body;
    // Generowanie nowego unikalnegProduct.id = students.length ? students[students.length - 1].id + 1 : 1;
    products.push(newProduct);
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
};

/**
 * PUT /products/:id
 * Aktualizuje dane o danym ID
 */
export const updateProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;

    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
        // Upewnienie się, że ID pozostaje niezmienione
        updatedProduct.id = productId;
        products[index] = updatedProduct;
        res.json({ message: 'Product updated successfully', student: updatedProduct });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

/**
 * PATCH /products/:id
 * Częściowo aktualizuje dane o danym ID
 */
export const partialUpdateProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    const updates = req.body;

    const product = products.find(s => s.id === productId);
    if (product) {
        Object.assign(product, updates);
        res.json({ message: 'Product updated successfully', product });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

export const deleteProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex(s => s.id === productId);

    if (index !== -1) {
        products.splice(index, 1);
        res.json({ message: 'Product deleted successfully' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};