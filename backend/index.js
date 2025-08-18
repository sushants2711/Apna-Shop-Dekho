import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/db.connect.js";
import authRouter from "./router/auth.route.js";
import productRouter from "./router/product.route.js";
import wishlistRouter from "./router/wishlist.route.js";
import cartRouter from "./router/cart.route.js";

// dotenv config
dotenv.config();

// initialize the app
const app = express();

// initialize the port
const PORT = process.env.PORT || 5500;

// connect with database
connectDb();

// call cookie parser
app.use(cookieParser())

// convert the data into json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// allowed the cors policy to connect the establish connection between frontend and backend
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"]
}))

// api end points
app.use("/api/user", authRouter);
app.use("/api/products", productRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/cart", cartRouter);

// server is started here
app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`)
})