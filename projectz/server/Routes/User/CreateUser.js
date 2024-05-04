const express = require('express');
const { ObjectId } = require('mongodb');
const { MongoClient, ServerApiVersion } = require('mongodb');

const { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel, debtPayOffTimeFrameModel, CustomDebtModel, customDebtPayOffTimeFrameModel } = require('../../MongoSchema/SchemaModel.js')
const { SortDebtCustom, CustomPayBareMinimum, UpdateMiniMumPayment, AmountAddedToCurrentDebt, FindAmountLeftOver, FindAllCurrentDebt, PayOffRemainingDebt, CheckIfAllDebtsArePaid, CustomDebtPaymentFrame, getTotalIncomeAmount, GetTotalIntrest, calculatePayoffDate, GetTotalPayments, GetMonthlyIntrestRate, PayBareMinimum, DivideIncomeByOurr, ReturnErrorFrame } = require('../../BudgetEngine/HelperFuctions.js');
const mongoose = require('mongoose');
const { json } = require('body-parser');
const router = express.Router();

const uri = process.env.MONGODB_URI;



const client = new MongoClient(uri, {
    // serverApi: {
    //     version: ServerApiVersion.v1,
    //     strict: true,
    //     deprecationErrors: true,
    // }
});


//Create a user
router.post('/create', async (req, res) => {



    const firstName = req.body.FirstName;
    const lastname = req.body.LastName;
    const userName = req.body.UserName;
    const password = req.body.Password;
    const emailAdress = req.body.ContactInformation.EmailAdress;
    const phoneNumber = req.body.ContactInformation.PhoneNumber;
    const lastActive = req.body.LastActive





    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        mongoose.connect(uri);

        const usersCollection = client.db('test').collection('usermodels');

        await usersCollection.insertOne({ FirstName: firstName, LastName: lastname, UserName: userName, Password: password, LastActive: lastActive, ContactInformation: { EmailAdress: emailAdress, PhoneNumber: phoneNumber } }).then((newUser) => {

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
    const userId = req.body._id;
    const firstName = req.body.FirstName;
    const lastname = req.body.LastName;
    const userName = req.body.UserName;
    const password = req.body.Password;
    const emailAdress = req.body.ContactInformation.EmailAdress;
    const phoneNumber = req.body.ContactInformation.PhoneNumber;


    mongoose.createConnection(uri);
    const filter = { _id: new ObjectId(userId) }

    try {

        await client.connect();
        mongoose.connect(uri);
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