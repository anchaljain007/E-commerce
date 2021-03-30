const router = require("express").Router();
const Product = require('../models/product');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
var upload = multer({dest : 'routes/upload/'})

router.post('/',  upload.single('product1'), async(req,res)=> {
    // fs.rename(req.file.path , './routes/upload/product1.jpg',(err)=>console.log(err));
    console.log(req.file);
    const product = new Product({
        name : req.body.name,
        price : req.body.price,
        image : {
            data : fs.readFileSync(path.join(__dirname+ '/upload/' + req.file.filename)),
            contentType : 'image/jpg'
        }
    });

    try{
        const savedProduct = await product.save()
        console.log(savedProduct);

    }
    catch(err){
        res.send(400).send(err);
    }
});


module.exports = router;
