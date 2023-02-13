import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUsecase {
    constructor(private readonly customerRepository: CustomerRepositoryInterface) { }

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        
        const customers = await this.customerRepository.findAll();

        return await OutputMapper.toDto(customers);
    }
}

class OutputMapper {
    static toDto(customers: Customer[]): OutputListCustomerDto {
        return {
            customers: customers.map(customer => {
                return {
                    id: customer.id,
                    name: customer.name,
                    address: {
                        street: customer.Address.street,
                        number: customer.Address.number,
                        zip: customer.Address.zip,
                        city: customer.Address.city
                    }
                }
            })
        }
    }
}