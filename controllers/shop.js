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

  // Product.fetchAll()
  // .then(([rows,fieldData])=>{
  //   res.render('shop/product-list', {
  //     prods: rows,
  //     pageTitle: 'All Products',
  //     path: '/products'
  //   });
  // })
  // .catch(err => console.log(err))

  // Product.fetchAll(products => {
  //   res.render('shop/product-list', {
  //     prods: products,
  //     pageTitle: 'All Products',
  //     path: '/products'
  //   });
  // });
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

  // Product.findbyID(productID, (product)=>{
  //   // console.log(product)
  //   res.render('shop/product-detail', {
  //     product : product,
  //     pageTitle : product.title,
  //     path: '/products'
  //   })
  // })
  // res.redirect('/')
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

  // res.render('shop/index', {
  //   prods: rows,
  //   pageTitle: 'Shop',
  //   path: '/'
  // });

};

exports.postcartdeleteproduct = (req,res,next) => {
  const prodID = req.body.productid
  Product.findbyID(prodID, (product)=>{
    Cart.deleteProduct(prodID, product.price)
    res.redirect('/cart')
  })
}

exports.getCart = (req, res, next) => {

  Cart.getCart((cart)=>{
    Product.fetchAll(products=>{
      const cartproducts = []
      console.log(cart)
      if(cart !== null){
        for(product of products){
          const cartproductdata = cart.products.find(prod => prod.id===product.id)
          if(cartproductdata){
            cartproducts.push({productdata:product, qty:cartproductdata.qty})
          }
        }
      }

      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products : cartproducts
      });

    })
  })
};

exports.postCart = (req,res,next)=>{
  // console.log(req.body.productID)
    Product.findbyID(req.body.productID, (pro)=>{
      Cart.addProduct(pro.id,pro.price)
    })
  // Cart.addProduct(req.body.productID,req.body.price)
  res.redirect('/cart')
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
