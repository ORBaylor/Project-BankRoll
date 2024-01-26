import { MongoClient, ObjectId } from "mongodb";
import * as dotenv from "dotenv";
import { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel, debtPayOffTimeFrameModel, CustomDebtModel, customDebtPayOffTimeFrameModel } from '../../MongoSchema/SchemaModel.js'
import { SortDebtCustom, CustomPayBareMinimum, UpdateMiniMumPayment, AmountAddedToCurrentDebt, FindAmountLeftOver, FindAllCurrentDebt, PayOffRemainingDebt, CheckIfAllDebtsArePaid, CustomDebtPaymentFrame, getTotalIncomeAmount, GetTotalIntrest, calculatePayoffDate, GetTotalPayments, GetMonthlyIntrestRate, PayBareMinimum, DivideIncomeByOurr, ReturnErrorFrame } from '../../BudgetEngine/HelperFuctions.js'
import { mongoose } from "mongoose";
//const express = require('express');
//const router = express.Router();
const express = require('express');
const router = express.Router();

dotenv.config();

const MongoPassword = "Z2c1MFIFYufHRMan"
let uri = `mongodb+srv://dbUser:${MongoPassword}@test.xqxjfvx.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 30000, // Example: Set timeout to 30 seconds
    socketTimeoutMS: 45000,
});

//Creating a new income
router.get('/income/create', async (req, res) => {

    mongoose.createConnection(uri);
    const db = client.db("test");
    const incomeCollection = db.collection("incomemodels");
    const name = req.name;
    const amount = req.amount
    const occurrence = req.occurrence
    const userId = req.userId;

    const newIncome = new IncomeModel({ name: name, amoun: amount, occurrence: occurrence, userId: userId });

    const insertedIncome = await incomeCollection.insertOne(newIncome).then(newDebt).then(newDebt => {
        if (!newIncome) {
            console.log("Debt now found");
        } else {
            console.log("New Debt: " + newIncome.insertedId._id.toString())
            res.json(newIncome.insertedId)

        }
    })
    mongoose.disconnect()
        .then(() => {
            console.log('Disconnected from MongoDB');
        })
        .catch((error) => {
            console.error('Error disconnecting from MongoDB:', error);
        });

})

//Updating Debt
router.post('/income/update', async (req, res) => {

    mongoose.createConnection(uri);
    console.log("Connected")
    const db = client.db("test");
    const incomeCollection = db.collection("incomemodels");
    const name = req.name;
    const amount = req.amount
    const occurrence = req.occurrence
    const userId = req.userId;

    const newIncome = new IncomeModel({ name: name, amoun: amount, occurrence: occurrence, userId: userId });

    try {
        await incomeCollection.updateOne(filter, newIncome, { new: false })
            .then(updatedIncome => {
                if (!updatedIncome) {
                    console.log('Document not found');
                } else {
                    console.log('Updated Income document:', updatedIncome);
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



})

// View debt 
router.get('/income/view', async (req, res) => {

    try {
        const db = client.db("test");
        const incomeCollection = db.collection("incomemodels");
        mongoose.createConnection(uri);
        console.log("Connected")
        const filter = { _id: new ObjectId(req._id) }


        await incomeCollection.findOne(filter).then(foundIncome => {
            if (!foundIncome) {
                const responseMessage = 'Income not found';
                return res.json(responseMessage);
            } else {
                console.log('User document:', foundDebt);
                return res.json(foundDebt);
            }
        })
            .catch(error => {
                console.error('Error viewing document:', error.message);
            });



    } catch (error) {

    }

    //check if the data is correct, if so return User
    // return foundUser;

})

// Delete Income 
router.get('/income/delete', async (req, res) => {

    const db = client.db("test");
    const incomeCollection = db.collection("incomemodels");
    mongoose.createConnection(uri);
    console.log("Connected")
    const filter = { _id: new ObjectId(req._id) }


    await incomeCollection.findOneAndDelete(filter).then(foundIncome => {
        if (!foundIncome) {
            const responseMessage = 'Debt not Deleted';
            return res.json(responseMessage);
        } else {
            console.log('User document:', foundDebt);
            return res.json(foundIncome);
        }
    })
        .catch(error => {
            console.error('Error viewing document:', error.message);
        });
})
