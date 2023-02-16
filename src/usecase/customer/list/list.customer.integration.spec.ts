import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "../create/create.customer.usecase";
import ListCustomerUsecase from "./list.customer.usecase";

describe("Unit test for list customer use case", () => {

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


    it("should list a customer", async () => {
        
        const customerRepository = new CustomerRepository();
        const listUseCase = new ListCustomerUsecase(customerRepository);
        const createUseCase = new CreateCustomerUseCase(customerRepository);

        const customer1 = await createUseCase.execute({
            name: "Customer 1",
            address: {
                street: "Street 1",
                city: "City 1",
                number: 50,
                zip: "00000-123"
            }
        });

        const customer2 = await createUseCase.execute({
            name: "Customer 2",
            address: {
                street: "Street 2",
                city: "City 2",
                number: 55,
                zip: "00000-123"
            }
        });

        const output = await listUseCase.execute({});

        expect(output.customers.length).toBe(2);

        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].address.street).toBe(customer1.address.street);
        expect(output.customers[0].address.number).toBe(customer1.address.number);
        expect(output.customers[0].address.zip).toBe(customer1.address.zip);
        expect(output.customers[0].address.city).toBe(customer1.address.city);

        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].address.street).toBe(customer2.address.street);
        expect(output.customers[1].address.number).toBe(customer2.address.number);
        expect(output.customers[1].address.zip).toBe(customer2.address.zip);
        expect(output.customers[1].address.city).toBe(customer2.address.city);

    });

});