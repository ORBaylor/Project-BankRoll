import mongoose from 'mongoose';
const { Schema } = mongoose;

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

const budgetFrame = new Schema({

    DebtCollection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Debt'
          },
    ],
    useDebtCollection: Boolean,
    payOffStyle: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }


})