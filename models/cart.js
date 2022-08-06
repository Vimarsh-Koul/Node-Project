const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);


module.exports = class Cart { 
    static addProduct(id,price){
        fs.readFile(p, (err,filecontent)=>{
            let cart = {products:[], totalPrice:0}
            if(!err){
                cart = JSON.parse(filecontent)
            }

            const existingproductindex = cart.products.findIndex(prod => prod.id === id)

        const existingproduct = cart.products[existingproductindex]
        let updatedproduct

        if(existingproduct){
            updatedproduct = {... existingproduct}
            updatedproduct.qty = updatedproduct.qty + 1
            // cart.products = [...cart.products]
            cart.products[existingproductindex] = updatedproduct
        }
        else{
            updatedproduct = {id:id, qty:1}
            cart.products.push(updatedproduct)
        }

        cart.totalPrice = Number(cart.totalPrice) + Number(price)
        fs.writeFile(p,JSON.stringify(cart), err=>{
            console.log(err)
        })

        })
    
    }

    static deleteProduct(id,productPrice){
        fs.readFile(p, (err,filecontent)=>{
            if(err)
                return

            let cart = JSON.parse(filecontent)
            const updatedcart = {... cart }
            const product = updatedcart.products.find(prod => prod.id === id)
            
            if(!product)
                return

            const prodqty = product.qty;
            updatedcart.products = updatedcart.products.filter(prod=> prod.id !== id)
            if(!updatedcart.products || updatedcart.products == undefined)
                updatedcart.products = []
            updatedcart.totalPrice = Number(cart.totalPrice) - Number(productPrice*prodqty);

            fs.writeFile(p,JSON.stringify(updatedcart), err=>{
                console.log(err)
            })
        })
    }

    static getCart(cb){
        fs.readFile(p, (err,filecontent)=>{
            if(err)
                cb(null)
            else{
                const cart = JSON.parse(filecontent)
                cb(cart)
            }
        })
    }
}