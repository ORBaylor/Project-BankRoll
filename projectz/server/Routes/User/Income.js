//const ObjectId = require('mongodb');
const { ObjectId } = require('mongodb');
const { MongoClient, ServerApiVersion } = require('mongodb');

const { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel, debtPayOffTimeFrameModel, CustomDebtModel, customDebtPayOffTimeFrameModel } = require('../../MongoSchema/SchemaModel.js')
const { SortDebtCustom, CustomPayBareMinimum, UpdateMiniMumPayment, AmountAddedToCurrentDebt, FindAmountLeftOver, FindAllCurrentDebt, PayOffRemainingDebt, CheckIfAllDebtsArePaid, CustomDebtPaymentFrame, getTotalIncomeAmount, GetTotalIntrest, calculatePayoffDate, GetTotalPayments, GetMonthlyIntrestRate, PayBareMinimum, DivideIncomeByOurr, ReturnErrorFrame } = require('../../BudgetEngine/HelperFuctions.js');
const mongoose = require('mongoose');


const express = require('express');
const router = express.Router();
//dotenv.config();

//dotenv.config();

const MongoPassword = "Z2c1MFIFYufHRMan"
let uri = `mongodb+srv://dbUser:${MongoPassword}@test.xqxjfvx.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 30000, // Example: Set timeout to 30 seconds
    socketTimeoutMS: 45000,
});

//Creating a new income
router.post('/create', async (req, res) => {

    mongoose.createConnection(uri);
    const db = client.db("test");
    const incomeCollection = db.collection("incomemodels");

    const name = req.body.Name;
    const amount = req.body.Amount
    const occurrence = req.body.Occurrence
    const userId = req.body.UserId;

    const newIncome = new IncomeModel({ name: name, amount: amount, occurrence: occurrence, userId: userId });

    await incomeCollection.insertOne(newIncome).then(income => {
        if (!income) {
            return res.status(500).send('Internal Server Error');
        } else {
            return res.status(200).send(`Debt Created: ${income.insertedId.toString()}`);
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

//Updating Income
router.post('/update', async (req, res) => {

    mongoose.createConnection(uri);
    console.log("Connected")
    const db = client.db("test");
    const incomeCollection = db.collection("incomemodels");
    const incomeId = req.body.IncomeId;
    const filter = { _id: new ObjectId(incomeId) }
    const name = req.body.Name;
    const amount = req.body.Amount
    const occurrence = req.body.Occurrence
    const userId = req.body.UserId;

    //const newIncome = new IncomeModel({ name: name, amoun: amount, occurrence: occurrence, userId: userId });

    try {
        await incomeCollection.updateOne(filter, { $set: { name: name, amount: amount, occurrence: occurrence, userId: userId } }, { new: false })
            .then(updatedIncome => {
                if (!updatedIncome) {
                    console.log('Document not found');
                    return res.sendStatus(500);
                } else {
                    console.log('Updated document:', updatedIncome);
                    return res.sendStatus(200);
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
router.get('/viewAll', async (req, res) => {

    try {
        const db = client.db("test");
        const incomeCollection = db.collection("incomemodels");
        mongoose.createConnection(uri);
        console.log("Connected")
        const userId = req.body.UserId;
        const filter = { userId: userId }

        console.log(filter);

        const incom = new IncomeModel()

        //incom.$where('UserId == 65bb0572e03745f080110f2c' )
        // incomeCollection.find({}, (err, allIncome) => {
        //     if (err) {
        //         console.error('Error finding all incomes:', err);
        //     } else {
        //         console.log('All Tasks:', allIncome);
        //         return res.json(allIncome).sendStatus(200);
        //     }
        // })

        // const incomeCollection = client.db('test').collection('incomemodels');

        const newIncome = incomeCollection.find(filter)

        const IncomeArray = await newIncome.toArray();
        console.log(IncomeArray);

        if (IncomeArray.length > 0) {
            return res.json(IncomeArray).sendStatus(200);
        }
        else {

            return res.status(404).send('Not Found!');
        }


        // await incomeCollection.find({}).then(foundIncome => {
        //     console.log(foundIncome);
        //     if (!foundIncome) {
        //         const responseMessage = 'Income not found';
        //         return res.json(responseMessage);
        //     } else {
        //         console.log('User document:', foundIncome);
        //         // return res.json(foundIncome).sendStatus(200);
        //         return res.sendStatus(200);
        //     }
        // })
        //     .catch(error => {
        //         console.error('Error viewing document:', error.message);
        //     });



    } catch (error) {

    }

    //check if the data is correct, if so return User
    // return foundUser;

})


// View Income
router.get('/view', async (req, res) => {

    try {
        const db = client.db("test");
        const incomeCollection = db.collection("incomemodels");
        mongoose.createConnection(uri);
        console.log("Connected")
        const debtid = req.body.IncomeId;
        const filter = { _id: new ObjectId(debtid) }


        await incomeCollection.findOne(filter).then(foundIncome => {
            if (!foundIncome) {
                const responseMessage = 'Income not found';
                return res.json(responseMessage);
            } else {
                console.log('User document:', foundIncome);
                return res.json(foundIncome);
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
router.delete('/delete', async (req, res) => {

    const db = client.db("test");
    const incomeCollection = db.collection("incomemodels");
    mongoose.createConnection(uri);
    console.log("Connected")
    const debtid = req.body.IncomeId;
    const filter = { _id: new ObjectId(debtid) }



    await incomeCollection.findOneAndDelete(filter).then(foundIncome => {
        if (!foundIncome) {
            const responseMessage = 'Income not Deleted';
            return res.json(responseMessage);
        } else {
            console.log('Income document:', foundIncome);
            return res.sendStatus(200)
        }
    })
        .catch(error => {
            console.error('Error viewing document:', error.message);
        });
})

module.exports = router;