const getdb = require('../util/database').getdb
const mongodb = require('mongodb')
class User{
    constructor(username,email,cart,id){
        this.name = username
        this.email = email
        this.cart = cart
        this._id = id
    }

    save(){
        const db = getdb()
        return db.collection('users').insertOne(this)
    }

    static findById(userId){
        const db = getdb()
        return db.collection('users').find({_id:new mongodb.ObjectId(userId)})
    }

    addToCart(product){
        const updatedcart = {
            items : [{productId : new mongodb.ObjectId(product._id),quantity:1}]
        }

        const db = getdb()
        return db.collection('users').updateOne({_id : new mongodb.ObjectId(this._id)},
        {$set : {cart:updatedcart}}
        )
    }
}

module.exports = User