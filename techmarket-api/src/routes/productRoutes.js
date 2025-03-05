import express from 'express';
const router = express.Router();
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    partialUpdateProduct,
    deleteProduct
} from "../controllers/productController.js"


router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.patch('/:id', partialUpdateProduct);
router.delete('/:id', deleteProduct);

export default router;





