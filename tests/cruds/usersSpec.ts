import User, { IUser } from "../../src/models/users";
import { hash } from "../../src/utils/utils";

const userStore = new User(); 

describe("Testing User's CRUDs", () => {
    it('should create a new user.', async () => {
        const user = await userStore.create({
            username: "_testing_user_crud_1",
            hashed_password: hash("123456789"),
            first_name: "John",
            last_name: "Doe"
        })
        expect(user.username).toBeDefined()
        expect(user.hashed_password).toBeDefined()
        expect(user.first_name).toBeDefined()
        expect(user.last_name).toBeDefined()
    });
    
    it('should get all users.', async () => {
        const result = await userStore.all()
        expect(result).toBeDefined()
    });

    it('should should update a user via id.', async () => {
        const user = await userStore.create({
            username: "testing_user_crud_3",
            hashed_password: hash("123456789"),
            first_name: "John",
            last_name: "Doe"
        })
        
        const result = await userStore.update(
            (user as any).id, 
            'username', 
            'testing_user_crud_3_updated'
        )
        expect(result.username).toEqual('testing_user_crud_3_updated')
        
    });

    it('should delete a user via id.', async () => {
        const user = await userStore.create({
            username: "testing_user_crud_2",
            hashed_password: hash("123456789"),
            first_name: "John",
            last_name: "Doe"
        })
        
        await userStore.delete((user as any).id)

        try {
            /* it will try to fetch a deleted record, if the record isn't found 
            it will catch a throw error instead, then assgin null to the obj. */
            var deleted_user: IUser | null = await userStore.get((user as any).id)
        } catch {
            deleted_user = null
        }
        
        expect(deleted_user).toBeNull();        
    });
});