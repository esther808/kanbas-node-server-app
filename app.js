// const express = require("express");
import express from "express";
import HelloRoutes from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";


mongoose.connect("mongodb://127.0.0.1:27017/kanbas");

const app = express();

// app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());


UserRoutes(app);
Lab5(app);
ModuleRoutes(app);
CourseRoutes(app);
HelloRoutes(app);
app.listen(4001);



// import express from 'express';
// import Hello from './hello.js';
// import Lab5 from "./lab5.js";
// import cors from "cors";
// import CourseRoutes from "./courses/routes.js";
// import ModuleRoutes from "./modules/routes.js";
// import "dotenv/config";
// import session from "express-session";

// app.listen(process.env.PORT || 4001);
// // app.use(cors());
// // app.use(express.json());
// // const app = express()
// // app.use(express.json());
// ModuleRoutes(app);
// CourseRoutes(app);
// Lab5(app);
// Hello(app)
// const app = express();
// app.use(cors());

// // app.listen(4001)