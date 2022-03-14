import supertest from "supertest";
import app from "../../src/server";

const req = supertest(app)
const url: string = '/orders'

let user: any
let product: any
let order: any

/*
    preparing a new testing user and a product to test with.
    Note that jasmine excutes test cases in order via --random=false 
    in npm run test script. test cases rely on each other.
*/

beforeAll(async () => {
    const res_user = await req.post('/users')
        .send({
            username: "orderSpecEndpoint",
            password: "123456789",
            first_name: "John",
            last_name: "Doe"
        })
        .set('Accept', 'application/json')
    user = res_user.body
    
    const res_product = await req.post('/products')
        .send({
            name: "Xiaomi Mi Smart Watch Lite Ivory",
            price: 949,
            summary: "1.4 inch TFT LCD touch colour display with a resolution of 320 x 320 pixels, PPI323",
            category: "smart watches",
            seller: "Xiaomi"
        })
        .set({
            Accept: 'application/json',
            Authorization: `Bearer ${user.jwt}`
        })
    product = res_product.body
})

describe('Testing Orders Endpoints', () => {

    it(`should create a new order and assign user's id to it`, async () => {
        const res = await req.post(url)
            .send({
                user_id: user.id,
                status: "active",
                total: 1 // intial value to calculate the total later
            })
            .set({
                Accept: 'application/json',
                Authorization: `Bearer ${user.jwt}`
            })
        order = res.body

        expect(res.statusCode).toBe(200)
    });

    it('should add a product to an existing open order and assign product\'s id to it', async () => {
        const res = await req.post(`${url}/add-product`)
            .send({
                order_id: order.id,
                product_id: product.id,
                quantity: 4
            })
            .set({
                Accept: 'application/json',
                Authorization: `Bearer ${user.jwt}`
            })
            
        expect(res.statusCode).toBe(200)
    });

    it("should get the active user's order by user's id", async () => {
        const res = await req.get(`/users/${user.id}/current-order`)
            .set({
                Accept: 'application/json',
                Authorization: `Bearer ${user.jwt}`
            })            
        expect(res.body.username).toEqual(user.username)
        expect(res.body.orders).toBeDefined()        
        expect(res.body.orders[order.id].products).toBeDefined()
    });
    
    it("should get all user's orders by user's id", async () => {
        const res = await req.get(`/users/${user.id}/orders`)
            .set({
                Accept: 'application/json',
                Authorization: `Bearer ${user.jwt}`
            })
        expect(res.body.username).toEqual(user.username)
        expect(res.body.orders).toBeDefined()        
        expect(res.body.orders[order.id].products).toBeDefined()
    });

});