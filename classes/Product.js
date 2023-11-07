class Product{
    constructor(id,title,description,price,status,thumbnail,code,stock){
        this.id = id
        this.title = title
        this.description = description
        this.price = price
        this.status = status || true
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}

export default Product;