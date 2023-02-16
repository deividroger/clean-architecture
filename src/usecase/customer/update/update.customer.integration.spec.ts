import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "../create/create.customer.usecase";
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

        const updateUseCase = new UpdateCustomerUseCase(customerRepository);
        const createUseCase = new CreateCustomerUseCase(customerRepository);

        const customer = await createUseCase.execute({
            name: "John Doe",
            address: {
                street: "Street 1",
                city: "São Paulo",
                number: 10,
                zip: "00000-123"
            }
        });

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