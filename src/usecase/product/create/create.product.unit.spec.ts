import ProductCreateUseCase from "./create.product.usecase";

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

const input = {
    name: "Product 1",
    price: 10
}

describe("Unit test create product use case", () => {

    it("should create a product", async () => {

        const productRepository = MockRepository();

        const productCreateUseCase = new ProductCreateUseCase(productRepository);

        const output  = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });

    });

    it("should throw an error when name is missing",async ()=>{
        const productRepository = MockRepository();
        const productCreateUseCase = new ProductCreateUseCase(productRepository);
        input.name = "";

       await expect( productCreateUseCase.execute(input)).rejects.toThrow("Name is required");

    });

    it("should throw an error when price is missing",async ()=>{
        const productRepository = MockRepository();
        const productCreateUseCase = new ProductCreateUseCase(productRepository);
        input.name = "Product 1";
        input.price = 0;

       await expect( productCreateUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");

    });
    
});