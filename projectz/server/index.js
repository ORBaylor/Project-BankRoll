import express from 'express';
import { connect } from 'mongoose';
//import { Router, express } from "express";
import { router } from "express";
import { cors } from "cors";
import { User } from "../server/Routes/User/CreateUser.js";
import { Debt } from "../server/Routes/User/Debt.js";
import { Income } from "../server/Routes/User/Income.js";
dotenv.config();

//const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connect('mongodb://localhost:27017/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true });

const bodyParser = require('body-parser');
//const cors = require('cors');
//Using express
const app = express();
//Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors())
// Define routes and middleware here





//Directing routes
app.use(User);
app.use(Debt);
app.use(Income);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

