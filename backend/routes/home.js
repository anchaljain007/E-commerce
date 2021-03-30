const router = require("express").Router()
const Product = require('../models/product');

router.get("/", async (req, res) => {
    const product = await Product.find()  
    if(!product)
     return res.send(400).send('Product not found!!');
  
    // res.contentType(product[0].image.contentType);
    //   res.send(product[0].image.data);
    res.send(product);
    console.log(product);
   
});


module.exports = router;
