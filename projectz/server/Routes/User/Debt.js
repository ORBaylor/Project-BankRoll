
//const ObjectId = require('mongodb');
const { ObjectId } = require('mongodb');
const { MongoClient, ServerApiVersion } = require('mongodb');

const { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel, debtPayOffTimeFrameModel, CustomDebtModel, customDebtPayOffTimeFrameModel } = require('../../MongoSchema/SchemaModel.js')
const { SortDebtCustom, CustomPayBareMinimum, UpdateMiniMumPayment, AmountAddedToCurrentDebt, FindAmountLeftOver, FindAllCurrentDebt, PayOffRemainingDebt, CheckIfAllDebtsArePaid, CustomDebtPaymentFrame, getTotalIncomeAmount, GetTotalIntrest, calculatePayoffDate, GetTotalPayments, GetMonthlyIntrestRate, PayBareMinimum, DivideIncomeByOurr, ReturnErrorFrame } = require('../../BudgetEngine/HelperFuctions.js');
const mongoose = require('mongoose');


const express = require('express');
const router = express.Router();
//dotenv.config();

const MongoPassword = process.env.MONGODB_PASSWORD;
let uri = `mongodb+srv://dbUser:${MongoPassword}@test.xqxjfvx.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 30000, // Example: Set timeout to 30 seconds
    socketTimeoutMS: 45000,
});

//Creating a new debt
router.post('/create', async (req, res) => {

    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");

    mongoose.connect(uri);

    //await client.connect();

    const debtCollection = client.db('test').collection('debtmodels');


    //mongoose.createConnection(uri);

    const creditorName = req.body.CreditorName;
    const originallDebtAmount = req.body.OriginalDebtAmount;
    const currentDebtAmount = req.body.CurrentDebtAmount;
    const intrestRate = req.body.IntrestRate;
    const originalMinumnPayment = req.body.OriginalMinumnPayment;
    const minumnPayment = req.body.MinumnPayment;
    const userId = req.body.UserId;
    const payedOff = req.body.IsPayedOff
    const dueDate = req.body.DueDate;
    const newDebt = new DebtModel({ creditorName: creditorName, isPayedOff: payedOff , currentDebtAmount: currentDebtAmount, intrestRate: intrestRate, originalMinumnPayment: originalMinumnPayment, originallDebtAmount: originallDebtAmount, minumnPayment: minumnPayment, userId: userId, dueDate: dueDate })

    await debtCollection.insertOne(newDebt).then(newDebt).then(newDebt => {
        if (!newDebt) {
            return res.status(500).send('Internal Server Error');
        } else {
            return res.status(200).send(`Debt Created: ${newDebt.insertedId.toString()}`);
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
router.post('/update', async (req, res) => {

    mongoose.createConnection(uri);
    const db = client.db("test");
    const debtCollection = db.collection("debtmodels");
    console.log("Connected")
    const userId = req.body.Debt_id;
    const filter = { _id: new ObjectId(userId) }
    const creditorName = req.body.CreditorName;
    const originallDebtAmount = req.body.OriginallDebtAmount;
    const currentDebtAmount = req.body.CurrentDebtAmount;
    const intrestRate = req.body.IntrestRate;
    const originalMinumnPayment = req.body.OriginalMinumnPayment;
    const minumnPayment = req.body.MinumnPayment;

    const dueDate = req.body.DueDate;
    const newDebt = new DebtModel({ creditorName: creditorName, originallDebtAmount: originallDebtAmount, currentDebtAmount: currentDebtAmount, intrestRate: intrestRate, originalMinumnPayment: originalMinumnPayment, originallDebtAmount: originallDebtAmount, minumnPayment: minumnPayment, userId: userId, dueDate: dueDate })


    try {

        await debtCollection.updateOne(filter, { $set: { creditorName: creditorName, originallDebtAmount: originallDebtAmount, currentDebtAmount: currentDebtAmount, intrestRate: intrestRate, originalMinumnPayment: originalMinumnPayment, originallDebtAmount: originallDebtAmount, minumnPayment: minumnPayment, userId: userId, dueDate: dueDate } }, { new: false })
            .then(updatedDocument => {
                if (!updatedDocument) {
                    console.log('Document not found');
                    return res.sendStatus(500);
                } else {
                    console.log('Updated document:', updatedDocument);
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
router.get('/view', async (req, res) => {

    try {
        const db = client.db("test");
        const debtCollection = db.collection("debtmodels");
        mongoose.createConnection(uri);
        console.log("Connected")
        const filter = { _id: new ObjectId(req.body._id) }
        console.log(filter);

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

//View all Debts
router.get('/viewAll', async (req, res) => {

    try {
        const db = client.db("test");
        const debtCollection = db.collection("debtmodels");
        mongoose.createConnection(uri);
        console.log("Connected")
        const userId = req.body.UserId;
        const filter = { userId: userId }

        console.log(filter);

        const newDebt = debtCollection.find(filter)
        const DebtArray = await newDebt.toArray();
        console.log(DebtArray);

        if (DebtArray.length > 0) {
            return res.json(DebtArray).sendStatus(200);
        }
        else {

            return res.status(404).send('Not Found!');
        }




    } catch (error) {

    }

    //check if the data is correct, if so return User
    // return foundUser;

})

// Delete debt 
router.delete('/delete', async (req, res) => {

    const db = client.db("test");
    const debtCollection = db.collection("debtmodels");
    mongoose.createConnection(uri);
    console.log("Connected")
    const filter = { _id: new ObjectId(req.body._id) }


    await debtCollection.findOneAndDelete(filter).then(foundDebt => {
        if (!foundDebt) {
            const responseMessage = 'Debt not Deleted';
            return res.json(responseMessage);
        } else {
            console.log('User document:', foundDebt);
            return res.sendStatus(200)
        }
    })
        .catch(error => {
            console.error('Error viewing document:', error.message);
        });
})

module.exports = router;