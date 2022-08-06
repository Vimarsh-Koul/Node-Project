const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  console.log("here")
  console.log(req.user)
  console.log(req.user.id, req.user.name)

  req.user.createProduct({
    title:title,
    imageUrl:imageUrl,
    price:price,
    description:description
  })
  .then(result => {
    console.log(result)
    res.redirect('/admin/products')
  })
  .catch(err => console.log(err))
};


exports.getEditProduct = (req, res, next) => {

  const editmode = req.query.edit

  if(!editmode)
    return res.redirect('/')

  const prodID = req.params.productID

  console.log(prodID)
  req.user.getProducts({where : {id: prodID}})
  .then((products)=>{
    const product = products[0]
    if(!product){
      res.redirect('/')
    }
      

    console.log("ww")

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing : editmode,
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
      product : product
    });
  })
  .catch(err => console.log(err))
};

exports.postEditProduct = (req,res,next) =>{
  const prodID = req.body.productID;
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const desc = req.body.description;

  Product.findByPk(prodID).then((product)=>{
    product.title = title
    product.price = price
    product.imageUrl = imageUrl
    product.description = desc
    return product.save()
  })
  .then(result => {
    console.log("Updated Porduct!")
    res.redirect('/admin/products')
  })
  .catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {

  req.user.getProducts()
  .then((products)=>{
    res.render('admin/products', {
          prods: products,
          pageTitle: 'Admin Products',
          path: '/admin/products'
    });
  })
  .catch(err => console.log(err))
};

exports.postDeleteProduct = (req,res,next)=>{
  const prodID = req.body.productID
  // Product.deleteById(prodID)
  Product.findByPk(prodID)
  .then((result)=>{
    return result.destroy()
  })
  .then(res.redirect('/admin/products'))
  .catch(err => console.log(err))
  // res.redirect('/admin/products')
}
