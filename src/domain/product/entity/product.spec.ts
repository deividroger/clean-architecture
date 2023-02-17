import Product from "./Product";

describe('Product unit tests', ()=> {
    
    it("Should throw error when Id is empty", ()=>{
        
        expect(()=>{
            const product = new Product("","Product 1", 100);
        }).toThrowError("product: Id is required")

    });

    it("Should throw error when Name is empty", ()=>{
        
        expect(()=>{
            const product = new Product("12","", 100);
        }).toThrowError("product: Name is required")

    });

    it("Should throw error when Price is less than zero", ()=>{
        
        expect(()=>{
            const product = new Product("12","Product 1", -1);
        }).toThrowError("product: Price must be greater than zero")

    });

    it("should throw error when Name and Id and are empty and price is invalid", ()=>{
        expect(()=>{
            const product = new Product("","", -1);
        }).toThrowError("product: Id is required,product: Name is required,product: Price must be greater than zero")
    });


    it('Should change name',()=>{
        const product = new Product("12","Product 1", 100);

        product.changeName( "Product 2");

        expect(product.name).toBe('Product 2');

    });

    it('Should change Price',()=>{
        const product = new Product("12","Product 1", 100);

        product.changePrice(150);

        expect(product.price).toBe(150);

    });
    
})