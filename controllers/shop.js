const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {

  Product.findAll()
  .then((products)=>{
  res.render('shop/product-list', {
    prods: products,
    pageTitle: 'All Products',
    path: '/products'
  });
  })
  .catch(err => console.log(err))

};

exports.getProduct = (req,res,next)=>{
  const productID = req.params.productID
  // console.log(productID)uc

  Product.findByPk(productID).then((Product)=>{
    res.render('shop/product-detail', {
          product : Product,
          pageTitle : Product.title,
          path: '/products'
        })
  }).catch(err => console.log(err))

}


exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then((products)=>{
  res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/'
  });
  })
  .catch(err => console.log(err))

};

exports.postcartdeleteproduct = (req,res,next) => {
  const prodID = req.body.productid

  req.user.getCart()
  .then(cart => {
    return cart.getProducts({where :{id:prodID}})
  })
  .then(products =>{
    const product = products[0]
    return product.cartItem.destroy()
  })
  .then(result =>{
    res.redirect('/cart')
  })
  .catch(err => console.log(err))
}

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          console.log("here are the products")
          console.log(products)

          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postCart = (req,res,next)=>{

  const prodId = req.body.productID
  let fetchcart;
  let newqty = 1;
  req.user.getCart()
  .then(cart =>{
    fetchcart = cart
    return cart.getProducts({where : {id:prodId}})
  }) 
  .then(products =>{
    let product;
    if(products.length > 0){
      product = products[0]
    }
    

    if(product){
      const oldqty = product.cartItem.quantity;
      newqty = oldqty+1;
      return product;
    }
    return Product.findByPk(prodId)
  })
  .then(product =>{
    return fetchcart.addProduct(product, {through: {quantity:newqty}});
  })
  .then(()=> res.redirect('/cart'))
  .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.postOrder = (req,res,next) => {
  req.user.getCart()
  .then(cart => {
    return cart.getProducts()
  })
  .then(products => {
    console.log("**************&&&&&&&&&&&&&&&***************")
    console.log(products)
  })
  .catch(err => console.log(err))
};