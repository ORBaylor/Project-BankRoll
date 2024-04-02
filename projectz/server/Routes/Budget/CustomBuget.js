const { ObjectId } = require('mongodb');
const { MongoClient, ServerApiVersion } = require('mongodb');

const { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel, debtPayOffTimeFrameModel, CustomDebtModel, customDebtPayOffTimeFrameModel } = require('../../MongoSchema/SchemaModel.js')
const { SortDebtCustom, CheckMethodType, CustomPayBareMinimum, UpdateMiniMumPayment, AmountAddedToCurrentDebt, FindAmountLeftOver, FindAllCurrentDebt, PayOffRemainingDebt, CheckIfAllDebtsArePaid, CustomDebtPaymentFrame, getTotalIncomeAmount, GetTotalIntrest, calculatePayoffDate, GetTotalPayments, GetMonthlyIntrestRate, PayBareMinimum, DivideIncomeByOurr, ReturnErrorFrame } = require('../../BudgetEngine/HelperFuctions.js');
const {CreateBudget,CreateCustomBudget,CreateBudgetFrame,CreateCustomBudgetFrame} = require("../../BudgetEngine/BudgetEngine.js")
const {} = require('../../BudgetEngine/BudgetEngine.js');

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
   
    mongoose.connect(uri);

    //await client.connect();

    const CustomBudgetOutcomeCollection = client.db('test').collection('custombudgetoutcomemodels');

    //Save the id as a var
    const CustomBudgetFrameId = req.body._id;
    //Use the budgetFrameId to get budgetFrame
    const budgetFrame = await getCustomBudetFrame(CustomBudgetFrameId);
   // console.log(budgetFrame.DebtCollection);

    //Use the budgetFrame to create a budget Frame Outcome model
    const newBudetOutcome =  CreateCustomBudget(budgetFrame);
   // console.log(newBudetOutcome);

    await CustomBudgetOutcomeCollection.insertOne(newBudetOutcome).then(newOutcome => {
        if (!newOutcome) {
            return res.status(500).send('Internal Server Error');
        } else {
            return res.status(200).send(`Budget Outcome Created: ${newOutcome.insertedId.toString()}`);
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

})

router.get('/view', async (req, res) => {

    await client.connect();
   
    mongoose.connect(uri);

    //await client.connect();

    const CustomBudgetOutcomeCollection = client.db('test').collection('custombudgetoutcomemodels');

    const budgetFrameId = req.body._id;
    const filter = { _id: new ObjectId(budgetFrameId) }




    await CustomBudgetOutcomeCollection.findOne(filter).then(foundUser => {
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
        const CustomBudgetOutcomeCollection = client.db('test').collection('custombudgetoutcomemodels');
// const budgetFrameId = req.body._id;
      //  const filter = { _id: new ObjectId(budgetFrameId) }
    
        console.log("Connected")
        const userId = req.body.UserId;
        const filter = { UserId: userId }

        console.log(filter);

        const newFrame = CustomBudgetOutcomeCollection.find(filter)
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

    const CustomBudgetOutcomeCollection = client.db('test').collection('custombudgetoutcomemodels');
    const budgetFrameId = req.body._id;
    const filter = { _id: new ObjectId(budgetFrameId) }


    await CustomBudgetOutcomeCollection.findOneAndDelete(filter).then(foundFrame => {
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

async function  getCustomBudetFrame(id)
{
    const goodId = CheckMethodType(id, 'string')
    let returnFrame = new CustomBudgetFrameModel({});

    if(goodId){

        await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
        mongoose.connect(uri);
    
        //await client.connect();
    
        const c_FrameCollection = client.db('test').collection('custombudgetframes');
        const budgetFrameId = id;
        const filter = { _id: new ObjectId(budgetFrameId) }
    
        await c_FrameCollection.findOne(filter).then(foundUser => {
            if (!foundUser) {
                console.log('User not found');
               
    
            } else {
               // console.log('User document:', foundUser);
                returnFrame = foundUser
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
    
        return returnFrame

    }
}

module.exports = router;