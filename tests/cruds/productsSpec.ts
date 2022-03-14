import Product, { IProduct } from "../../src/models/products";

const productStore = new Product()
let product: IProduct;

describe("Testing Product's CRUDs", () => {
    it("Should get all products from DB", async () => {
        const result = await productStore.all()
        expect(result).toBeDefined()
    });
    
    it('Should create a new product in DB', async () => {
        product = await productStore.create({
            name: "Testing Create Product",
            category: "testing",
            price: 60,
            seller: "Tester",
            summary: "just testing the product creating method."
        })
        expect(product.name).toBeDefined()
        expect(product.category).toBeDefined()
        expect(product.price).toBeDefined()
        expect(product.seller).toBeDefined()
        expect(product.summary).toBeDefined()
        
    });

    it("Should update a product name in DB", async () => {
        const result = await productStore.update(
            (product as any).id,
            'name',
            'Edited Testing Create Product'
        )
        expect(result.name).toEqual('Edited Testing Create Product')
    });

    it("Should delete a product from DB", async () => {
        await productStore.delete((product as any).id)
        
        try {
            /* it will try to fetch a deleted record, if the record isn't found 
            it will catch a throw error instead, then assgin null to the obj. */
            var deleted_product: IProduct | null = await productStore.get((product as any).id)
        } catch {
            deleted_product = null
        }
        
        expect(deleted_product).toBeNull();
    });
});