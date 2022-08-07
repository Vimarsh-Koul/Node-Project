const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/users')
const cart = require('./models/cart')
const cartitem = require('./models/cart-item')


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const CartItem = require('./models/cart-item');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user=>{
        console.log('user found')
        req.user = user
        next()
        console.log("user accessed")
    })
    .catch(err => console.log("err"))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


Product.belongsTo(User, {constraints : true, onDelete : 'CASCADE'})
User.hasMany(Product)

User.hasOne(cart)
cart.belongsTo(User)
cart.belongsToMany(Product, {through:cartitem})
Product.belongsToMany(cart, {through:cartitem})

// {force:true}
sequelize.sync()
.then((result)=>{
    console.log(result)
    return User.findByPk(1)
})
.then((user)=>{
    if(!user)
        return User.create({name:'test_user', email: 'test@company.com'})
    
    return user
})
.then((user)=>{
    // app.listen(3000)
    cart.findAll({where :{id:user.id}})
    .then(cart => {
        if(cart.length==0)
        return user.createCart()
    })
    .catch(err=> console.log(err))
    
})
.then((cart)=>{
    console.log("no error")
    app.listen(3000)
})
.catch(err => console.log(err))

// app.listen(3000);
