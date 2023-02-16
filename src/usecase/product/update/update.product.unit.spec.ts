import Product from "../../../domain/product/entity/Product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("1", "Product 1", 10);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
};

const input = {
    id: product.id,
    name: "Product 1 Updated",
    price: 20
};

describe("Update Product Usecase", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository();

        const useCase = new UpdateProductUseCase(productRepository);

        const output = await useCase.execute(input);

        expect(output).toEqual(input);
    });
});