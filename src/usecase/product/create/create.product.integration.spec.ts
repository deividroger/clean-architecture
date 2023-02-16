import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductCustomerUseCase from "./create.product.usecase";

const input = {
    name: "Product 1",
    price: 10
}

describe("Unit test create product use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {

        const productRepository = new ProductRepository();

        const productCreateUseCase = new ProductCustomerUseCase(productRepository);

        const output  = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });

    });

    it("should throw an error when name is missing",async ()=>{
        const productRepository = new ProductRepository();
        const productCreateUseCase = new ProductCustomerUseCase(productRepository);
        input.name = "";

       await expect( productCreateUseCase.execute(input)).rejects.toThrow("Name is required");

    });

    it("should throw an error when price is missing",async ()=>{
        const productRepository = new ProductRepository();
        const productCreateUseCase = new ProductCustomerUseCase(productRepository);
        input.name = "Product 1";
        input.price = 0;

       await expect( productCreateUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");

    });
    
});