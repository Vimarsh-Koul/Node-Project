// const express = require("express");


// //create a server object:

// const app = express();
// app.use((req, res, next) => {
//   console.log("in middle");
//   next();
//   console.log("ware");
// });

// app.get("/", (req, res,next) => {
//   console.log("wait for it");
//   next()
//   console.log("after next")
// });

// app.get("/temp", (req, res) => {
//   console.log("ddd");
// });

// app.use((req,res,next)=>{
//     console.log("end")
// })

// app.listen(8000);



function func(a,b,c){
  return new Promise((resolve,reject)=>{

    setTimeout(()=>{
      if(a+b==c)
        resolve(`success! ${a} + ${b} is ${c}`)
      else
        reject(`Failure! ${a} + ${b} is not ${c}`)
    },3000)
  })
}

// let ele = func(1,1,2)
// ele.then((message)=>{
//   console.log(message)
//   let temp = func(1,5,7)
//   temp.then((message)=>{
//     console.log(message)
//   })
//   .catch((message)=>{
//     console.log(message)
//   })
// })

// .catch((message)=>{
//   console.log(message)
// })

async function fun(){
  // console.log("ffee")
  // let ele = await func(1,2,4)
  // console.log("ff")
  // console.log(ele)
  // console.log("hee")

  try{
    let ele = await func(1,2,4)
  }
  catch(err){
    console.log("ff")
    console.log(err)
    console.log("gg")
  }
}

fun()