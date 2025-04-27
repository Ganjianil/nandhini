const multer=require("multer")

const storage= multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"upload/")
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+"-"+file.originalname)
  }
})
const multerUpload=multer({storage:storage})
module.exports = multerUpload;