import { MongoClient, ObjectId } from "mongodb";
import * as dotenv from "dotenv";
import { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel, debtPayOffTimeFrameModel, CustomDebtModel, customDebtPayOffTimeFrameModel } from '../MongoSchema/SchemaModel.js'
import { SortDebtCustom, CustomPayBareMinimum, UpdateMiniMumPayment, AmountAddedToCurrentDebt, FindAmountLeftOver, FindAllCurrentDebt, PayOffRemainingDebt, CheckIfAllDebtsArePaid, CustomDebtPaymentFrame, getTotalIncomeAmount, GetTotalIntrest, calculatePayoffDate, GetTotalPayments, GetMonthlyIntrestRate, PayBareMinimum, DivideIncomeByOurr, ReturnErrorFrame } from '../BudgetEngine/HelperFuctions.js'
import { mongoose } from "mongoose";
dotenv.config();


//#region Settings
const data = {
    payOffStyle: 'snowball',
    user_id: 'asdijfoajsodjaojsd',
    // user: {
    //     FirstName: 'O',
    //     LastName: 'Bay',
    //     UserName: 'Godbrand',
    //     Password: 'password',
    //     ContactInformation: {
    //         EmailAdress: 'test@test.com',
    //         PhoneNumber: '888-888-8888'
    //     }
    // },
    debts: [
        {
            creditorName: "Car",
            originalDebtAmount: 40000,
            currentDebtAmount: 40000,
            intrestRate: 0.3,
            originalMinumnPayment: 600,
            minumnPayment: 600,
            isPayedOff: false,

        },
        {
            creditorName: "CuraLeaf",
            originalDebtAmount: 500,
            currentDebtAmount: 500,
            intrestRate: 0.1,
            originalMinumnPayment: 60,
            minumnPayment: 60,
            isPayedOff: false,
        },
        {
            creditorName: "Best Buy",
            originalDebtAmount: 509,
            currentDebtAmount: 509,
            intrestRate: 0.4,
            originalMinumnPayment: 60,
            minumnPayment: 60,
            isPayedOff: false,
        },
        {
            creditorName: "Discover",
            originalDebtAmount: 1009,
            currentDebtAmount: 1009,
            intrestRate: 0.9,
            originalMinumnPayment: 60,
            minumnPayment: 60,
            isPayedOff: false,
        },
        {
            creditorName: "Thing 1",
            originalDebtAmount: 2009,
            currentDebtAmount: 2009,
            intrestRate: 0.3,
            originalMinumnPayment: 80,
            minumnPayment: 80,
            isPayedOff: false,
        },
        {
            creditorName: "Thing 2",
            originalDebtAmount: 3009,
            currentDebtAmount: 3009,
            intrestRate: 0.6,
            originalMinumnPayment: 90,
            minumnPayment: 90,
            isPayedOff: false,
        },

    ],
    income: [

        {
            name: 'drugs',
            amount: 300,
            occurrence: 'weekly'
        },
        {
            name: 'guns',
            amount: 500,
            occurrence: 'bi-weekly'
        },
        {
            name: 'Other Drugs',
            amount: 30000,
            occurrence: 'annually'
        },
        {
            name: 'rental',
            amount: 750,
            occurrence: 'bi-weekly'
        },
    ],
}

const data2 = {
    payOffStyle: 'custom',
    useLeftOver: true,
    user_id: 'asdijfoajsodjaojsd',
    debts: [
        {
            creditorName: "payPal",
            originalDebtAmount: 4109,
            currentDebtAmount: 4109,
            percentOfPayUsed: 3,
            amountOfPayUsed: 0,
            isPayedOff: false,
            payOffStyle: "",
            lastUpdated: Date.now(),
            amountLeftOver: 0,
        },
        {
            creditorName: "policeAndFire",
            originalDebtAmount: 2450,
            currentDebtAmount: 2450,
            percentOfPayUsed: 2,
            amountOfPayUsed: 0,
            isPayedOff: false,
            payOffStyle: "",
            lastUpdated: Date.now(),
            amountLeftOver: 0,
        },
        {
            creditorName: "420 Empire",
            originalDebtAmount: 4020,
            currentDebtAmount: 4020,
            percentOfPayUsed: 3,
            amountOfPayUsed: 0,
            isPayedOff: false,
            payOffStyle: "",
            lastUpdated: Date.now(),
            amountLeftOver: 0,
        },
        {
            creditorName: "Disover",
            originalDebtAmount: 3970,
            currentDebtAmount: 3970,
            percentOfPayUsed: 2,
            amountOfPayUsed: 0,
            isPayedOff: false,
            payOffStyle: "",
            lastUpdated: new Date(),
            amountLeftOver: 0,
        }
    ],
    income: [

        {
            name: 'drugs',
            amount: 300,
            occurrence: 'weekly'
        },
        {
            name: 'guns',
            amount: 500,
            occurrence: 'bi-weekly'
        },
        {
            name: 'Other Drugs',
            amount: 30000,
            occurrence: 'annually'
        },
    ],
}

let frame = new budgetFrameModel;
let custFrame = new CustomBudgetFrameModel
let car = new DebtModel;
let CuraLeaf = new DebtModel;
let BestBuy = new DebtModel;
let Discover = new DebtModel;
let weed = new DebtModel;
let MoreWeed = new DebtModel;
let Things = new DebtModel;

let car2 = new CustomDebtModel;
let CuraLeaf2 = new CustomDebtModel;
let BestBuy2 = new CustomDebtModel;
let Discover2 = new CustomDebtModel;


let drugs = new IncomeModel;
let guns = new IncomeModel;
let moreGuns = new IncomeModel;

guns.name = 'guns';
guns.amount = 200;
guns.occurrence = 'weekly';
//IncomeModel.create({ name: 'guns', amount: 200, occurrence: 'weekly' })

moreGuns.name = 'more guns';
moreGuns.amount = 750;
moreGuns.occurrence = 'bi-weekly';

drugs.name = 'drugs';
drugs.amount = 40000;
drugs.occurrence = 'annually';



car.creditorName = 'Car'
car.originalDebtAmount = 26000;
car.currentDebtAmount = 26000;
car.intrestRate = 7.0;
car.originalMinumnPayment = 300;
car.minumnPayment = 300;
car.isPayedOff = false;

weed.creditorName = 'Weed'
weed.originalDebtAmount = 1200;
weed.currentDebtAmount = 1200;
weed.intrestRate = 8.0;
weed.originalMinumnPayment = 30;
weed.minumnPayment = 30;
weed.isPayedOff = false;

MoreWeed.creditorName = 'More weed'
MoreWeed.originalDebtAmount = 1500;
MoreWeed.currentDebtAmount = 1500;
MoreWeed.intrestRate = 2.0;
MoreWeed.originalMinumnPayment = 60;
MoreWeed.minumnPayment = 60;
MoreWeed.isPayedOff = false;

Things.creditorName = 'Things'
Things.originalDebtAmount = 1100;
Things.currentDebtAmount = 1100;
Things.intrestRate = 6.0;
Things.originalMinumnPayment = 20;
Things.minumnPayment = 20;
Things.isPayedOff = false;


CuraLeaf.creditorName = 'Cura Leaf'
CuraLeaf.originalDebtAmount = 20134.32;
CuraLeaf.currentDebtAmount = 20134.32;
CuraLeaf.intrestRate = 4.3;
CuraLeaf.originalMinumnPayment = 230;
CuraLeaf.minumnPayment = 230;
CuraLeaf.isPayedOff = false;

BestBuy.creditorName = 'Best Buy'
BestBuy.originalDebtAmount = 5000;
BestBuy.currentDebtAmount = 5000;
BestBuy.intrestRate = 5.5;
BestBuy.originalMinumnPayment = 170;
BestBuy.minumnPayment = 170;
BestBuy.isPayedOff = false;

Discover.creditorName = 'Discover test'
Discover.originalDebtAmount = 88402.42;
Discover.currentDebtAmount = 88402.42;;
Discover.intrestRate = 3.0;
Discover.originalMinumnPayment = 170;
Discover.minumnPayment = 370;
Discover.isPayedOff = false;


car2.creditorName = 'Car 2'
car2.originalDebtAmount = 800;
car2.currentDebtAmount = 800;
car2.percentOfIncome = 2.5;
car2.isPayedOff = false;
car2.amountLeftOver = 0;


CuraLeaf2.creditorName = 'Cura Leaf'
CuraLeaf2.originalDebtAmount = 900;
CuraLeaf2.currentDebtAmount = 900;
CuraLeaf2.percentOfIncome = 2.5;
CuraLeaf2.isPayedOff = false;
CuraLeaf2.amountLeftOver = 0;

BestBuy2.creditorName = 'Best Buy'
BestBuy2.originalDebtAmount = 700;
BestBuy2.currentDebtAmount = 700;
BestBuy2.percentOfIncome = 2.5;
BestBuy2.isPayedOff = false;
BestBuy2.amountLeftOver = 0;

Discover2.creditorName = 'Discover'
Discover2.originalDebtAmount = 760;
Discover2.currentDebtAmount = 760;
Discover2.percentOfIncome = 2.5;
Discover2.isPayedOff = false;
Discover2.amountLeftOver = 0;

let CustomDebtCollection = [];

CustomDebtCollection.push(car2)
CustomDebtCollection.push(Discover2)
CustomDebtCollection.push(BestBuy2)
CustomDebtCollection.push(CuraLeaf2)

let DebtCollection = [];
let IncomeCollection = [];
DebtCollection.push(car)
DebtCollection.push(CuraLeaf)
DebtCollection.push(BestBuy)
DebtCollection.push(Discover)
DebtCollection.push(weed);
DebtCollection.push(MoreWeed);
DebtCollection.push(Things);

//IncomeCollection.push(guns)
IncomeCollection.push(drugs)
//IncomeCollection.push(moreGuns)




let user = {
    FirstName: 'O',
    LastName: 'Bay',
    UserName: 'Godbrand',
    Password: 'password',
    ContactInformation: {
        EmailAdress: 'test@test.com',
        PhoneNumber: '888-888-8888'
    }
}


frame.user = user;
frame.DebtCollection = DebtCollection;
frame.IncomeCollection = IncomeCollection;
frame.payOffStyle = 'avalanche';

custFrame.user = user;
custFrame.DebtCollection = CustomDebtCollection;
custFrame.IncomeCollection = IncomeCollection;
custFrame.useLeftOver = false;
custFrame.payOffStyle = 'custom';

//#endregion 
const MongoPassword = "Z2c1MFIFYufHRMan"
let uri = `mongodb+srv://dbUser:${MongoPassword}@test.xqxjfvx.mongodb.net/?retryWrites=true&w=majority`;
//let uri = 'mongodb://127.0.0.1:27017/test'


// mongoose.connect('mongodb://127.0.0.1:27017/BudgetDB');

// mongoose.connect(`${uri}`, () => {
//     console.log("connect");
// });

const client = new MongoClient(uri, {




});

// await client.connect().then(() => {

//     // IncomeModel.create({ name: 'guns', amount: 200, occurrence: 'weekly' })
//     console.log("connect");
//     const db = client.db("test");

//     const incomeCollection = db.collection("incomemodels");
//     const debtCollection = db.collection("debtmodels");

//     const newIncome = { name: 'guns', amount: 200, occurrence: 'weekly' }

//     // incomeModel.insertOne(newIncome);
//     let debt = new DebtModel({
//         creditorName: 'Weed',
//         originalDebtAmount: 1200,
//         currentDebtAmount: 1200,
//         intrestRate: 8.0,
//         originalMinumnPayment: 30,
//         minumnPayment: 30,
//         isPayedOff: false
//     });

//     let income = new IncomeModel({ name: 'even more guns', amount: 400, occurrence: 'weekly' })
//     //income.save().then(() => console.log("Income saved"));
//     // const inserted = incomeCollection.insertOne(income);
//     const insertDebt = debtCollection.insertOne(debt);

// }).finally(() => {
//     //client.close();
//     console.log("finally")
// })

// mongoose.disconnect()
//     .then(() => {
//         console.log('Disconnected from MongoDB');
//     })
//     .catch((error) => {
//         console.error('Error disconnecting from MongoDB:', error);
//     });
//await client.db("test").command({ ping: 1 });

// const user1 = new UserModel({
//     FirstName: 'O',
//     LastName: 'Bay',
//     UserName: 'Godbrand',
//     Password: 'password',
//     ContactInformation: {
//         EmailAdress: 'test@test.com',
//         PhoneNumber: '888-888-8888'
//     }
// })



// export async function SaveIncome(income = new IncomeModel, userId) {


//     await client.connect().then(() => {

//         // IncomeModel.create({ name: 'guns', amount: 200, occurrence: 'weekly' })
//         console.log("connect");
//         const db = client.db("test");

//         const incomeCollection = db.collection("incomemodels");
//         // const debtCollection = db.collection("debtmodels");

//         income.userId = userID;
//         // income.save().then(() => console.log("Income saved"));
//         const inserted = incomeCollection.insertOne(income);
//         //const insertDebt = debtCollection.insertOne(debt);

//     }).finally(() => {
//         //client.close();
//         console.log("finally")
//     })

//     mongoose.disconnect()
//         .then(() => {
//             console.log('Disconnected from MongoDB');
//         })
//         .catch((error) => {
//             console.error('Error disconnecting from MongoDB:', error);
//         });



// }

// SaveIncome(weedIncome, userID)

const userId = '65ad6eb2fb4b23c60362bb74'

const firstName = 'First'
const lastname = 'Update for the Day';
const userName = 'TheWeedMan';
const password = '420pot';
const emailAdress = 'TheWeedMan@HotMail.com';
const phoneNumber = '440-4-000';

const newUser = new UserModel({ FirstName: firstName, LastName: lastname, UserName: userName, Password: password, ContactInformation: { EmailAdress: emailAdress, PhoneNumber: phoneNumber } })

// const run = mongoose.createConnection(uri).asPromise(async () => {
//     mongoose.set('bufferCommands', false);
//     // IncomeModel.create({ name: 'guns', amount: 200, occurrence: 'weekly' })
//     console.log("connect");
//     const db = client.db("test");

//     const userCollection = db.collection("usermodels");


//     const update = { $set: { firstName: 'Sunday', lastname: 'Update', userName: 'WeedMan', ContactInformation: { EmailAdress: emailAdress, PhoneNumber: phoneNumber }, completed: false } };

//     const options = { new: false, upsert: false, maxTimeMS: 20000 };

//     // const filter = { id: "ObjectId('65a74942971fc53c89aebe1a')" };
//     const filter = { firstName: 'First' };


//     try {

//         //  await userCollection.insertOne(newUser)
//         // const oneUser = await userCollection.findOne(filter, options)


//         // const updatedUser = await userCollection.findOneAndUpdate(filter, update, options).then(() => {
//         //     console.log("worked")
//         // })
//         // const updatedUser = await UserModel.findOneAndUpdate(filter, update, options).then(() => {
//         //     console.log("worked")
//         // })
//         // console.log(updatedUser)

//         userCollection.updateOne({ _id: '65ad6eb2fb4b23c60362bb74' }, { $set: { FirstName: 'Sunday', } }, { new: false })
//             .then(updatedDocument => {
//                 if (!updatedDocument) {
//                     console.log('Document not found');
//                 } else {
//                     console.log('Updated document:', updatedDocument);
//                 }
//             })
//             .catch(error => {
//                 console.error('Error updating document:', error.message);
//             });

//     } catch (error) {
//         console.log(error)
//     }
//     // const updatedUser = await userCollection.findOneAndUpdate(filter, update, options).then(() => {

//     //     const updateDoc = UserModel.findById({ _id: "ObjectId('65a74942971fc53c89aebe1a')" })

//     // })



// }).finally(() => {
//     //client.close();
//     console.log("finally")
//     mongoose.disconnect()
//         .then(() => {
//             console.log('Disconnected from MongoDB');
//         })
//         .catch((error) => {
//             console.error('Error disconnecting from MongoDB:', error);
//         });

// })
mongoose.createConnection(uri);
console.log("Connected")
//const db = client.db("test");

//const userCollection = db.collection("usermodels");
const filter = { _id: new ObjectId('65ad6eb2fb4b23c60362bb74') }
const update = { $set: { FirstName: 'GodBrand', Lastname: 'Update', UserName: 'TheWeedMan', ContactInformation: { EmailAdress: emailAdress, PhoneNumber: phoneNumber } } };


//{ _id: '65ad6eb2fb4b23c60362bb74' } { UserName: 'TheWeedMan' } "ObjectId('65ad6eb2fb4b23c60362bb74')"
const db = client.db("test");
const debtCollection = db.collection("debtmodels");
mongoose.createConnection(uri);

const creditorName = "New Debt";
const originallDebtAmount = 1500;
const currentDebtAmount = 1500;
const intrestRate = 3.3;
const originalMinumnPayment = 200;
const minumnPayment = 200;
//userId = "65ad6eb2fb4b23c60362bb74";
const newDebt = new DebtModel({ creditorName: creditorName, originallDebtAmount: originallDebtAmount, currentDebtAmount: currentDebtAmount, intrestRate: intrestRate, originalMinumnPayment: originalMinumnPayment, originallDebtAmount: originallDebtAmount, minumnPayment: minumnPayment, userId: userId })

const insertedDebt = await debtCollection.insertOne(newDebt).then(newDebt).then(newDebt => {
    if (!newDebt) {
        console.log("Debt now found");
    } else {
        console.log("New Debt: " + newDebt)
    }
})
mongoose.disconnect()
    .then(() => {
        console.log('Disconnected from MongoDB');
    })
    .catch((error) => {
        console.error('Error disconnecting from MongoDB:', error);
    });


// const run1 = mongoose.connect(`mongodb+srv://dbUser:${MongoPassword}@test.xqxjfvx.mongodb.net/?retryWrites=true&w=majority`).then(async () => {
//     // IncomeModel.create({ name: 'guns', amount: 200, occurrence: 'weekly' })
//     console.log("connect");
//     const db = client.db("test");

//     const userCollection = db.collection("usermodels");


//     const update = { $set: { firstName: 'Sunday', lastname: 'Update', userName: 'WeedMan', ContactInformation: { EmailAdress: emailAdress, PhoneNumber: phoneNumber }, completed: false } };

//     const options = { new: false, upsert: false, maxTimeMS: 20000 };

//     // const filter = { id: "ObjectId('65a74942971fc53c89aebe1a')" };
//     const filter = { firstName: 'First' };


//     try {

//         //  await userCollection.insertOne(newUser)
//         const oneUser = await userCollection.find()
//         // console.log(oneUser);

//         const updatedUser = await userCollection.findOneAndUpdate(filter, update, options).then(() => {
//             // console.log("worked")
//         })
//         // const updatedUser = await UserModel.findOneAndUpdate(filter, update, options).then(() => {
//         //     console.log("worked")
//         // })
//         UserModel.findOneAndUpdate({ _id: '65ad6eb2fb4b23c60362bb74' }, { $set: { irstName: 'Sunday', } }, { new: false })
//             .then(updatedDocument => {
//                 if (!updatedDocument) {
//                     console.log('Document not found');
//                 } else {
//                     console.log('Updated document:', updatedDocument);
//                 }
//             })
//             .catch(error => {
//                 console.error('Error updating document:', error.message);
//             });

//         console.log(updatedUser)
//     } catch (error) {
//         console.log(error)
//     }
// }).then(() => {
//     mongoose.disconnect()
//         .then(() => {
//             console.log('Disconnected from MongoDB');
//         })
//         .catch((error) => {
//             console.error('Error disconnecting from MongoDB:', error);
//         });
// })


// await client.connect().then(() => {

//     // IncomeModel.create({ name: 'guns', amount: 200, occurrence: 'weekly' })
//     console.log("connect");
//     const db = client.db("test");

//     const userCollection = db.collection("usermodels");

//     const insertedUser = userCollection.insertOne(newUser);
//     //const insertDebt = debtCollection.insertOne(debt);

// }).finally(() => {
//     //client.close();
//     console.log("finally")
// })


