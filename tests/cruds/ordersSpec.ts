import Order, {IOrder} from "../../src/models/orders";
import User, { IUser } from "../../src/models/users";
import { hash } from "../../src/utils/utils";

const userStore = new User()
const orderStore = new Order()
let user: IUser
let order: IOrder

beforeAll(async () => {
    user = await userStore.create({
        username: "ordersspec",
        hashed_password: hash("123456789"),
        first_name: "John",
        last_name: "Doe"
    })
})

describe("Testing Order's CRUDs", () => {
    it('Should get all orders from DB', async () => {
        const result = await orderStore.all()
        expect(result).toBeDefined()
    });

    it("Should create a new order in DB", async () => {
        order = await orderStore.create({
            user_id: (user as any).id,
            placing_date: new Date().toLocaleDateString(),
            total: 1,
            status: 'active'
        })

        expect((order as any).id).toBeDefined()
    });

    it("Should update an existed order in DB", async () => {
        const result = await orderStore.update(
            (order as any).id,
            'status',
            'complete'
        )
        expect(result.status).toEqual('complete')
    })

    it('should delete an existed order in DB', async () => {
        await orderStore.delete((order as any).id)
        try {
            /* it will try to fetch a deleted record, if the record isn't found 
            it will catch a throw error instead, then assgin null to the obj. */
            var deleted_order: IOrder | null = await orderStore.get((order as any).id)
        } catch {
            deleted_order = null
        }
        
        expect(deleted_order).toBeNull();
    });
})