const { ObjectId } = require('mongodb');
const { MongoClient, ServerApiVersion } = require('mongodb');

const { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel, debtPayOffTimeFrameModel, CustomDebtModel, customDebtPayOffTimeFrameModel } = require('../../MongoSchema/SchemaModel.js')
const { SortDebtCustom, CustomPayBareMinimum, UpdateMiniMumPayment, AmountAddedToCurrentDebt, FindAmountLeftOver, FindAllCurrentDebt, PayOffRemainingDebt, CheckIfAllDebtsArePaid, CustomDebtPaymentFrame, getTotalIncomeAmount, GetTotalIntrest, calculatePayoffDate, GetTotalPayments, GetMonthlyIntrestRate, PayBareMinimum, DivideIncomeByOurr, ReturnErrorFrame } = require('../../BudgetEngine/HelperFuctions.js');
const {CreateBudget,CreateCustomBudget,CreateBudgetFrame,CreateCustomBudgetFrame} = require('../../BudgetEngine/BudgetEngine.js')

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

router.post('/create', async (req, res) => {

    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");

    mongoose.connect(uri);

    //await client.connect();

    const c_FrameCollection = client.db('test').collection('custombudgetframes');
    //console.log(req.body)


    const c_frame = CreateCustomBudgetFrame(req.body);   
    
    console.log(c_frame)

    const newFrame = new CustomBudgetFrameModel({UserId: c_frame.UserId, DebtCollection: c_frame.DebtCollection, IncomeCollection: c_frame.IncomeCollection, payOffStyle: c_frame.payOffStyle, useLeftOver: c_frame.useLeftOver })

    await c_FrameCollection.insertOne(newFrame).then(insertedFrame => {
        if (!insertedFrame) {
            return res.status(500).send('Internal Server Error');
        } else {
            console.log(insertedFrame);
            return res.status(200).send(`Frame Created: ${insertedFrame.insertedId.toString()}`);
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

router.post('/update', async (req, res) => {

    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");

    mongoose.connect(uri);

    //await client.connect();

    const c_FrameCollection = client.db('test').collection('custombudgetframes');
    const budgetFrameId = req.body._id;
    const filter = { _id: new ObjectId(budgetFrameId) }
    //const updatedFrame = new budgetFrameModel({})
    const UpdatedPayOffStyle = req.body.PayOffStyle;
    const UpdatedLeftOver = req.body.UseLeftOver;
    
    await c_FrameCollection.updateOne(filter, { $set: { payOffStyle: UpdatedPayOffStyle, useLeftOver: UpdatedLeftOver } }, { new: false })
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


})

router.get('/view', async (req, res) => {

    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");

    mongoose.connect(uri);

    //await client.connect();

    const c_FrameCollection = client.db('test').collection('custombudgetframes');
    const budgetFrameId = req.body._id;
    const filter = { _id: new ObjectId(budgetFrameId) }

    await c_FrameCollection.findOne(filter).then(foundUser => {
        if (!foundUser) {
            console.log('User not found');
            return res.sendStatus(400);

        } else {
            console.log('User document:', foundUser);
            return res.send(foundUser).status(200);
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


})

router.get('/viewAll', async (req, res) => {

    try {
        const c_FrameCollection = client.db('test').collection('custombudgetframes');
       // const budgetFrameId = req.body._id;
      //  const filter = { _id: new ObjectId(budgetFrameId) }
    
        console.log("Connected")
        const userId = req.body.UserId;
        const filter = { userId: userId }

        console.log(filter);

        const newFrame = c_FrameCollection.find(filter)
        const frameArray = await newFrame.toArray();
        console.log(frameArray);

        if (frameArray.length > 0) {
            return res.json(frameArray).sendStatus(200);
        }
        else {

            return res.status(404).send('Not Found!');
        }

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

router.delete('/delete', async (req, res) => {

    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");

    mongoose.connect(uri);

    //await client.connect();

    const c_FrameCollection = client.db('test').collection('custombudgetframes');
    const budgetFrameId = req.body._id;
    const filter = { _id: new ObjectId(budgetFrameId) }


    await c_FrameCollection.findOneAndDelete(filter).then(foundFrame => {
        if (!foundFrame) {
            const responseMessage = 'Debt not Deleted';
            return res.json(responseMessage);
        } else {
            console.log('User document:', foundFrame);
            return res.sendStatus(200)
        }
    })
        .catch(error => {
            console.error('Error viewing document:', error.message);
        });
    
        mongoose.disconnect()
        .then(() => {
            console.log('Disconnected from MongoDB');
        })
        .catch((error) => {
            console.error('Error disconnecting from MongoDB:', error);
        });
 
})

module.exports = router;