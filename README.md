# DE_Store

DE_Store is a basic simple storefront API that powers your websites and apps with useful data such as users, products and orders. Use DE_Store API to create your store online today!



## Getting Started

DE_Store is written with Node.js, Express, and PostgreSQL, and it requires a simple installation process to get the API up and running.

First, make sure you have Node.js installed, then open up a terminal and change it's current directory to the API's folder, and type this command :-

```bash
npm install
```



Now, before running the server, some simple steps must be taken first, we need to provide the API database login credentials, **make sure you provide it a user with creation, updating, deleting privileges**. otherwise, DB migration won't run.



### Preparing the database

- Open PSQL, Log in with your admin account, and then type these commands: 

  ```sql
  CREATE USER your_username_here WITH PASSWORD 'your_password_here' CREATEDB;
  ```

  ```SQL
  CREATE DATABASE de_store;
  ```

  Then, grant your user all the privileges by typing:

  ```sql
  GRANT ALL PRIVILEGES ON DATABASE de_store TO your_username_here;
  ```

​		*Don't worry, running testing mode will create de_store_test automatically*

- Create an empty file, let's just name it`.env` at the root of the project folder.

- Open the file using your favorite text editor, and place these environment variables in it.

```env
PG_USERNAME=your_username_here
PG_PASSWORD=your_password_here
PG_DATABASE=de_store
PG_DATABASE_TEST=de_store_test
PG_HOST=127.0.0.1
ENV=dev
SERVER_PORT=3500
TEST_SERVER_PORT=4000
SALT_ROUNDS=10
PEPPER_SECRET_WORD=YOUR_PEPPER_SECRET_WORD_HERE
JWT_SIGNUTURE=YOUR_JWT_SIGNUTURE_HERE
```

*Just make sure there aren't spaces before and after **"="***

***Tip**: you can use any online random string generator for PEPPER_SECRET_WORD and JWT_SIGNUTURE*

- Go to the `database.json` file and change these values: 

```json
{
  "dev": {
	"user": "your_username_here",
    "password": "your_password_here"
  },
  "test": {
	"user": "your_username_here",
    "password": "your_password_here"
  }
}
```



## Running The Server

The API can run in **3 different modes**: Production, Development and Testing.

**Production Mode**, this command will compile and run the API on ***Port 3500***.

```bash
npm run prod
```



Yes, you can customize the code to your liking and add the features you want, run this command to get started in **Development Mode** on **Port 3500**.

```bash
npm run dev
```



DE_Store unit tests are written with Jasmine, they test the endpoints and CRUD operations,

you can start the **Testing Mode** on **Port 4000**. by typing this command :-

```bash
npm run test
```

Testing mode will drop and recreate `de_store_test` database for you automatically.

