
//const ObjectId = require('mongodb');
const { ObjectId } = require('mongodb');
const { MongoClient, ServerApiVersion } = require('mongodb');

const { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel, debtPayOffTimeFrameModel, CustomDebtModel, customDebtPayOffTimeFrameModel } = require('../../MongoSchema/SchemaModel.js')
const { SortDebtCustom, CustomPayBareMinimum, UpdateMiniMumPayment, AmountAddedToCurrentDebt, FindAmountLeftOver, FindAllCurrentDebt, PayOffRemainingDebt, CheckIfAllDebtsArePaid, CustomDebtPaymentFrame, getTotalIncomeAmount, GetTotalIntrest, calculatePayoffDate, GetTotalPayments, GetMonthlyIntrestRate, PayBareMinimum, DivideIncomeByOurr, ReturnErrorFrame } = require('../../BudgetEngine/HelperFuctions.js');
const mongoose = require('mongoose');


const express = require('express');
const router = express.Router();
//dotenv.config();

const MongoPassword = "Z2c1MFIFYufHRMan"
let uri = `mongodb+srv://dbUser:${MongoPassword}@test.xqxjfvx.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 30000, // Example: Set timeout to 30 seconds
    socketTimeoutMS: 45000,
});

//Creating a new debt
router.get('/debt/create', async (req, res) => {

    const db = client.db("test");
    const debtCollection = db.collection("debtmodels");
    mongoose.createConnection(uri);

    const creditorName = req.creditorName;
    const originallDebtAmount = req.originallDebtAmount;
    const currentDebtAmount = req.currentDebtAmount;
    const intrestRate = req.intrestRate;
    const originalMinumnPayment = req.originalMinumnPayment;
    const minumnPayment = req.minumnPayment;
    const userId = req.userId;
    const dueDate = req.dueDate;
    const newDebt = new DebtModel({ creditorName: creditorName, originallDebtAmount: originallDebtAmount, currentDebtAmount: currentDebtAmount, intrestRate: intrestRate, originalMinumnPayment: originalMinumnPayment, originallDebtAmount: originallDebtAmount, minumnPayment: minumnPayment, userId: userId, dueDate: dueDate })

    const insertedDebt = await debtCollection.insertOne(newDebt).then(newDebt).then(newDebt => {
        if (!newDebt) {
            console.log("Debt now found");
        } else {
            console.log("New Debt: " + newDebt.insertedId._id.toString())
            res.json(newDebt.insertedId)

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
router.post('/debt/update', async (req, res) => {

    mongoose.createConnection(uri);
    const db = client.db("test");
    const debtCollection = db.collection("debtmodels");
    console.log("Connected")
    const userId = req.userId;
    const filter = { _id: new ObjectId(userId) }
    const creditorName = req.creditorName;
    const originallDebtAmount = req.originallDebtAmount;
    const currentDebtAmount = req.currentDebtAmount;
    const intrestRate = req.intrestRate;
    const originalMinumnPayment = req.originalMinumnPayment;
    const minumnPayment = req.minumnPayment;

    const dueDate = req.dueDate;

    const newDebt = new DebtModel({ creditorName: creditorName, originallDebtAmount: originallDebtAmount, currentDebtAmount: currentDebtAmount, intrestRate: intrestRate, originalMinumnPayment: originalMinumnPayment, originallDebtAmount: originallDebtAmount, minumnPayment: minumnPayment, userId: userId, dueDate: dueDate })


    try {
        await debtCollection.updateOne(filter, newDebt, { new: false })
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



})

// View debt 
router.get('/debt/view', async (req, res) => {

    try {
        const db = client.db("test");
        const debtCollection = db.collection("debtCollection");
        mongoose.createConnection(uri);
        console.log("Connected")
        const filter = { _id: new ObjectId(req._id) }


        await debtCollection.findOne(filter).then(foundDebt => {
            if (!foundDebt) {
                const responseMessage = 'Debt not found';
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

// Delete debt 
router.get('/debt/delete', async (req, res) => {

    const db = client.db("test");
    const debtCollection = db.collection("debtCollection");
    mongoose.createConnection(uri);
    console.log("Connected")
    const filter = { _id: new ObjectId(req._id) }


    await debtCollection.findOneAndDelete(filter).then(foundDebt => {
        if (!foundDebt) {
            const responseMessage = 'Debt not Deleted';
            return res.json(responseMessage);
        } else {
            console.log('User document:', foundDebt);
            return res.json(foundDebt);
        }
    })
        .catch(error => {
            console.error('Error viewing document:', error.message);
        });
})

module.exports = router;