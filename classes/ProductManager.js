import Product from "./Product.js";
import fs from "fs"

const PATH = "./Products.json"

class ProductManager{
    constructor(){
        this.path = PATH
        this.products = []

        if(!fs.existsSync(this.path.toString())){
            fs.writeFileSync(this.path.toString(),JSON.stringify(this.products))
        }
    }

    getProducts(){

        if (this.checkFileExists(this.path)) {

            const productsJSON = fs.readFileSync(this.path.toString(),'utf-8');
    
            return JSON.parse(productsJSON);
          }

        
    }
    
    getProductById(id) {
        this.products = JSON.parse(fs.readFileSync(this.path.toString(),'utf-8'));

        const productSearched = this.products.find((product) => product.id === id);
    
        return productSearched || "Not found";
    
      }

      

    addProduct(product){


        if (!this.isValidProduct(product)) {

            throw new Error("All fields are required.");
      
          }

        this.products = JSON.parse(fs.readFileSync(this.path.toString(),'utf-8'));
        const existingProduct = this.products.find((existingProduct) => existingProduct.code === product.code);


        if (existingProduct) {
            return {message: "Code is repeated"};
        }

        const newID = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1;
        let newProduct = new Product(newID, product.title, product.description, product.price, product.thumbnail, product.code, product.stock)
        this.products.push(newProduct)
        fs.writeFileSync(this.path.toString(), JSON.stringify(this.products));
        

        return newProduct      
    }

    updateProduct(product){
        this.products = JSON.parse(fs.readFileSync(this.path.toString(),'utf-8'));
        let updatedProducts = this.getProductById(product.id)
        if (JSON.stringify(updatedProducts) === "{}") {
            return `Product with id: ${product.id} . Not found`
        }else{
            let updatedProducts = this.products.map(
                    (oneProduct) => {
                        if (oneProduct.id == product.id){
                            oneProduct = {...product}
                        }
                        return oneProduct
                    }
                )
        
                fs.writeFileSync(this.path.toString(), JSON.stringify(updatedProducts));
                return `Product with id: ${product.id} . Has been updated`
        }

    }

    deleteProduct(id){
        this.products = JSON.parse(fs.readFileSync(this.path.toString(),'utf-8'));
        let updatedProducts = this.products.filter(oneProduct => oneProduct.id != id)
        
        if (JSON.stringify(updatedProducts) === "{}") {
            return `Product with id: ${id} . Not found`
        }else{
            fs.writeFileSync(this.path.toString(), JSON.stringify(updatedProducts));
            return `Product with id: ${id} .  Has been deleted`
        }

    }

    isValidProduct(product) {

        const requiredFields = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
    
        return requiredFields.every((field) => product[field]);
    
      }

    // Check if file exists
    async checkFileExists(filePath) {

        try {
    
          await fs.access(filePath);
    
          return true;
    
        } catch (error) {
    
          return false;
    
        }
    
      }


}

export default ProductManager