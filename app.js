const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongodb = require('mongodb')
const mongoconnect = require('./util/database').mongoconnect

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/users')
// const CartItem = require('./models/cart-item');
// const Order = require('./models/orders');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    User.findById('630b50f903e9ddc16aa48222')
    .next()
    .then(user =>{
        req.user = new User(user.name,user.email,user.cart,user._id)
        next()
    })
    .catch(err => console.log(err))
    // next()
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoconnect(()=>{
    app.listen(3000)
})