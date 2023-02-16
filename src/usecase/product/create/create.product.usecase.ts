import Product from "../../../domain/product/entity/Product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";
import { v4 as uuid } from 'uuid';
export default class ProductCustomerUseCase {
    
    private _productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface ) {
        this._productRepository = productRepository;
    }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {

        const product =  new Product(uuid(), input.name, input.price);
        
        await this._productRepository.create(product);
        
        return {
            id: product.id,
            name: product.name,
            price: product.price
        }

    }
}