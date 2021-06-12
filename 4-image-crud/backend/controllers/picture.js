

const Product = require('../models/picture');

 exports.createProduct = (req, res, next) =>{
     const {title, price} = req.body;

     const product = new Product({
         title: title,
         price: price,
         image: req.file,path
     })

     console.log('img: ', req.file.path);

     product.save().then(result=>{
         res.status(200).json({message: "data added.."})
     }).catch(err=>console.log(err));
     
 }