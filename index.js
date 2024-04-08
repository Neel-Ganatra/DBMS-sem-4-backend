import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/AdminRoute.js";


const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true

}));
app.use(express.json());

app.use("/admin", adminRouter);

app.listen(5000, () => {
    console.log("server is running on port 5000");
});
