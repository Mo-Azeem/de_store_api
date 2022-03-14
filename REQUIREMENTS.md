# API Endpoints

These are the available endpoints of DE_Store that you can make requests to.

### Products

- Get all products

  ​	**GET /products**

- Get a product by ID

  ​	**GET /products/:id**

- Get a product by category

  ​	**GET /products/category/:category**

- Add a product ( JWT required )

  ​	**POST /products**

  ```json
  //Request's body must be look like this: 
  {
      "name": "product_name",
      "price": 120,
      "summary": "add_summary_here",
      "category": "add_category_here",
      "seller": "add_seller_name_here"
  }
  ```



### Users

- Create a user

  ​	**POST /users** 

  ```json
  {
      "username": "your_username_here",
      "password": "your_password_here",
      "first_name": "first_name_here",
      "last_name": "last_name_here"
  }
  ```

- Display all users ( JWT required )

  ​	**GET /users**

- Get a user information by ID ( JWT required )

  ​	**GET /users/:id**

- Sign in to get a JWT 

  ​	**POST /users/auth**

  ```json
  {
      "username": "your_username_here",
      "password": "your_password_here"
  }
  ```

- Get the current active user's order by user ID  ( JWT required )

  ​    **GET /users/:id/current-order**

- Get the all of user's orders by user ID  ( JWT required )

  ​    **GET /users/:id/orders**

  

### Orders

- Create a new order for a user ( JWT required )

   	**POST /orders**

  ```json
  {
      "user_id": 1,
      "status": "complete_or_active",
      "total": 600 //calculate total here.
  }
  ```

- Add a product to an order. ( JWT required )

  **POST /orders/add-product**

```json
{
    "order_id": 5,
    "product_id": 1,
    "quantity": 25
}
```

- Retrieve all orders ( JWT required )

  ​	**GET /orders**

- Get a specific order by ID ( JWT required )

  ​	**GET /orders/:id**



## Database Scheme

![](https://i.imgur.com/LAoTAVK.png)
