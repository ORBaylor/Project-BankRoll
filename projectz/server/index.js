
require('dotenv').config();

const express = require('express');
const connect = require('mongoose')
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel, debtPayOffTimeFrameModel, CustomDebtModel, customDebtPayOffTimeFrameModel } = require('./MongoSchema/SchemaModel.js')
const { SortDebtCustom, CustomPayBareMinimum, UpdateMiniMumPayment, AmountAddedToCurrentDebt, FindAmountLeftOver, FindAllCurrentDebt, PayOffRemainingDebt, CheckIfAllDebtsArePaid, CustomDebtPaymentFrame, getTotalIncomeAmount, GetTotalIntrest, calculatePayoffDate, GetTotalPayments, GetMonthlyIntrestRate, PayBareMinimum, DivideIncomeByOurr, ReturnErrorFrame } = require('./BudgetEngine/HelperFuctions.js');
const mongoose = require('mongoose');
const moment = require('moment');
const createUser = require('../server/Routes/User/CreateUser.js')
const debtt = require('../server/Routes/User/Debt.js')
const incomee = require('../server/Routes/User/Income.js')
const frame = require('./Routes/BudgetFrame/BudgetFrame.js')
const c_frame = require('./Routes/BudgetFrame/CustomBudgetFrame.js')
const budget = require('./Routes/Budget/Budget.js');
const c_budget = require('./Routes/Budget/CustomBuget.js')
const c_debt = require('./Routes/User/CustomDebt.js')


const PORT = process.env.PORT || 3000;



const bodyParser = require('body-parser');
const app = express();
//Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors())
// Define routes and middleware here


//Middleware
//When user logs in the active time will automactilly be updated to the current time 
//Make sure the activeTime is only updated if the user logs in 24 hours after the last active time

//The method that will check if there is a User, if so updated the last active Date
async function UpdateMiddleware(req, res, next) {

    //Check and see if there is an user
    try {

        const MongoPassword = process.env.MONGODB_PASSWORD;

        const uri = process.env.MONGODB_URI;
        console.log(uri);

        const client = new MongoClient(uri, {
            // serverApi: {
            //     version: ServerApiVersion.v1,
            //     strict: true,
            //     deprecationErrors: true,
            // }
        });

        const db = client.db("test");
        const userCollection = db.collection("usermodels");
        mongoose.createConnection(uri);
        console.log("Connected")
        // console.log("userCollection")
        await userCollection.find().toArray().then(foundUser => {
            if (!foundUser) {
                console.log('User Not Made');
                // return res.sendStatus(400);

            } else {
                //If so, check and see if 24 hours has past since the last check login time
                const lastLoginTime = moment(foundUser[0].LastActive).format('YYYY-MM-DD');
                const lastLoginPlusTwentyFour = moment(lastLoginTime).add(1, 'd').format('YYYY-MM-DD');
                const updatedLogin = moment().format('YYYY-MM-DD');
                const userId = foundUser[0]._id
                const filter = { _id: new ObjectId(userId) }
                //Check if 24 hours has past


                if ((moment(`${updatedLogin}`).isAfter(`${lastLoginTime}`, 'day'))) {
                    //Update Lastactive 
                    console.log("Inside Moment if statement")

                    userCollection.updateOne(filter, { $set: { LastActive: updatedLogin } }, { new: false })
                        .then(updatedDocument => {
                            console.log("updatedDocument")
                            if (!updatedDocument) {
                                console.log('Document not found');

                            } else {
                                console.log('Updated document:', updatedDocument);
                                //Some how log that the User active date 
                            }
                        })
                        .catch(error => {
                            console.error('Error updating document:', error.message);
                        });


                }
                else {
                    //it Is not time to update 
                    console.log("ELSE");
                }
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
        console.log(error)
        next();
    }

    next()

}

app.use(UpdateMiddleware)
//Directing routes
app.use('/api/user', createUser);
app.use('/api/debt', debtt);
app.use('/api/income', incomee);
app.use('/api/frame', frame);
app.use('/api/budget', budget);
app.use('/api/c_frame', c_frame);
app.use('/api/c_budget', c_budget);
app.use('/api/c_debt', c_debt);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

