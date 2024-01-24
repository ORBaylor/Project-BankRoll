import { MongoClient, ObjectId } from "mongodb";
import * as dotenv from "dotenv";
import { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel, debtPayOffTimeFrameModel, CustomDebtModel, customDebtPayOffTimeFrameModel } from '../MongoSchema/SchemaModel.js'
import { SortDebtCustom, CustomPayBareMinimum, UpdateMiniMumPayment, AmountAddedToCurrentDebt, FindAmountLeftOver, FindAllCurrentDebt, PayOffRemainingDebt, CheckIfAllDebtsArePaid, CustomDebtPaymentFrame, getTotalIncomeAmount, GetTotalIntrest, calculatePayoffDate, GetTotalPayments, GetMonthlyIntrestRate, PayBareMinimum, DivideIncomeByOurr, ReturnErrorFrame } from '../BudgetEngine/HelperFuctions.js'
import { mongoose } from "mongoose";
//const express = require('express');
//const router = express.Router();
import { Router, express } from "express";
import { router } from "express";
dotenv.config();

const MongoPassword = "Z2c1MFIFYufHRMan"
let uri = `mongodb+srv://dbUser:${MongoPassword}@test.xqxjfvx.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 30000, // Example: Set timeout to 30 seconds
    socketTimeoutMS: 45000,
});

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
            console.log("New Debt: " + newDebt)
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