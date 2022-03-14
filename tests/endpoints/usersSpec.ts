import supertest from "supertest";
import app from "../../src/server";

const req = supertest(app)
const url: string = '/users'
let user: any

beforeAll(async () => {
    const res = await req.post(url)
        .send({
            username: "usersspec",
            password: "123456789",
            first_name: "John",
            last_name: "Doe"
        })
    user = res.body
});

describe('Testing Users', () => {
    it(`should fetch all users from GET ${url} sucessfully.`, async () => {
        const res = await req.get('/users')
            .set({
                Accept: 'application/json',
                Authorization: `Bearer ${user.jwt}`
            })

        expect(res.statusCode).toBe(200)
    });

    it('should fetch a user via UserID from GET ${url}/:id sucessfully.', async () => {
        const res = await req.get(`${url}/${user.id}`)
            .set({
                Accept: 'application/json',
                Authorization: `Bearer ${user.jwt}`
            })

        expect(res.statusCode).toBe(200)
    });

    it(`should create a user at POST ${url} successfully.`, async () => {
        const res = await req.post(url)
            .send({
                username: "userspectestcase",
                password: "123456789",
                first_name: "John",
                last_name: "Doe"
            })

            expect(res.statusCode).toBe(200)
            expect(res.body.jwt).toBeDefined()
    });

    it(`should sign in and retrieve a jwt from POST ${url}/auth successfully.`, async () => {
        const res = await req.post(`${url}/auth`)
            .send({
                username: "userspectestcase",
                password: "123456789"
            })
        
            expect(res.statusCode).toBe(200)
            expect(res.body.jwt).toBeDefined()
    });
});
