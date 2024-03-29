import express, { request, response } from "express";
import mongoose from "mongoose";
import { PORT, mongoURL} from "./config.js";
import { Book } from "./models/bookModel.js";
import  booksRoute  from "./routes/booksRoute.js"
import cors from 'cors';


const app = express();

// Middleware for parsing body
app.use(express.json());

// Middleware for handling CORS POLICY
//Option 1: Allow all origins with defauls cors
app.use(cors());

//option 2: Allow custom origin 
// app.use(
//   cors({
//     origin:'http://localhost:3000',
//     method:['POST', 'GET', 'PUT', 'DELETE'],
//     allowhead: ['Content-Type'],
//   })
// );



app.get('/', (request, response)=>{
    console.log(request);
    return response.status(235).send("Welcome to MERN stack");
});


//middleware to handle book model route
app.use("/books", booksRoute);


mongoose
  .connect(mongoURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });