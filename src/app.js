import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Basic configuration or Middlewares (This configuration tells us what kind of data should Server respond to)

app.use(express.json({ limit : "16kb" }))
app.use(express.urlencoded({extended : true, limit : "16kb"}))
app.use(express.static("public"))

app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World");
});

// CORS Configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: [
        "GET",
        "PUT",
        "POST",
        "PATCH",
        "DELETE",
        "OPTIONS"
    ],
    allowedHeaders: [
        "Authorization",
        "Content-Type"
    ],
}));

// This is where we want to import the routes
// This is where we want to import the routes
import healthCheckRouter from "./routes/healthcheck.route.js"
app.use("/api/v1/healthcheck", healthCheckRouter);

import authRouter from "./routes/auth.routers.js";
app.use("/api/v1/auth", authRouter);

app.get("/instagram", (req, res) => {
    res.send("This is Instagram page");
})
// Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: err.success || false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
        stack: err.stack,
    });
});

export default app;