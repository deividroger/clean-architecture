import express, { Request,Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import ListCustomerUsecase from "../../../usecase/customer/list/list.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";

export const customerRoute = express.Router();


customerRoute.post("/", async (req: Request, res: Response) => {
    const useCase = new CreateCustomerUseCase(new CustomerRepository());

    try {

        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                number: req.body.address.number,
                zip: req.body.address.zip,
            }
        }

        const output = await useCase.execute(customerDto);
        res.status(200).json(output);

        }catch(error){
            res.status(500).json({message: error});
        }
    
});

customerRoute.get("/", async (req: Request, res: Response) => {
    const useCase = new ListCustomerUsecase(new CustomerRepository());

    try {
        const output = await useCase.execute({});
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }

});