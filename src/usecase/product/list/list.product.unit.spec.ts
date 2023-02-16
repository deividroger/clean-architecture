import Product from "../../../domain/product/entity/Product";
import { ListProductUsecase } from "./list.product.usecase";


const product1 = new Product("1", "Product 1", 10);
const product2 = new Product("2", "Product 1", 10);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockResolvedValue(Promise.resolve([product1, product2])),
        create: jest.fn(),
        update: jest.fn(),
    }
};

describe('Unit test list product use case', () => {

    it('should list products', async () => {
            
        const productRepository = MockRepository();

        const productFindUseCase = new ListProductUsecase(productRepository);

        const output = await productFindUseCase.execute({});
    
        expect(output.products.length).toBe(2);

        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);

        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
    
    });
});

