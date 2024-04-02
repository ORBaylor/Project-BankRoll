const { ObjectId } = require('mongodb');
const { MongoClient, ServerApiVersion } = require('mongodb');

const { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel, debtPayOffTimeFrameModel, CustomDebtModel, customDebtPayOffTimeFrameModel } = require('../../MongoSchema/SchemaModel.js')
const { CheckMethodType, SortDebtCustom, CustomPayBareMinimum, UpdateMiniMumPayment, AmountAddedToCurrentDebt, FindAmountLeftOver, FindAllCurrentDebt, PayOffRemainingDebt, CheckIfAllDebtsArePaid, CustomDebtPaymentFrame, getTotalIncomeAmount, GetTotalIntrest, calculatePayoffDate, GetTotalPayments, GetMonthlyIntrestRate, PayBareMinimum, DivideIncomeByOurr, ReturnErrorFrame } = require('../../BudgetEngine/HelperFuctions.js');
const { CreateBudget, CreateCustomBudget, CreateBudgetFrame, CreateCustomBudgetFrame } = require("../../BudgetEngine/BudgetEngine.js")
const mongoose = require('mongoose');

const moment = require('moment');
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

    const budgetOutcomeCollection = client.db('test').collection('budgetoutcomemodel');

    //Save the id as a var
    const budgetFrameId = req.body._id;
    //Use the budgetFrameId to get budgetFrame
    const budgetFrame = await getBudetFrame(budgetFrameId);

    //Use the budgetFrame to create a budget Frame Outcome model
    const newBudetOutcome = CreateBudget(budgetFrame);

    await budgetOutcomeCollection.insertOne(newBudetOutcome).then(newOutcome => {
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


    // console.log(newBudetOutcome)


})

//Will be used to update debt pay off
router.post('/update', async (req, res) => {

    //Get the BudgetOutComeModel ID
    //Get the aamount of months it has been since the user last logged in. 

    //CREATE A METHOD THAT WILL TAKE TWO ARGS AND RETURN AN UPDATED BUDETOUTCOME

    //Save new BudgetOutComeModels

    let currentBudgetOutcomeModel = new BudgetOutcomeModel;



    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");

    mongoose.connect(uri);

    //await client.connect();

    const budgetOutcomeCollection = client.db('test').collection('budgetoutcomemodel');
    const budgetFrameId = req.body._id;
    const numMonths = req.body.NumberOfMonth;
    const currentDate = moment().format(req.body.CurrentDate);
    //console.log("currentDate: "+currentDate)

    //Get updated BudetOutCome 
    currentBudgetOutcomeModel = await UpdateBudgetOutcome(budgetFrameId, numMonths, currentDate);
    // console.log("currentBudgetOutcomeModel: " +currentBudgetOutcomeModel.DebtPayOffArray)

    currentBudgetOutcomeModel.DebtPayOffArray.forEach((arry) => {
        console.log(arry);
    })
    const filter = { _id: new ObjectId(budgetFrameId) }
    //const updatedFrame = new budgetFrameModel({})

    const isActive = req.body.IsActive





    // await budgetOutcomeCollection.updateOne(filter, { $set: { DebtPayOffArray: currentBudgetOutcomeModel.DebtPayOffArray, isActive: isActive  } }, { new: false })
    //         .then(updatedDocument => {
    //             if (!updatedDocument) {
    //                 console.log('Document not found');
    //                 return res.sendStatus(500);
    //             } else {
    //                 console.log('Updated document:', updatedDocument);
    //                 return res.sendStatus(200)
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error updating document:', error.message);
    //         });
    //  mongoose.disconnect()
    //         .then(() => {
    //             console.log('Disconnected from MongoDB');
    //         })
    //         .catch((error) => {
    //             console.error('Error disconnecting from MongoDB:', error);
    //         });

})

router.get('/view', async (req, res) => {

    await client.connect();

    mongoose.connect(uri);

    //await client.connect();

    const budgetOutcomeCollection = client.db('test').collection('budgetoutcomemodel');
    const budgetFrameId = req.body._id;
    const filter = { _id: new ObjectId(budgetFrameId) }




    await budgetOutcomeCollection.findOne(filter).then(foundUser => {
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
        const budgetOutcomeCollection = client.db('test').collection('budgetoutcomemodel');
        // const budgetFrameId = req.body._id;
        //  const filter = { _id: new ObjectId(budgetFrameId) }

        console.log("Connected")
        const userId = req.body.UserId;
        const filter = { UserId: userId }

        console.log(filter);

        const newFrame = budgetOutcomeCollection.find(filter)
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

    const budgetOutcomeCollection = client.db('test').collection('budgetoutcomemodel');
    const budgetFrameId = req.body._id;
    const filter = { _id: new ObjectId(budgetFrameId) }


    await budgetOutcomeCollection.findOneAndDelete(filter).then(foundFrame => {
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function UpdateBudgetOutcome(modelId, numOfMonths, currentDate) {

    //Get the BudgetOutComeModel
    let currentBudgetOutcomeModel = new BudgetOutcomeModel;

    currentBudgetOutcomeModel = await getBudetOutcomeFrame(modelId);
    const currentTime = moment().format('YYYY-MM-DD');

    currentBudgetOutcomeModel.DebtPayOffArray.forEach(currentBudgetModel => {

        if (currentBudgetModel.isPayedOff == false) {


            //Get the minimum payment and save it as a var
            const currentMinPayment = currentBudgetModel.MinimumPayment

            //Get the totalPaymentsLeft and save it as a var
            let currentPaymentsLeft = currentBudgetModel.paymentsLeft;

            //Get the original debt Amount 
            let currentOriginalDebt = currentBudgetModel.originalDebtAmount

            //Get the current debt Amount
            let currentDebt = currentBudgetModel.currentDebtAmount;

            //Get isPayedOff and save it as a var
            let isPayedOff = currentBudgetModel.isPayedOff;

            // console.log(" Parse: "+ moment(currentBudgetModel.PaymentDate).format().substring(0,10));
            //Current Payment Date
            let datenow = String(currentBudgetModel.PaymentDate).substring(0, 10);


            // console.log("currentBudgetModel.PaymentDate:" +currentBudgetModel.PaymentDate)
            let currentPaymentDate = moment(currentBudgetModel.PaymentDate).format().substring(0, 10);
            const currentDateVar = moment().format(currentDate);



            // console.log( "  Name: " + currentBudgetModel.creditorName)
            //If only one month has passed
            if (numOfMonths == 1) {
                //  console.log("currentPaymentDate: "+ currentPaymentDate.valueOf())
                // console.log("currentDateVar: "+ currentDateVar.valueOf())
                // if(moment(currentPaymentDate).isSameOrAfter(currentDateVar, 'month')){
                if (currentDateVar.valueOf() >= currentPaymentDate.valueOf()) {
                    //subtract the current Minimum Monthly payment from the current current debt amount
                    // console.log("Made it inside if");
                    currentDebt = (currentDebt - currentMinPayment);

                    //subtract 1 from the payments left
                    currentPaymentsLeft = (currentPaymentsLeft - numOfMonths);

                    //Check and see if the debt is payed off and set the isPayedOff var.
                    if (currentDebt <= 0) {
                        currentBudgetModel.isPayedOff = true;
                        currentDebt = 0;
                        currentBudgetModel.currentDebtAmount = currentDebt;
                        currentBudgetModel.paymentsLeft = 0;
                        currentBudgetModel.PaymentDate = moment().format()
                        console.log("currentPaymentDate: " + currentPaymentDate)
                    } else {
                        //Add one month from the Payment date
                        // currentPaymentDate = moment(currentPaymentDate).add(1, 'm').format();
                        console.log("currentPaymentDate Before: " + currentPaymentDate + "  Name" + currentBudgetModel.creditorName)
                        // currentPaymentDate = moment(currentPaymentDate).year(1).format('YYYY-MM-DD');
                        currentPaymentDate = moment(currentPaymentDate).add(1, 'M').format('YYYY-MM-DD');
                        console.log("currentPaymentDate After: " + currentPaymentDate + "  Name" + currentBudgetModel.creditorName)
                        currentBudgetModel.currentDebtAmount = currentDebt;
                        currentBudgetModel.PaymentDate = currentPaymentDate;
                        currentBudgetModel.paymentsLeft = currentPaymentsLeft;
                        currentBudgetModel.isPayedOff = false;
                    }



                } else {

                    //Not time to update debt

                }



            } else if (numOfMonths > 1) {

                // if(moment(currentPaymentDate).isSameOrAfter(currentDateVar)){
                try {
                    if (currentDateVar.valueOf() >= currentPaymentDate.valueOf()) {

                        const subtractAmount = (currentMinPayment * numOfMonths);

                        currentDebt = (currentDebt - subtractAmount);

                        currentPaymentsLeft = (currentPaymentsLeft - numOfMonths);

                        //Check and see if the debt is payed off and set the isPayedOff var.
                        // if(currentDebt <= 0){
                        //     currentBudgetModel.isPayedOff = true;
                        //     currentDebt = 0;
                        // }else{


                        //     //Add one month from the Payment date
                        //     currentBudgetModel.currentDebtAmount = currentDebt;
                        //     currentPaymentDate = moment(currentPaymentDate).add(numOfMonths, 'm').format();
                        //     currentBudgetModel.PaymentDate = currentPaymentDate;
                        //     currentBudgetModel.isPayedOff = false;
                        // }

                        if (currentDebt <= 0) {
                            currentBudgetModel.isPayedOff = true;
                            currentDebt = 0;
                            currentBudgetModel.currentDebtAmount = currentDebt;
                            currentBudgetModel.paymentsLeft = 0;
                            currentBudgetModel.PaymentDate = moment().format();
                            console.log("Payed off")
                        } else {
                            //Add one month from the Payment date
                            // console.log("currentPaymentDate Before: " + currentPaymentDate+ "  Name: " + currentBudgetModel.creditorName)
                            // currentPaymentDate = moment(currentPaymentDate).year(1).format('YYYY-MM-DD');
                            if (moment().isAfter(currentPaymentDate)) {
                                console.log("IsAfter");
                            } else {
                                console.log("Is Not After");
                            }
                            currentPaymentDate = moment(currentPaymentDate).add(numOfMonths, 'M').format('YYYY-MM-DD');
                            //  console.log("currentPaymentDate After: " + currentPaymentDate + "  Name: " + currentBudgetModel.creditorName)
                            currentBudgetModel.currentDebtAmount = currentDebt;
                            currentBudgetModel.PaymentDate = currentPaymentDate;
                            currentBudgetModel.paymentsLeft = currentPaymentsLeft;
                            currentBudgetModel.isPayedOff = false;
                        }

                    } else {

                        //Not time to update debt
                    }
                } catch (error) {
                    console.log(error.message)
                }

            } else {
                //Has not been a month
            }
        }
        else {

            //The debt is payed off, nothing to do. 
        }




    });





    //return updated BudgetOutComeModel
    return currentBudgetOutcomeModel;

}

//Id 
async function getBudetFrame(id) {
    const goodId = CheckMethodType(id, 'string')
    let returnFrame = new budgetFrameModel({});

    if (goodId) {

        await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");

        mongoose.connect(uri);

        //await client.connect();

        const frameCollection = client.db('test').collection('budgetframemodels');
        const budgetFrameId = id;
        const filter = { _id: new ObjectId(budgetFrameId) }

        await frameCollection.findOne(filter).then(foundUser => {
            if (!foundUser) {
                console.log('User not found');
                //return res.sendStatus(400);

            } else {

                returnFrame = foundUser;
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

async function getBudetOutcomeFrame(id) {
    const goodId = CheckMethodType(id, 'string')
    let returnFrame = new BudgetOutcomeModel({});

    if (goodId) {

        await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");

        mongoose.connect(uri);

        //await client.connect();

        const frameCollection = client.db('test').collection('budgetoutcomemodel');
        const budgetFrameId = id;
        const filter = { _id: new ObjectId(budgetFrameId) }

        await frameCollection.findOne(filter).then(foundUser => {
            if (!foundUser) {
                console.log('User not found');
                //return res.sendStatus(400);

            } else {

                returnFrame = foundUser;
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

//Returns how many months have passed.
function GetMonths(startDate, endDate) {
    const startMoment = moment(startDate);
    const endMoment = moment(endDate);

    return endMoment.diff(startMoment, 'months');
}
//Return the last IsActive time
async function ReturnActiveTime() {

    let lastActive = '';
    try {
        const db = client.db("test");
        const userCollection = db.collection("usermodels");
        mongoose.createConnection(uri);
        console.log("Connected")
        // const filter = { _id: new ObjectId(req.body._id) }


        await userCollection.find().then(foundUser => {
            if (!foundUser) {
                console.log('User not found');
                //return res.sendStatus(400);
                lastActive = moment().format('YYYY-MM-DD');
            } else {
                console.log('User document:', foundUser);
                // res.send(foundUser)
                lastActive = moment(foundUser.LastActive).format('YYYY-MM-DD')
            }
        }).catch(error => {
            console.error('Error updating document:', error.message);
        });




    } catch (error) {

    }

    return lastActive;

}
module.exports = router;