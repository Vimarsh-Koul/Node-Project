const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productID', shopController.getProduct)

router.get('/cart', shopController.getCart);

router.post('/cart-delete-item', shopController.postcartdeleteproduct)

router.post('/cart', shopController.postCart)

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

router.get('/create-order', shopController.postOrder)

module.exports = router;
