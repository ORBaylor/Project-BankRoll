import { MongoClient, ObjectId } from "mongodb";
import * as dotenv from "dotenv";
import { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel, debtPayOffTimeFrameModel, CustomDebtModel, customDebtPayOffTimeFrameModel } from '../../MongoSchema/SchemaModel.js'
import { SortDebtCustom, CustomPayBareMinimum, UpdateMiniMumPayment, AmountAddedToCurrentDebt, FindAmountLeftOver, FindAllCurrentDebt, PayOffRemainingDebt, CheckIfAllDebtsArePaid, CustomDebtPaymentFrame, getTotalIncomeAmount, GetTotalIntrest, calculatePayoffDate, GetTotalPayments, GetMonthlyIntrestRate, PayBareMinimum, DivideIncomeByOurr, ReturnErrorFrame } from '../../BudgetEngine/HelperFuctions.js'
import { mongoose } from "mongoose";
const express = require('express');
//const router = express.Router();
//import { express } from "express";
const router = express.Router();
dotenv.config();

const MongoPassword = "Z2c1MFIFYufHRMan"
let uri = `mongodb+srv://dbUser:${MongoPassword}@test.xqxjfvx.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 30000, // Example: Set timeout to 30 seconds
    socketTimeoutMS: 45000,
});


router.get('/search', async (req, res) => {

    //The right query string
    //http://localhost:5000/api/recipes/search?query=curry&cuisine=indian&diet=vegan&intolerances=milk&type=maindish
    const data = await fetchRecipe(query, cuisine, diet, intolerances, type, includeIngredients, excludeIngredients);

    res.json(data);
})

const userSchema = new Schema({
    FirstName: String,
    LastName: String,
    UserName: String,
    Password: String,
    ContactInformation: {
        EmailAdress: String,
        PhoneNumber: String
    }


})

//Create a user
router.post('/user/create', async (req, res) => {

    //What is given to the router
    //req

    //What is returned from the router
    //res

    const firstName = req.FirstName;
    const lastname = req.LastName;
    const userName = req.UserName;
    const password = req.Password;
    const emailAdress = req.ContactInformation.EmailAdress;
    const phoneNumber = req.ContactInformation.PhoneNumber;

    const newUser = new UserModel({ FirstName: firstName, LastName: lastname, UserName: userName, Password: password, ContactInformation: { EmailAdress: emailAdress, PhoneNumber: phoneNumber } })

    await client.connect().then(() => {

        // IncomeModel.create({ name: 'guns', amount: 200, occurrence: 'weekly' })
        console.log("connect");
        const db = client.db("test");

        const userCollection = db.collection("usermodels");

        const insertedUser = userCollection.insertOne(newUser);
        //const insertDebt = debtCollection.insertOne(debt);


    }).finally(() => {
        //client.close();
        console.log("finally")
    })

    mongoose.disconnect()
        .then(() => {
            console.log('Disconnected from MongoDB');
        })
        .catch((error) => {
            console.error('Error disconnecting from MongoDB:', error);
        });
})

//Update a user
router.post('/user/update', async (req, res) => {
    const db = client.db("test");
    const userCollection = db.collection("usermodels");
    //The id of the user that needs to be updated
    //65a74942971fc53c89aebe1a
    const userId = req._id;
    const firstName = req.FirstName;
    const lastname = req.LastName;
    const userName = req.UserName;
    const password = req.Password;
    const emailAdress = req.ContactInformation.EmailAdress;
    const phoneNumber = req.ContactInformation.PhoneNumber;

    //A new user model with all of the updates
    const UserUpdates = new UserModel({ FirstName: firstName, LastName: lastname, UserName: userName, Password: password, ContactInformation: { EmailAdress: emailAdress, PhoneNumber: phoneNumber } })

    //  const userTo = require('../MongoSchema/SchemaModel.js/UserModel'); // Import your Todo model

    mongoose.createConnection(uri);
    console.log("Connected")


    const filter = { _id: new ObjectId(userId) }

    try {
        await userCollection.updateOne(filter, UserUpdates, { new: false })
            .then(updatedDocument => {
                if (!updatedDocument) {
                    console.log('Document not found');
                } else {
                    console.log('Updated document:', updatedDocument);
                }
            })
            .catch(error => {
                console.error('Error updating document:', error.message);
            });

        mongoose.disconnect()
            .then(() => {
                console.log('Disconnected from MongoDB');
            })
            .catch((error) => {
                console.error('Error disconnecting from MongoDB:', error);
            });
    } catch (error) {

    }

    //if everything is ok return 200
    //If not return some other bull shit lol

})

//View a user
router.get('/user/view', async (req, res) => {


    try {
        const db = client.db("test");
        const userCollection = db.collection("usermodels");
        mongoose.createConnection(uri);
        console.log("Connected")
        const filter = { _id: new ObjectId(req._id) }


        let returnUser = await userCollection.findOne(filter).then(foundUser => {
            if (!foundUser) {
                console.log('User not found');

            } else {
                console.log('User document:', foundUser);
                return res.json(foundUser);
            }
        })
            .catch(error => {
                console.error('Error updating document:', error.message);
            });



    } catch (error) {

    }

    //check if the data is correct, if so return User
    return foundUser;

})