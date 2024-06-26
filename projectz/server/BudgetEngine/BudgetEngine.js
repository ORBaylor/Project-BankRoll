
const { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel, debtPayOffTimeFrameModel, CustomDebtModel, customDebtPayOffTimeFrameModel } = require('../MongoSchema/SchemaModel.js')
const { SortDebtCustom, CheckMethodType, CustomPayBareMinimum, UpdateMiniMumPayment, AmountAddedToCurrentDebt, FindAmountLeftOver, FindAllCurrentDebt, PayOffRemainingDebt, CheckIfAllDebtsArePaid, CustomDebtPaymentFrame, getTotalIncomeAmount, GetTotalIntrest, calculatePayoffDate, GetTotalPayments, GetMonthlyIntrestRate, PayBareMinimum, DivideIncomeByOurr, ReturnErrorFrame } = require('./HelperFuctions.js');


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


//When a full budget model has been created and everthing has been caculated, all a user will have to do
//is login and all active budgetFrames will popup.
//A user will have the option to edit the budgetFrame upon logging in if necessary.
//When the user logs in all of the payments they should of made will show up and the user will be asked if they have made the payment 


//Creating a budget based off of the budget frame that is passed to it
//Used for long term debt pay off
function CreateBudget(budetFrame = new budgetFrameModel) {

    const payOffStyle = budetFrame.payOffStyle.toString();

    const debtCollection = budetFrame.DebtCollection;
    const incomeCollection = budetFrame.IncomeCollection;
    const currentUser = budetFrame.UserId;
    let budgetOutcome = new BudgetOutcomeModel;
    let sortedArray = [];
    let minimumAdded = 0;

    budgetOutcome.UserId = currentUser;

    //Pay the smallest debt as fast as 
    //possible. Pay minimums on all other debt.

    if (PayBareMinimum(debtCollection, incomeCollection)) {
        let updatedArray = []

        switch (payOffStyle) {
            case 'snowball':
                //Sort the Array depending on the pay Off style
                sortedArray = SortDebtCustom(debtCollection, 'originalDebtAmount', 'low');

                break;
            case 'avalanche':
                //Sort the Array depending on the pay Off style
                sortedArray = SortDebtCustom(debtCollection, 'originalDebtAmount', 'high');

                break;
            case 'minimun':
                //Sort the Array depending on the pay Off style
                sortedArray = SortDebtCustom(debtCollection, 'minumnPayment', 'high');

                break;
        }

        if (!payOffStyle == 'minimun') {

            //Grab the first debt in the Array and modify the miniumPayment
            //Add what is left of the money to the miniumPayment
            minimumAdded = AmountAddedToCurrentDebt(debtCollection, incomeCollection);

            updatedArray = UpdateMiniMumPayment(sortedArray, minimumAdded);
            //console.log(updatedArray);

        } else {
            updatedArray = sortedArray;
        }


        //Run through all of the debts in the array 
        //caculate what needs to be caculated 
        //add the results to the budegframe model.
        updatedArray.forEach((arry) => {
            let outputTimeFrame = new debtPayOffTimeFrameModel;

            let totalMonths = GetTotalPayments(arry.originalDebtAmount, arry.intrestRate, arry.minumnPayment)
            console.log("Total Months: " + totalMonths);
            outputTimeFrame.creditorName = arry.creditorName;
            outputTimeFrame.totalPayments = totalMonths;
            outputTimeFrame.paymentsLeft = totalMonths;
            //console.log("total payments:" + outputTimeFrame.totalPayments + " Payments Left:" + outputTimeFrame.paymentsLeft);
            outputTimeFrame.MinimumPayment = arry.minumnPayment;
            outputTimeFrame.originalDebtAmount = arry.originalDebtAmount;
            outputTimeFrame.currentDebtAmount = arry.originalDebtAmount;

            //Intrest paid 
            outputTimeFrame.totalIntrestPaid = GetTotalIntrest(arry.originalDebtAmount, arry.minumnPayment, totalMonths);

            outputTimeFrame.PaymentDate = arry.dueDate;
            outputTimeFrame.payOffStyle = payOffStyle;
            outputTimeFrame.PayOffDate = calculatePayoffDate(arry.originalDebtAmount, arry.intrestRate, arry.minumnPayment)
            outputTimeFrame.isPayedOff = (GetTotalPayments(arry.originalDebtAmount, arry.intrestRate, arry.minumnPayment) == 1 ? true : false);

            outputTimeFrame.hasError = false;

            budgetOutcome.DebtPayOffArray.push(outputTimeFrame);
        })



        return budgetOutcome

    } else {

        //Let the User know the income will not pay off the debt.
        budgetOutcome = ReturnErrorFrame('BudgetOutcomeModel');
    }

    return budgetOutcome;

}

//Creating a budget based off of the custom budget frame
//Used for short term debt pay off
function CreateCustomBudget(customBudetFrame = new CustomBudgetFrameModel) {

    const payOffStyle = customBudetFrame.payOffStyle;

    const debtCollection = customBudetFrame.DebtCollection;
    const incomeCollection = customBudetFrame.IncomeCollection;
    const currentUser = customBudetFrame.UserId;
    const payUserOptions = customBudetFrame.payUserOptions;
    const useLeftOver = customBudetFrame.useLeftOver;
    let customBudetOutcome = new CustomBudgetOutcomeModel;


    let customBudgetArry = [];
    let sortedArray = [];



    if (CustomPayBareMinimum(debtCollection, incomeCollection)) {

        customBudetOutcome.isValid = true;

        sortedArray = SortDebtCustom(debtCollection, 'percentOfIncome', 'high');
        let totalIncome = DivideIncomeByOurr(incomeCollection);
        let budgetOutcomeArry = CustomDebtPaymentFrame(sortedArray, totalIncome);

        if (useLeftOver == true) {

            let remainingOutcomeArry = PayOffRemainingDebt(budgetOutcomeArry)
            let amountLeftOver = FindAmountLeftOver(remainingOutcomeArry)

            if (CheckIfAllDebtsArePaid(remainingOutcomeArry) && amountLeftOver > 0) {
                customBudetOutcome.AllDebtsPayedOff = true;
                customBudetOutcome.PayUser.isUserPaid = true;
                customBudetOutcome.PayUser.payAmount = amountLeftOver.toFixed(2);

                // customBudetOutcome.PayUser.payPercent = Make a method that will find the amount of pay was used
                amountLeftOver -= amountLeftOver;

            } else {
                customBudetOutcome.AllDebtsPayedOff = CheckIfAllDebtsArePaid(remainingOutcomeArry);
                if (amountLeftOver > 0) {
                    customBudetOutcome.isUserPaid = true;
                    customBudetOutcome.payAmount = amountLeftOver.toFixed(2);
                    amountLeftOver -= amountLeftOver;
                } else {
                    customBudetOutcome.isUserPaid = false;
                    customBudetOutcome.payAmount = amountLeftOver.toFixed(2);
                    amountLeftOver -= amountLeftOver;
                }

            }

            remainingOutcomeArry.forEach((arry) => {

                let customPayOffTimeFrame = new customDebtPayOffTimeFrameModel;

                customPayOffTimeFrame.creditorName = arry.creditorName;
                customPayOffTimeFrame.originalDebtAmount = arry.originalDebtAmount;

                customPayOffTimeFrame.currentDebtAmount = arry.currentDebtAmount;
                customPayOffTimeFrame.percentOfPayUsed = arry.percentOfPayUsed;
                customPayOffTimeFrame.isPayedOff = arry.isPayedOff;
                customPayOffTimeFrame.payOffStyle = payOffStyle;
                customPayOffTimeFrame.amountLeftOver = amountLeftOver.toFixed(2);
                customPayOffTimeFrame.hasError = false;
                customBudetOutcome.customPayOffFrameArry.push(customPayOffTimeFrame);
            })

        }
        else {

            let amountLeftOver = FindAmountLeftOver(budgetOutcomeArry)
            customBudetOutcome.AllDebtsPayedOff = CheckIfAllDebtsArePaid(budgetOutcomeArry);

            if (amountLeftOver > 0) {
                customBudetOutcome.PayUser.isUserPaid = true;
                customBudetOutcome.PayUser.payAmount = amountLeftOver.toFixed(2);
                amountLeftOver -= amountLeftOver;

            }

            //PayOffRemainingDebt
            //Paying a user is only going to happen if there is money left over

            budgetOutcomeArry.forEach((arry) => {

                let customPayOffTimeFrame = new customDebtPayOffTimeFrameModel;

                customPayOffTimeFrame.creditorName = arry.creditorName;
                customPayOffTimeFrame.originalDebtAmount = arry.originalDebtAmount.toFixed(2);
                customPayOffTimeFrame.currentDebtAmount = arry.currentDebtAmount.toFixed(2);
                customPayOffTimeFrame.percentOfPayUsed = arry.percentOfPayUsed;
                customPayOffTimeFrame.isPayedOff = arry.isPayedOff;
                customPayOffTimeFrame.payOffStyle = payOffStyle;
                customPayOffTimeFrame.amountLeftOver = amountLeftOver.toFixed(2);
                customBudetOutcome.customPayOffFrameArry.push(customPayOffTimeFrame);

            })

        }


        return customBudetOutcome
    }
    else {
        //TELL THE USER THEY DO NOT HAVE ENOUGH MONEY TO PAY DEBTS
        customBudetOutcome = ReturnErrorFrame(1);

        return customBudetOutcome;
    }


}

//This method will take the data that is passed from the front end and create a budget frame
function CreateBudgetFrame(data) {

    let budgetFrame = new budgetFrameModel;


    let incomeArry = [];
    let debtArry = []
    let payOffStyle = '';

    //MAKE A CHECK TO SEE IF THE DATA THAT IS BEING PASSED IN IS VALID
    if (data.PayOffStyle != null && data.debts != null && data.income != null && data.UserId != null) {

        const user_ID = data.UserId;

        if (data.PayOffStyle == '') {
            return;
        } else {
            payOffStyle = data.PayOffStyle
        }

        // FirstName: String,
        // LastName: String,
        // UserName: String,
        // Password: String,
        // ContactInformation: {
        // EmailAdress: String,
        // PhoneNumber: String
        // }


        data.debts.forEach((debtJson) => {
            let debts = new DebtModel;

            debts.creditorName = debtJson.creditorName;
            debts.originalDebtAmount = debtJson.originalDebtAmount;
            debts.currentDebtAmount = debtJson.currentDebtAmount;
            debts.intrestRate = debtJson.intrestRate;
            debts.originalMinumnPayment = debtJson.originalMinumnPayment;
            debts.minumnPayment = debtJson.minumnPayment;
            debts.isPayedOff = debtJson.isPayedOff;
            debts.dueDate = debtJson.dueDate;

            debtArry.push(debts);

        })

        data.income.forEach((incomeJson) => {
            let income = new IncomeModel
            income.name = incomeJson.name;
            income.amount = incomeJson.amount;
            income.occurrence = incomeJson.occurrence;
            incomeArry.push(income);
        })

        //CHECK TO SEE IF THE ARRAYS ARE EMPTY;
        budgetFrame.DebtCollection = debtArry;
        budgetFrame.IncomeCollection = incomeArry;
        budgetFrame.UserId = user_ID;
        budgetFrame.payOffStyle = payOffStyle;
    }
    else {
        return
    }



    return budgetFrame;
}

//This method will take the data that is passed from the front end and create a custom budget frame
function CreateCustomBudgetFrame(data) {
    let customBudgetFrame = new CustomBudgetFrameModel

    let incomeArry = [];
    let debtArry = []
    let payOffStyle = '';

    //MAKE A CHECK TO SEE IF THE DATA THAT IS BEING PASSED IN IS VALID
    if (data.payOffStyle != null && data.debts != null && data.income != null && data.UserId != null) {
        let user_ID = data.UserId;

        if (data.payOffStyle == '') {
            return;
        } else {
            payOffStyle = data.payOffStyle
            console.log(payOffStyle);

        }

        data.debts.forEach((debtJson) => {
            let customDebt = new CustomDebtModel;
            customDebt.creditorName = debtJson.creditorName;
            customDebt.originalDebtAmount = debtJson.originalDebtAmount;
            customDebt.currentDebtAmount = debtJson.currentDebtAmount;
            customDebt.percentOfIncome = debtJson.percentOfIncome;
            customDebt.amountLeftOver = debtJson.amountLeftOver;
            customDebt.isPayedOff = debtJson.isPayedOff;
            customDebt.userId = user_ID;

            debtArry.push(customDebt);
        })

        data.income.forEach((incomeJson) => {
            let income = new IncomeModel
            income.name = incomeJson.name;
            income.amount = incomeJson.amount;
            income.occurrence = incomeJson.occurrence;
            incomeArry.push(income);
        })

        customBudgetFrame.DebtCollection = debtArry;
        customBudgetFrame.IncomeCollection = incomeArry;
        customBudgetFrame.UserId = user_ID;
        customBudgetFrame.payOffStyle = payOffStyle;
        customBudgetFrame.useLeftOver = data.useLeftOver;


    }
    else {
        console.log("BudgetEngine else")
        return;
    }


    return customBudgetFrame;
}

module.exports = { CreateBudget, CreateCustomBudget, CreateBudgetFrame, CreateCustomBudgetFrame }
