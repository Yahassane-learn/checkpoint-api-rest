const mongoose = require('mongoose') ;
const { isEmail } = require("validator") ;

const UserSchema = mongoose.Schema(
    {
        lastname: {
          type: String,
          required: true,
        },
        firstname: {
            type: String,
            required: true,
          },
        email: {
          type: String,
          trim: true,
          lowercase: true,
          validate: [isEmail],
        },
        age :{
            type : Number,
            required : true
        }
    }
);
    
    module.exports = mongoose.model("User", userSchema);
    