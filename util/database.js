const mongodb = require('mongodb')
const MongoClient  = mongodb.MongoClient

let _db 
const mongoconnect = (callback)=>{
    const url = 'mongodb+srv://test:password%40123@cluster0.bahjy4z.mongodb.net/?retryWrites=true&w=majority'
    console.log(url)
    // const client = mongodb.MongoClient(url)
    console.log(url)

    MongoClient.connect(url)
    .then(result => {
        console.log("Connected!")
        _db = result.db()
        callback()
    })
    .catch(err => {
        console.log(err)
    })
}

const getdb = ()=>{
    if(_db)
        return _db

    throw "No Database Found"
}

exports.mongoconnect = mongoconnect
exports.getdb = getdb
