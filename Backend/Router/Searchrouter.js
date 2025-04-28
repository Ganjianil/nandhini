const controller=require("../Controller/SearchController")
const express=require("express")
const router=express.Router()
const multerUpload=require("../multer")
router.post("/signup",controller.signup)
router.post("/upload",multerUpload.single("image"),controller.upload,(req, res) => {
    console.log("File received:", req.file); 
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    
    res.status(201).json({ message: "File uploaded successfully", filePath: `/upload/${req.file.filename}` });
    console.log(filePath)
  })
router.get("/getuploads", controller.getuploads,
  
);
router.delete("/delete/:id",controller.deleteupload)
router.delete("/deletes",controller.deleteAllUploads)

router.put("/update/:id", controller.updateUpload);
router.post("/login",controller.login)
module.exports=router
