require("dotenv").config({ path: "./config/.env" });
const mongoose = require("mongoose") ;
const express = require('express') ;
const User = require("./models/User");
const app= express() ;
/* Connecting in the database*/
mongoose
    .connect(process.env.MONGO_URL,
        {
            useNewUrlParser:true,
            useUnifiedTopology: true
        })
    .then(() => console.log("connected to DB"))
    .catch((err) => console.log(err)) ;
  

/*connecting to the server */
app.listen(process.env.PORT, () => {
    let port = process.env.PORT;
    console.log("Server listening on port:", port);
  });

  /* with get we will return all users */
  app.get("/allUser" , (req,res) =>{
    User.find()
        .then((user)=> res.send(user) )
        .catch((err)=> console.log(err))
  });

  /* Adding a new user */
  app.post("/addUser" , (req,res) =>{
      const {lastname , firstname , age , email} = req.body ;
      const newUser = new User ({
          lastname,firstname,age,email
      })
      newUser.save()
      .then((usernew) => res.send(usernew))
      .catch((err)=> console.log(err))
  });

  /* Editing a user */

  app.put("/editUser", (req,res)=>{
      User.findByIdAndUpdate({_id : req.params.id},
        { $set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            picture: req.body.picture,
          }})
  .then((result)=> res.send(result))
  .catch((err)=> console.log(err))
});
  /*Deletting a user */
app.findByIdAndRemove("/removeUser", (req,res) =>{
    User.remove({_id : req.params.id})
    .then((item)=> res.send(item))
    .catch((err)=> console.log(err))
});