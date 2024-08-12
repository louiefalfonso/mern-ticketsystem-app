import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes/index.js";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewares.js";
import connectDB from "./config/db.js";

//config
dotenv.config();

//set port
const port = process.env.PORT || 5000;

//connect to db
const app = express();

//connect to db
connectDB();

app.use(
  cors({
    origin: ["http://localhost:3000", 
             "http://localhost:3001",
             "https://mern-ticketsystem-app.onrender.com",
             "https://mern-citecoreapp.netlify.app"
            ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan("dev"));
app.use("/graphql", routes);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.use(errorHandler);
app.use(routeNotFound);


//log requests
const server = app.listen(port, () =>
  console.log(`Server listening on ${port}`)
);
