import ProductManager from "./classes/ProductManager.js";
import express from "express";

const pm = new ProductManager();
const PORT = 8080;
const myApp = express();

myApp.use(express.urlencoded({extended:true}));


myApp.get('/products', async (req,res) => {
    const { limit } = req.query;
    if (!limit) {
        res.json( await pm.getProducts())
    }else{
        let newProducts = await pm.getProducts();
        res.json(newProducts.slice(0,limit));
    }
});

myApp.get('/products/:pid', async (req,res) => {
    const { pid } = req.params;
    res.json( await pm.getProductById(parseInt(pid)))
});

myApp.listen(PORT, () => {
    console.log("Mi port:" + PORT)
  }) 