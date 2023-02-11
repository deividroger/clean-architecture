import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "Customer 1");
const address = new Address("Street 1", 10, "00000-123", "São Paulo");

customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test find customer use case", () => {


    it("should find a customer", async () => {

        const customerRepository = MockRepository();
        const useCase = new FindCustomerUseCase(customerRepository)

        await customerRepository.create(customer);

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Customer 1",
            address: {
                street: "Street 1",
                city: "São Paulo",
                number: 10,
                zip: "00000-123"
            }
        }

        const result = await useCase.execute(input);

        expect(result).toEqual(output);

    });

    it("should not find a customer", async () => {

        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        });

        const useCase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "123"
        };

        expect( ()=>{
            return useCase.execute(input);
        } ).rejects.toThrowError("Customer not found");
    });
    
});