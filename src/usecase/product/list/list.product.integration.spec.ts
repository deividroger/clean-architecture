import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/Product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { ListProductUsecase } from "./list.product.usecase";

describe('Unit test list product use case', () => {

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

    it('should list products', async () => {
            
        const productRepository = new ProductRepository();
        
        const product1 = new Product("1", "Product 1", 10);
        const product2 = new Product("2", "Product 1", 10);

        productRepository.create(product1);
        productRepository.create(product2);

        const productFindUseCase = new ListProductUsecase(productRepository);
        
        const output = await productFindUseCase.execute({});
    
        expect(output.products.length).toBe(2);

        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);

        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
    
    });
});
