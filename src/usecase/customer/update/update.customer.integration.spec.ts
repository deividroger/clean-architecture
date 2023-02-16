import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import UpdateCustomerUseCase from "./update.customer.update";

describe("Unit test update customer use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a customer", async () => {

        const customerRepository = new CustomerRepository();

        var customer = new Customer("123","John Doe");
        customer.changeAddress(new  Address("Street 1",10,"00000-123","São Paulo"));

        customerRepository.create(customer)

        const updateUseCase = new UpdateCustomerUseCase(customerRepository);

        const input = {
            id: customer.id,
            name: "John Updated",
            address: {
                street: "Street 2",
                number: 20,
                zip: "00000-456",
                city: "Rio de Janeiro"
            }
        };

        const output = await updateUseCase.execute(input);

        expect(output).toEqual(input);
    });

});