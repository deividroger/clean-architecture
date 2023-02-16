import Product from "../../../domain/product/entity/Product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dtos";

export class ListProductUsecase {

    constructor(private readonly productRepository: ProductRepositoryInterface) {}

    async execute(input: InputListProductDto): Promise<OutputListProductDto> {

        const products = await this.productRepository.findAll();

        return OutputMapper.ToDto(products);
    
    }
 
}

class OutputMapper {
    static ToDto(products: Product[]):OutputListProductDto{
        return {
            products: products.map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price
                }
            })
        }
    }
}