import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.update";

const customer = CustomerFactory.createWithAddress("John Doe", new Address("Street 1", 10, "00000-123", "São Paulo"));


const input =  {
    id: customer.id,
    name: "John Updated",
    address:{
        street: "Street 2",
        number: 20,
        zip: "00000-456",
        city: "Rio de Janeiro"
    }
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test update customer use case", () => {


    it("should update a customer", async () => {

        const customerRepository = MockRepository();    
        
        const useCase = new UpdateCustomerUseCase(customerRepository);

        const output = await    useCase.execute(input);

        expect(output).toEqual(input);
    });

});