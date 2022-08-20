const express = require("express");

//create a server object:

const app = express();
app.use((req, res, next) => {
  console.log("in middle");
  next();
  console.log("ware");
});

app.get("/", (req, res,next) => {
  console.log("wait for it");
  next()
  console.log("after next")
});

app.get("/temp", (req, res) => {
  console.log("ddd");
});

app.use((req,res,next)=>{
    console.log("end")
})

app.listen(8000);
