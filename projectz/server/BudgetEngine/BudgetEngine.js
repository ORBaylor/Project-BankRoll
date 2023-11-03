
import { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel, debtPayOffTimeFrameModel, CustomDebtModel, customDebtPayOffTimeFrameModel } from '../MongoSchema/SchemaModel.js'
import { SortDebtCustom, CustomPayBareMinimum, UpdateMiniMumPayment, AmountAddedToCurrentDebt, FindAmountLeftOver, FindAllCurrentDebt, PayOffRemainingDebt, CheckIfAllDebtsArePaid, CustomDebtPaymentFrame, getTotalIncomeAmount, GetTotalIntrest, calculatePayoffDate, GetTotalPayments, GetMonthlyIntrestRate, PayBareMinimum, DivideIncomeByOurr } from './HelperFuctions.js'
//import * as HelperFuctionsJs from './HelperFuctions.js'


let frame = new budgetFrameModel;
let custFrame = new CustomBudgetFrameModel
let car = new DebtModel;
let CuraLeaf = new DebtModel;
let BestBuy = new DebtModel;
let Discover = new DebtModel;

let car2 = new CustomDebtModel;
let CuraLeaf2 = new CustomDebtModel;
let BestBuy2 = new CustomDebtModel;
let Discover2 = new CustomDebtModel;


let drugs = new IncomeModel;
let guns = new IncomeModel;
let moreGuns = new IncomeModel;

guns.name = 'guns';
guns.amount = 500;
guns.occurrence = 'weekly';

moreGuns.name = 'drugs';
moreGuns.amount = 600;
moreGuns.occurrence = 'bi-weekly';

drugs.name = 'drugs';
drugs.amount = 30000;
drugs.occurrence = 'annually';



car.creditorName = 'Car'
car.originalDebtAmount = 400;
car.currentDebtAmount = 400;
car.intrestRate = 0.3;
car.originalMinumnPayment = 60;
car.minumnPayment = 60;
car.isPayedOff = false;


CuraLeaf.creditorName = 'Cura Leaf'
CuraLeaf.originalDebtAmount = 600;
CuraLeaf.currentDebtAmount = 600;
CuraLeaf.intrestRate = 0.6;
CuraLeaf.originalMinumnPayment = 80;
CuraLeaf.minumnPayment = 80;
CuraLeaf.isPayedOff = false;

BestBuy.creditorName = 'Best Buy'
BestBuy.originalDebtAmount = 500;
BestBuy.currentDebtAmount = 500;
BestBuy.intrestRate = 0.5;
BestBuy.originalMinumnPayment = 70;
BestBuy.minumnPayment = 70;
BestBuy.isPayedOff = false;

Discover.creditorName = 'Discover'
Discover.originalDebtAmount = 760;
Discover.currentDebtAmount = 760;
Discover.intrestRate = 0.7;
Discover.originalMinumnPayment = 75;
Discover.minumnPayment = 75;
Discover.isPayedOff = false;


car2.creditorName = 'Car 2'
car2.originalDebtAmount = 400;
car2.currentDebtAmount = 400;
car2.percentOfIncome = 2.5;
car2.isPayedOff = false;
car2.amountLeftOver = 0;


CuraLeaf2.creditorName = 'Cura Leaf'
CuraLeaf2.originalDebtAmount = 600;
CuraLeaf2.currentDebtAmount = 600;
CuraLeaf2.percentOfIncome = 2.5;
CuraLeaf2.isPayedOff = false;
CuraLeaf2.amountLeftOver = 0;

BestBuy2.creditorName = 'Best Buy'
BestBuy2.originalDebtAmount = 500;
BestBuy2.currentDebtAmount = 500;
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

IncomeCollection.push(guns)
IncomeCollection.push(drugs)
IncomeCollection.push(moreGuns)




let user = {
    name: '0',
    userName: 'That guy'
}

// IncomeCollection = [

//     {
//         name: 'drugs',
//         amount: 300,
//         occurrence: 'weekly'
//     },
//     {
//         name: 'guns',
//         amount: 500,
//         occurrence: 'bi-weekly'
//     },
//     {
//         name: 'Other Drugs',
//         amount: 30000,
//         occurrence: 'annually'
//     },


// ],
frame.user = user;
frame.DebtCollection = DebtCollection;
frame.IncomeCollection = IncomeCollection;
frame.payOffStyle = 'minimun';

custFrame.user = user;
custFrame.DebtCollection = CustomDebtCollection;
custFrame.IncomeCollection = IncomeCollection;
custFrame.useLeftOver = true;
custFrame.payOffStyle = 'custom';


//When a full budget model has been created and everthing has been caculated, all a user will have to do
//is login and all active budgetFrames will popup.
//A user will have the option to edit the budgetFrame upon logging in if necicary.
//When the user logs in all of the payments they should of made will show up and the user will be asked if they have made the payment 

//console.log(frame);

export function CreateBudget(budetFrame = new budgetFrameModel) {

    const payOffStyle = budetFrame.payOffStyle.toString();

    const debtCollection = budetFrame.DebtCollection;
    const incomeCollection = budetFrame.IncomeCollection;
    const currentUser = budetFrame.user;
    let budgetOutcome = new BudgetOutcomeModel;
    let sortedArray = [];
    let minimumAdded = 0;

    //const allIncome = get all of the income from the collection 

    budgetOutcome.user = currentUser;

    //Pay the smallest debt as fast as 
    //possible. Pay minimums on all other debt.
    if (payOffStyle === 'snowball') {

        if (PayBareMinimum(debtCollection, incomeCollection)) {

            //Sort the Array depending on the pay Off style
            sortedArray = SortDebtCustom(debtCollection, 'originalDebtAmount', 'low');

            //console.log(sortedArray);
            //Grab the first debt in the Array and modify the miniumPayment
            //Add what is left of the money to the miniumPayment
            minimumAdded = AmountAddedToCurrentDebt(debtCollection, incomeCollection);
            //console.log(minimumAdded);
            let updatedArray = UpdateMiniMumPayment(sortedArray, minimumAdded);
            //console.log(updatedArray);

            //Run through all of the debts in the array 
            //caculate what needs to be caculated 
            //add the results to the budegframe model.
            updatedArray.forEach((arry) => {
                let outputTimeFrame = new debtPayOffTimeFrameModel;

                outputTimeFrame.creditorName = arry.creditorName;
                outputTimeFrame.totalPayments = GetTotalPayments(arry.originalDebtAmount, arry.intrestRate, arry.minumnPayment);
                outputTimeFrame.paymentsLeft = GetTotalPayments(arry.originalDebtAmount, arry.intrestRate, arry.minumnPayment);
                outputTimeFrame.payment = arry.minumnPayment;
                outputTimeFrame.originalDebtAmount = arry.originalDebtAmount;
                outputTimeFrame.currentDebtAmount = arry.originalDebtAmount;

                outputTimeFrame.intrestRate = GetTotalIntrest(arry.originalDebtAmount, arry.intrestRate, arry.minumnPayment);
                outputTimeFrame.intrestPayed = GetMonthlyIntrestRate(arry.intrestRate);

                outputTimeFrame.PaymentDate = arry.dueDate;
                outputTimeFrame.payOffStyle = payOffStyle;
                outputTimeFrame.PayOffDate = calculatePayoffDate(arry.originalDebtAmount, arry.intrestRate, arry.minumnPayment)

                budgetOutcome.DebtPayOffArray.push(outputTimeFrame);
            })



            return budgetOutcome

        } else {

            //Let the User know the income will not pay off the debt.
        }





        //Pay the largest or highest interest rate debt as 
        //fast as possible. Pay minimums on all other debt.
    } else if (payOffStyle === 'avalanche') {

        if (PayBareMinimum(debtCollection, incomeCollection)) {

            //Sort the Array depending on the pay Off style
            sortedArray = SortDebtCustom(debtCollection, 'intrestRate', 'high');

            //console.log(sortedArray);
            //Grab the first debt in the Array and modify the miniumPayment
            //Add what is left of the money to the miniumPayment
            minimumAdded = AmountAddedToCurrentDebt(debtCollection, incomeCollection);
            //console.log(minimumAdded);
            let updatedArray = UpdateMiniMumPayment(sortedArray, minimumAdded);
            //console.log(updatedArray);

            //Run through all of the debts in the array 
            //caculate what needs to be caculated 
            //add the results to the budegframe model.
            updatedArray.forEach((arry) => {
                let outputTimeFrame = new debtPayOffTimeFrameModel;

                outputTimeFrame.creditorName = arry.creditorName;
                outputTimeFrame.totalPayments = GetTotalPayments(arry.originalDebtAmount, arry.intrestRate, arry.minumnPayment);
                outputTimeFrame.paymentsLeft = GetTotalPayments(arry.originalDebtAmount, arry.intrestRate, arry.minumnPayment);
                outputTimeFrame.payment = arry.minumnPayment;
                outputTimeFrame.originalDebtAmount = arry.originalDebtAmount;
                outputTimeFrame.currentDebtAmount = arry.originalDebtAmount;

                outputTimeFrame.intrestRate = GetTotalIntrest(arry.originalDebtAmount, arry.intrestRate, arry.minumnPayment);
                outputTimeFrame.intrestPayed = GetMonthlyIntrestRate(arry.intrestRate);

                outputTimeFrame.PaymentDate = arry.dueDate;
                outputTimeFrame.payOffStyle = payOffStyle;
                outputTimeFrame.PayOffDate = calculatePayoffDate(arry.originalDebtAmount, arry.intrestRate, arry.minumnPayment)

                budgetOutcome.DebtPayOffArray.push(outputTimeFrame);
            })



            return budgetOutcome

        } else {

            //Let the User know the income will not pay off the debt.
        }

    }
    else if (payOffStyle === 'minimun') {

        if (PayBareMinimum(debtCollection, incomeCollection)) {

            //Sort the Array depending on the pay Off style
            sortedArray = SortDebtCustom(debtCollection, 'intrestRate', 'high');

            //console.log(sortedArray);
            //Grab the first debt in the Array and modify the miniumPayment
            //Add what is left of the money to the miniumPayment

            // minimumAdded = AmountAddedToCurrentDebt(debtCollection, incomeCollection);
            //console.log(minimumAdded);
            let updatedArray = debtCollection;
            //console.log(updatedArray);

            //Run through all of the debts in the array 
            //caculate what needs to be caculated 
            //add the results to the budegframe model.
            updatedArray.forEach((arry) => {
                let outputTimeFrame = new debtPayOffTimeFrameModel;

                outputTimeFrame.creditorName = arry.creditorName;
                outputTimeFrame.totalPayments = GetTotalPayments(arry.originalDebtAmount, arry.intrestRate, arry.minumnPayment);
                outputTimeFrame.paymentsLeft = GetTotalPayments(arry.originalDebtAmount, arry.intrestRate, arry.minumnPayment);
                outputTimeFrame.payment = arry.minumnPayment;
                outputTimeFrame.originalDebtAmount = arry.originalDebtAmount;
                outputTimeFrame.currentDebtAmount = arry.originalDebtAmount;

                outputTimeFrame.intrestRate = GetTotalIntrest(arry.originalDebtAmount, arry.intrestRate, arry.minumnPayment);
                outputTimeFrame.intrestPayed = GetMonthlyIntrestRate(arry.intrestRate);

                outputTimeFrame.PaymentDate = arry.dueDate;
                outputTimeFrame.payOffStyle = payOffStyle;
                outputTimeFrame.PayOffDate = calculatePayoffDate(arry.originalDebtAmount, arry.intrestRate, arry.minumnPayment)

                budgetOutcome.DebtPayOffArray.push(outputTimeFrame);
            })



            return budgetOutcome

        } else {

            //Let the User know the income will not pay off the debt.
        }
    }

    return budgetOutcome;

}

// let outCome = CreateBudget(frame);
// console.log(outCome);


export function CreateCustomBudget(customBudetFrame = new CustomBudgetFrameModel) {

    const payOffStyle = customBudetFrame.payOffStyle.toString();

    const debtCollection = customBudetFrame.DebtCollection;
    const incomeCollection = customBudetFrame.IncomeCollection;
    const currentUser = customBudetFrame.user;
    const payUserOptions = customBudetFrame.payUserOptions;
    const useLeftOver = customBudetFrame.useLeftOver;
    let customBudetOutcome = new CustomBudgetOutcomeModel;


    let customBudgetArry = [];

    // let totalIncome = 0;
    let sortedArray = [];



    if (CustomPayBareMinimum(debtCollection, incomeCollection)) {



        sortedArray = SortDebtCustom(debtCollection, 'percentOfIncome', 'high');
        let totalIncome = DivideIncomeByOurr(incomeCollection);
        let budgetOutcomeArry = CustomDebtPaymentFrame(sortedArray, totalIncome);

        if (useLeftOver == true) {

            let remainingOutcomeArry = PayOffRemainingDebt(budgetOutcomeArry)
            // console.log(remainingOutcomeArry);

            let amountLeftOver = FindAmountLeftOver(remainingOutcomeArry)


            if (CheckIfAllDebtsArePaid(remainingOutcomeArry) && amountLeftOver > 0) {
                customBudetOutcome.AllDebtsPayedOff = true;
                customBudetOutcome.PayUser.isUserPaid = true;
                customBudetOutcome.PayUser.payAmount = amountLeftOver;



                //console.log(customBudetOutcome);
                // customBudetOutcome.PayUser.payPercent = Make a method that will find the amount of pay was used
                amountLeftOver -= amountLeftOver;

            } else {
                customBudetOutcome.AllDebtsPayedOff = CheckIfAllDebtsArePaid(remainingOutcomeArry);
                if (amountLeftOver > 0) {
                    customBudetOutcome.isUserPaid = true;
                    customBudetOutcome.payAmount = amountLeftOver;
                    // customBudetOutcome.PayUser.payPercent = Make a method that will find the amount of pay was used
                    amountLeftOver -= amountLeftOver;
                } else {
                    customBudetOutcome.isUserPaid = false;
                    customBudetOutcome.payAmount = amountLeftOver;
                    // customBudetOutcome.PayUser.payPercent = Make a method that will find the amount of pay was used
                    amountLeftOver -= amountLeftOver;
                }

            }

            remainingOutcomeArry.forEach((arry) => {

                let customPayOffTimeFrame = new customDebtPayOffTimeFrameModel;

                customPayOffTimeFrame.creditorName = arry.creditorName;
                //console.log(customPayOffTimeFrame.creditorName);
                customPayOffTimeFrame.originalDebtAmount = arry.originalDebtAmount;

                customPayOffTimeFrame.currentDebtAmount = arry.currentDebtAmount;
                customPayOffTimeFrame.percentOfPayUsed = arry.percentOfPayUsed;
                customPayOffTimeFrame.isPayedOff = arry.isPayedOff;
                //   console.log(customPayOffTimeFrame.isPayedOff)
                customPayOffTimeFrame.payOffStyle = payOffStyle;
                customPayOffTimeFrame.amountLeftOver = amountLeftOver;
                //  console.log(customPayOffTimeFrame.amountLeftOver)

                //customBudgetArry.push(customPayOffTimeFrame)
                // console.log(arry);
                //  console.log(customPayOffTimeFrame);
                customBudetOutcome.customPayOffFrameArry.push(customPayOffTimeFrame);
            })





            //console.log(customBudetOutcome);

        }

        else {

            let amountLeftOver = FindAmountLeftOver(budgetOutcomeArry)


            if (amountLeftOver > 0) {
                customBudetOutcome.PayUser.isUserPaid = true;
                customBudetOutcome.PayUser.payAmount = amountLeftOver;
                // customBudetOutcome.PayUser.payPercent = Make a method that will find the amount of pay was used
                amountLeftOver -= amountLeftOver;

            }
            customBudgetArry = budgetOutcomeArry;


            //PayOffRemainingDebt
            //Paying a user is only going to happen if there is money left over
        }


        return customBudetOutcome
    }

    //customBudetOutcome.customPayOffFrame = customBudgetArry;

    //return customBudetOutcome;


}
export function CreateBudgetFrame() {

}

export function CreateCustomBudgetFrame() {

}

let custBudget = CreateCustomBudget(custFrame);

console.log(custBudget);

// export function UpdateBudget(){

// }

