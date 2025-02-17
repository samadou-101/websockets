import express, { urlencoded, json } from "express";
import dotenv from "dotenv";
import testSetup from "./otherFile.js";
dotenv.config();
const port = process.env.PORT || 8000;
const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
app.get("/", (req, res) => {
    res.status(200).json({ msg: "Server is up and running" });
});
testSetup();
app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});
