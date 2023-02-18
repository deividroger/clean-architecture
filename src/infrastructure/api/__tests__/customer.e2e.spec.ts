import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "Main Street",
                    city: "New York",
                    number: 15,
                    zip: "12345",
                }
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John");
        expect(response.body.address.street).toBe("Main Street");
        expect(response.body.address.city).toBe("New York");
        expect(response.body.address.number).toBe(15);
        expect(response.body.address.zip).toBe("12345");
    });

    it("should not create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({ name: "John" });

        expect(response.status).toBe(500);

    });

    it("should list all customers", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "Main Street",
                    city: "New York",
                    number: 15,
                    zip: "12345",
                }
            });

        expect(response.status).toBe(200);

        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "John 2",
                address: {
                    street: "Main Street",
                    city: "New York",
                    number: 15,
                    zip: "12345",
                }
            });

        expect(response.status).toBe(200);
        expect(response2.status).toBe(200);

        const listResponse = await request(app)
            .get("/customer")
            .send();
        
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);

        const customer = listResponse.body.customers[0];

        expect(customer.name).toBe("John");
        expect(customer.address.street).toBe("Main Street");

        const customer2 = listResponse.body.customers[1];

        expect(customer2.name).toBe("John 2");
        expect(customer2.address.street).toBe("Main Street");

        const listResponseXML = await request(app)
            .get("/customer")
            .set("Accept", "application/xml")
            .send();
        
        expect(listResponse.status).toBe(200);

        expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);

        expect(listResponseXML.text).toContain(`<customers>`);
        expect(listResponseXML.text).toContain(`<customer>`);
        
        expect(listResponseXML.text).toContain(`</customers>`);
        expect(listResponseXML.text).toContain(`</customer>`);

    });

});