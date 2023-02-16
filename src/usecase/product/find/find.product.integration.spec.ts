import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/Product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { FindProductUseCase } from "./find.product.usecase";


describe("Unit test find product use case", () => {

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


    it("should find a product", async () => {

        const productRepository = new ProductRepository();

        const productFindUseCase = new FindProductUseCase(productRepository);
        
        const product = new Product("1", "Product 1", 10);
        productRepository.create(product);        

        const input = {
            id: product.id
        }

        const output = await productFindUseCase.execute(input);

        expect(output).toEqual({
            id: input.id,
            name: "Product 1",
            price: 10
        });

    });

    it("should not find a product", async () => {

        const productRepository = new ProductRepository();

        const productFindUseCase = new FindProductUseCase(productRepository);

        const input = {
            id: "134"
        }

        await expect(productFindUseCase.execute(input)).rejects.toThrow("Product not found");
    });
});