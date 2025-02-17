import express, { urlencoded, json } from "express";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
