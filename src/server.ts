import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routes from "./routes";

dotenv.config();

const app: express.Application = express();

app.use(bodyParser.json());
app.use(routes);

const port = process.env.ENV === 'dev' ? 
  process.env.SERVER_PORT : process.env.TEST_SERVER_PORT

app.listen(port, () => {
  console.log(`Serving @ localhost:${port}`);
});

export default app;
