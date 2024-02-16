//import { MongoClient, ObjectId } from "mongodb";
//import * as dotenv from "dotenv";
//import { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel, debtPayOffTimeFrameModel, CustomDebtModel, customDebtPayOffTimeFrameModel } from '../../MongoSchema/SchemaModel.js'
//import { SortDebtCustom, CustomPayBareMinimum, UpdateMiniMumPayment, AmountAddedToCurrentDebt, FindAmountLeftOver, FindAllCurrentDebt, PayOffRemainingDebt, CheckIfAllDebtsArePaid, CustomDebtPaymentFrame, getTotalIncomeAmount, GetTotalIntrest, calculatePayoffDate, GetTotalPayments, GetMonthlyIntrestRate, PayBareMinimum, DivideIncomeByOurr, ReturnErrorFrame } from '../../BudgetEngine/HelperFuctions.js'
//import { mongoose } from "mongoose";
const express = require('express');
//const ObjectId = require('mongodb');
const { ObjectId } = require('mongodb');
const { MongoClient, ServerApiVersion } = require('mongodb');

const { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel, debtPayOffTimeFrameModel, CustomDebtModel, customDebtPayOffTimeFrameModel } = require('../../MongoSchema/SchemaModel.js')
const { SortDebtCustom, CustomPayBareMinimum, UpdateMiniMumPayment, AmountAddedToCurrentDebt, FindAmountLeftOver, FindAllCurrentDebt, PayOffRemainingDebt, CheckIfAllDebtsArePaid, CustomDebtPaymentFrame, getTotalIncomeAmount, GetTotalIntrest, calculatePayoffDate, GetTotalPayments, GetMonthlyIntrestRate, PayBareMinimum, DivideIncomeByOurr, ReturnErrorFrame } = require('../../BudgetEngine/HelperFuctions.js');
const mongoose = require('mongoose');
const { json } = require('body-parser');

//const router = express.Router();
//import { express } from "express";
const router = express.Router();
//dotenv.config();

const MongoPassword = "Z2c1MFIFYufHRMan"
let uri = `mongodb+srv://dbUser:${MongoPassword}@test.xqxjfvx.mongodb.net/?retryWrites=true&w=majority`;

// const client = mongoose(uri, {
//     serverSelectionTimeoutMS: 30000, // Example: Set timeout to 30 seconds
//     socketTimeoutMS: 45000,
// });

const client = new MongoClient(uri, {
    // serverApi: {
    //     version: ServerApiVersion.v1,
    //     strict: true,
    //     deprecationErrors: true,
    // }
});


//Create a user
router.post('/create', async (req, res) => {

    //What is given to the router
    //req

    //What is returned from the router
    //res
    console.log(req)
    const firstName = req.body.FirstName;
    const lastname = req.body.LastName;
    const userName = req.body.UserName;
    const password = req.body.Password;
    const emailAdress = req.body.ContactInformation.EmailAdress;
    //const emailAdress = "TheWeedMan@HotMail.com";
    console.log(emailAdress)
    const phoneNumber = req.body.ContactInformation.PhoneNumber;
    //const phoneNumber = "999-999-9999";


    //const newUser = new UserModel({ FirstName: firstName, LastName: lastname, UserName: userName, Password: password, ContactInformation: { EmailAdress: emailAdress, PhoneNumber: phoneNumber } })


    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");

        mongoose.connect(uri);

        //await client.connect();

        const usersCollection = client.db('test').collection('usermodels');

        //const userNew = mongoose.model('UserModel', schema);
        await usersCollection.insertOne({ FirstName: firstName, LastName: lastname, UserName: userName, Password: password, ContactInformation: { EmailAdress: emailAdress, PhoneNumber: phoneNumber } }).then((newUser) => {

            if (!newUser) {
                return res.status(500).send('Internal Server Error');
            } else {
                return res.status(200).send(`User Created: ${newUser.insertedId.toString()}`);
            }
        });

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }

    // mongoose.createConnection(uri).asPromise(() => {

    //     // IncomeModel.create({ name: 'guns', amount: 200, occurrence: 'weekly' })
    //     console.log("connect");
    //     const db = client.db("test");

    //     const userCollection = db.collection("usermodels");

    //     const insertedUser = userCollection.insertOne(newUser);
    //     //const insertDebt = debtCollection.insertOne(debt);


    // });
    // await mongoose.connect().then(() => {

    //     // IncomeModel.create({ name: 'guns', amount: 200, occurrence: 'weekly' })
    //     console.log("connect");
    //     const db = client.db("test");

    //     const userCollection = db.collection("usermodels");

    //     const insertedUser = userCollection.insertOne(newUser);
    //     //const insertDebt = debtCollection.insertOne(debt);


    // }).finally(() => {
    //     //client.close();
    //     console.log("finally")
    // })

    mongoose.disconnect()
        .then(() => {
            console.log('Disconnected from MongoDB');
        })
        .catch((error) => {
            console.error('Error disconnecting from MongoDB:', error);
        });
})

//Update a user
router.post('/update', async (req, res) => {
    const db = client.db("test");
    const userCollection = db.collection("usermodels");
    //The id of the user that needs to be updated
    //65a74942971fc53c89aebe1a
    const userId = req.body._id;
    const firstName = req.body.FirstName;
    const lastname = req.body.LastName;
    const userName = req.body.UserName;
    const password = req.body.Password;
    const emailAdress = req.body.ContactInformation.EmailAdress;
    //const emailAdress = "TheWeedMan@HotMail.com";
    console.log(emailAdress)
    const phoneNumber = req.body.ContactInformation.PhoneNumber;

    //A new user model with all of the updates


    //  const userTo = require('../MongoSchema/SchemaModel.js/UserModel'); // Import your Todo model

    mongoose.createConnection(uri);
    console.log("Connected")


    const filter = { _id: new ObjectId(userId) }

    try {

        await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");

        mongoose.connect(uri);

        //await client.connect();

        const usersCollection = client.db('test').collection('usermodels');


        await userCollection.updateOne(filter, { $set: { FirstName: firstName, LastName: lastname, UserName: userName, Password: password, ContactInformation: { EmailAdress: emailAdress, PhoneNumber: phoneNumber } } }, { new: false })
            .then(updatedDocument => {
                if (!updatedDocument) {
                    console.log('Document not found');
                    return res.sendStatus(500);
                } else {
                    console.log('Updated document:', updatedDocument);
                    return res.sendStatus(200)
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
router.post('/view', async (req, res) => {


    try {
        const db = client.db("test");
        const userCollection = db.collection("usermodels");
        mongoose.createConnection(uri);
        console.log("Connected")
        const filter = { _id: new ObjectId(req.body._id) }


        await userCollection.findOne(filter).then(foundUser => {
            if (!foundUser) {
                console.log('User not found');
                return res.sendStatus(400);

            } else {
                console.log('User document:', foundUser);
                return res.send(foundUser)
            }
        })
            .catch(error => {
                console.error('Error updating document:', error.message);
            });



    } catch (error) {

    }

    //check if the data is correct, if so return User
    //  return foundUser;

})

//delete a user
router.delete('/delete', async (req, res) => {


    try {
        const db = client.db("test");
        const userCollection = db.collection("usermodels");
        mongoose.createConnection(uri);
        console.log("Connected")
        const filter = { _id: new ObjectId(req.body._id) }


        await userCollection.deleteOne(filter).then(foundUser => {
            if (!foundUser) {
                console.log('User not found');
                return res.sendStatus(400);

            } else {
                console.log('User document:', foundUser);
                return res.send(foundUser.acknowledged);
            }
        })
            .catch(error => {
                console.error('Error updating document:', error.message);
            });



    } catch (error) {

    }



})
module.exports = router;