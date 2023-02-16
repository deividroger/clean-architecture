import Product from "../../../domain/product/entity/Product";
import { FindProductUseCase } from "./find.product.usecase";

const product = new Product("1", "Product 1", 10);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
};

const input = {
    id: "1"
}

describe("Unit test find product use case", () => {

    it("should find a product", async () => {

        const productRepository = MockRepository();

        const productFindUseCase = new FindProductUseCase(productRepository);

        const output = await productFindUseCase.execute(input);

        expect(output).toEqual({
            id: input.id,
            name: "Product 1",
            price: 10
        });

    });

    it("should not find a product", async () => {

        const productRepository = MockRepository();

        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });

        const productFindUseCase = new FindProductUseCase(productRepository);

        await expect(productFindUseCase.execute(input)).rejects.toThrow("Product not found");
    });


});