const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoconnect = require('./util/database')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/orders');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);


mongoconnect((client)=>{
    console.log(client)
    app.listen(3000)
})