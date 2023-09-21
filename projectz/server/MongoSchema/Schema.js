import mongoose from 'mongoose';
import { boolean } from 'webidl-conversions';
const { Schema } = mongoose;

const settingSchema = new Schema({

        //User-specific settings and preferences, such as currency format, 
        //time zone, language, and notification preferences.

})

const userSchema = new Schema({
    Name: String,
    UserName: String,
   ContactInformation: {
    EmailAdress: String,
    PhoneNumber: Number
   }


})

const debtSchema = new Schema({
    name: String,
    creditorName: String,
    intrestRate: Number,
    minumnPayment: Number,
    monthlyPayment: Number,
    payedOff: Boolean,
    deDate: {type: Date, default: Date.now()}
})

const incomeSchema = new Schema({

    name: String,
    aount: String,
    occurrence: String, //'weekly' | 'bi-weekly' | 'semi-annually' | 'annually'


})

const customPayOffOptions = new Schema({

    payMore: Boolean,
    payLess: Boolean,
    PaffOff: Boolean,
    payMorePercent:  Number,
    payLessPercent: Number,

})

const budgetFrame = new Schema({

   
    useIncomeCollection: Boolean,
    payOffStyle: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    DebtCollection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Debt'
          },
    ],
    IncomeCollection: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Income'
       },
   ]


})

const customBudgetFrame = new Schema({

    payOffStyle: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    customPayOffOptions: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomPayOffOptions'
    },
    DebtCollection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Debt'
          },
    ],
    IncomeCollection: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Income'
        },
    ]


})

const budgetOutcome = new Schema({

        daysUntilAllDebtPayedOff: Number,



})

const customBudgetOutcome = new Schema({


})