const mongoose=require("mongoose")
const uploaddata= new mongoose.Schema({
    category: {
        type: String,
        required: true,
      },
      price:{
        type: Number,
        required: true,
    
      },
      discription:{
        type: String,
        required: true,
    
      },
      image:{
        type:String,
        
      }
})

module.exports= mongoose.model("uploadschema.js",uploaddata)