const getdb = require('../util/database').getdb
const mongodb = require('mongodb')

class Product {
  constructor(title,price,description,imageUrl,userId,id){
    this.title = title
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
    this.userId = userId
    this._id = id
  }

  save(){
    const db = getdb()
    let dbop

    if(this._id){
      dbop = db.collection('products')
      .updateOne({_id : mongodb.ObjectId(this._id)},{$set:this})
    }
    else{
      dbop = db.collection('products').insertOne(this)
    }

    return dbop
    .then(result =>{
      console.log(result)
    })
    .catch(err => {
      console.log(err)
    })
  }

  static fetchAll(){
    const db = getdb()
    return db.collection('products')
    .find()
    .toArray()
    .then(product=>{
      console.log(product)
      return product
    })
    .catch(err =>{
      console.log(err)
    })
  }

  static findById(prodId){
    const db = getdb()
    return db.collection('products').find({_id:new mongodb.ObjectId(prodId)})
    .next()
    .then(product => {
      return product
    })
    .catch(err => console.log(err))
  }

  static deleteById(prodId){
    const db = getdb();
    return db.collection('products').deleteOne({_id : new mongodb.ObjectId(prodId)})
    .then(result =>{
      console.log("Deleted!")
    })
    .catch(err => console.log(err))
  }
}

// const Product = sequelize.define('product',{
//   id:{
//     type: Sequelize.INTEGER,
//     autoIncrement : true,
//     allowNull : false,
//     primaryKey : true
//   },

//   title:{
//     type : Sequelize.STRING
//   },

//   price:{
//     type: Sequelize.DOUBLE,
//     allowNull : false
//   },

//   imageUrl: {
//     type : Sequelize.STRING,
//     allowNull : false
//   },

//   description: {
//     type : Sequelize.STRING,
//     allowNull : false
//   }
// })

module.exports = Product