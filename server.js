import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import UserRouter from "./routes/userRouter.js";
config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/user", UserRouter);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(9000, () => {
      console.log(`Server is Running at Port`);

    });
  })
  .catch((err) => console.log(`${err} Error Occured`));
