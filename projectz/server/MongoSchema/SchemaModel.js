import mongoose from 'mongoose';
import { boolean } from 'webidl-conversions';
const { Schema } = mongoose;

const settingSchema = new Schema({

    //User-specific settings and preferences, such as currency format, 
    //time zone, language, and notification preferences.

    //Make a setting that will change the graph that the user is shown
    //Maybe use an int? 
    //1=Pie
    //2=Bar

})
export const SettingsModel = mongoose.model('SettingsModel', settingSchema)

const userSchema = new Schema({
    FirstName: String,
    LastName: String,
    UserName: String,
    Password: String,
    ContactInformation: {
        EmailAdress: String,
        PhoneNumber: String
    }


})
export let UserModel = mongoose.model('UserModel', userSchema)

const PayUserSchema = new Schema({
    isUserPaid: Boolean,
    payPercent: Number,
    payAmount: Number
})
let PayUserModel = mongoose.model('PayUserModel', PayUserSchema)

const debtSchema = new Schema({

    creditorName: String,
    originalDebtAmount: Number,
    currentDebtAmount: Number,
    intrestRate: Number,
    originalMinumnPayment: Number,
    minumnPayment: Number,
    isPayedOff: Boolean,
    dueDate: { type: Date, default: Date.now() },


})
export let DebtModel = mongoose.model('DebtModel', debtSchema)

const CustomDebtSchema = new Schema({

    creditorName: String,
    originalDebtAmount: Number,
    currentDebtAmount: String,
    percentOfIncome: Number,
    amountLeftOver: Number,
    isPayedOff: Boolean,

    // dueDate: {type: Date, default: Date.now()},


})
export let CustomDebtModel = mongoose.model('DebtModel', debtSchema)

const incomeSchema = new Schema({

    name: String,
    amount: Number,
    occurrence: String, //'weekly' | 'bi-weekly' | 'semi-annually' | 'annually'


})
export let IncomeModel = mongoose.model('IncomeModel', incomeSchema)

const customPayOffOptions = new Schema({

    payMore: Boolean,
    payLess: Boolean,
    PaffOff: Boolean,
    payMorePercent: Number,
    payLessPercent: Number,

})
let CustomPayOffOptionsModel = mongoose.model('CustomPayOffOptionsModel', customPayOffOptions)

let budgetFrame = new Schema({

    user_id: String,
    DebtCollection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DebtModel'
        },
    ],
    IncomeCollection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'IncomeModel'
        },
    ],
    //Use the minimum payment the user set in the debt 
    //to pay off the debt
    //useMinimumPayment: Boolean,

    //Use the Monthly payment the user set in the debt
    //to pay off the debt
    // useMonthlyPayment: Boolean,

    // useIncomeCollection: Boolean,
    payOffStyle: String,

    //The Date the user would like to have there dabt payed off,
    //Check and see if the user can pay off the debt by the date
    // PayOffDate: Date,




})
export let budgetFrameModel = mongoose.model('budgetFrameModel', budgetFrame)

const customBudgetFrame = new Schema({

    payOffStyle: String,
    useLeftOver: Boolean,
    user_id: String,
    // customPayOffOption: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'CustomPayOffOptionsModel'
    // },
    DebtCollection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DebtModel'
        },
    ],
    IncomeCollection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'IncomeModel'
        },
    ],



})
export let CustomBudgetFrameModel = mongoose.model('customBudgetFrame', customBudgetFrame)

const budgetOutcome = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    //A Key value pair of the debts and 
    //when they will be payed off
    // daysUntilAllDebtPayedOff: Map,

    //A key vaule pair of the debts that are
    //payed off
    // debtsPayedOff: Map,

    //A key value pair of the intrest each debt has paid/will pay
    //  intrestPayed: Map,

    //A key value pair of the debts and what day the payment is due.
    //The user will be sent an email when the payment is close to being due
    //And when it is due
    notificationEmailList: Map,

    // payOffMethod: String,

    DebtPayOffArray: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'debtPayOffTimeFrameModel'
        }
    ],
    isPayedOff: Boolean,


})
export let BudgetOutcomeModel = mongoose.model('BudgetOutcomeModel', budgetOutcome)

const customBudgetOutcome = new Schema({

    AllDebtsPayedOff: Boolean,
    isValid: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },

    // customPayOffFrameArry: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'customDebtPayOffTimeFrameModel'
    //     }

    // ],
    customPayOffFrameArry: {
        type: Array,
        default: [],
    },

    PayUser: {
        isUserPaid: Boolean,
        payPercent: Number,
        payAmount: Number
    }

    //A key vaule pair of the debts that are
    //payed off




})
export let CustomBudgetOutcomeModel = mongoose.model('CustomBudgetOutcomeModel', customBudgetOutcome)

const debtPayOffTimeFrame = new Schema({

    creditorName: String,

    totalPayments: Number,
    paymentsLeft: Number,

    MinimumPayment: Number,

    originalDebtAmount: Number,
    currentDebtAmount: Number,

    totalIntrestPaid: Number,
    intrestPayed: Number,

    payOffStyle: String,

    PaymentDate: Date,
    PayOffDate: Date,
    lastUpdated: Date,

    isPayedOff: Boolean,


})

export let debtPayOffTimeFrameModel = mongoose.model('debtPayOffTimeFrameModel', debtPayOffTimeFrame)

const customDebtPayOffTimeFrame = new Schema({
    creditorName: String,


    originalDebtAmount: Number,
    currentDebtAmount: Number,

    percentOfPayUsed: Number,

    //MAY NOT BE NEEDED!!
    // totalIntrest: Number,
    // intrestPayed: Number,

    //THE AMOUNT OF PAY THAT WAS USED TO PAY THIS DEBT
    amountOfPayUsed: Number,

    isPayedOff: Boolean,

    payOffStyle: String,

    // dueDate: Date,
    lastUpdated: Date,

    amountLeftOver: Number






})

export let customDebtPayOffTimeFrameModel = mongoose.model('customDebtPayOffTimeFrame', customDebtPayOffTimeFrame)






//const YourModel = mongoose.model('YourModel', yourSchema);