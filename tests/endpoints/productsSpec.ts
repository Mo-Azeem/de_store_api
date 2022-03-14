import supertest from "supertest";
import app from "../../src/server";

const req = supertest(app)
const url: string = '/products'
let jwt: string;

beforeAll(async () => {
    const user = await req.post('/users')
        .send({
            username: "productSpec",
            password: "123456789",
            first_name: "John",
            last_name: "Doe"
        })
        .set('Accept', 'application/json')
    jwt = user.body.jwt
})

describe('Testing Products Endpoints', () => {
    // GET /products
    it(`should get all products with 200 response in return from GET ${url}`, async () => {
        const res = await req.get(url)
        expect(res.statusCode).toBe(200)
    });

    // POST /products
    it(`should add a product to DB with 200 response in return from POST ${url}`, async () => {
        const res = await req.post(url)
            .send({
                name: 'Coffee Mug',
                price: 6,
                summary: "A Red Coffee Mug For Coffee Lovers",
                category: "kitchen",
                seller: "Kit-Chin Bros"
            })
            .set({
                Accept: 'application/json',
                Authorization: `Bearer ${jwt}`
            })

        expect(res.statusCode).toBe(200)
    })

    it(`should get products by category from ${url}/category/:category with 200 response in return`,
        async () => {
            const res = await req.get(`${url}/category/kitchen`)
            expect(res.statusCode).toBe(200)
        })

    it(`should get a product by id from ${url}/:id with 200 response in return`, async () => {
        const res = await req.get(`${url}/1`)
        expect(res.statusCode).toBe(200)
    })

});
