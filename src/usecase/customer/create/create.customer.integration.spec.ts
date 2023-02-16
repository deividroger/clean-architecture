import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "John Doe",
    address: {
        street: "Street 1",
        number: 10,
        zip: "00000-123",
        city: "São Paulo"
    }
};

describe("Unit test create customer use case", () => {

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


    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        const output = await customerCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city,
            }
        });

    });

    it("should throw an error when name is missing", async () => {
        const customerRepository = new CustomerRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
        input.name = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Name is required");

    });

    it("should throw an error when street is missing", async () => {
        const customerRepository = new CustomerRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
        input.address.street = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("street is required");

    });

});