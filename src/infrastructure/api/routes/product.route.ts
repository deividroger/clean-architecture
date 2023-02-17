import express, { Request,Response } from "express";
import ProductCreateUseCase from "../../../usecase/product/create/create.product.usecase";
import { ListProductUsecase } from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
export const productRoute = express.Router();


productRoute.post("/", async (req: Request, res: Response) => {
    const useCase = new ProductCreateUseCase(new ProductRepository());

    try {

        const productDto = {
            name: req.body.name,
            price: req.body.price
            }
            const output = await useCase.execute(productDto);

        res.status(200).json(output);
        }catch(error){
            res.status(500).send(error);
        }

    
});

productRoute.get("/", async (req: Request, res: Response) => {
    
    const useCase = new ListProductUsecase(new ProductRepository());

    try {
        const output = await useCase.execute({});
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }

});