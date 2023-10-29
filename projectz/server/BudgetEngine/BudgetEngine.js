
import { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel, debtPayOffTimeFrameModel, CustomDebtModel, CustomDebtPayOffTimeFrameModel } from '../MongoSchema/SchemaModel.js'
import {SortDebtCustom, UpdateMiniMumPayment, AmountAddedToCurrentDebt, FindAmountLeftOver, FindAllCurrentDebt, PayOffRemainingDebt, CheckIfAllDebtsArePaid,CustomDebtPaymentFrame,getTotalIncomeAmount,GetTotalIntrest,calculatePayoffDate,GetTotalPayments,GetMonthlyIntrestRate, PayBareMinimum} from './HelperFuctions.js'
//import * as HelperFuctionsJs from './HelperFuctions.js'


let frame = new budgetFrameModel;
let car = new DebtModel;
let CuraLeaf = new DebtModel;
let BestBuy = new DebtModel;
let Discover = new DebtModel;

let drugs = new IncomeModel;
let guns = new IncomeModel;
let moreGuns = new IncomeModel;

guns.name = 'guns';
guns.amount = 200;
guns.occurrence = 'weekly';

moreGuns.name = 'drugs';
moreGuns.amount = 300;
moreGuns.occurrence = 'bi-weekly';

drugs.name = 'drugs';
drugs.amount = 3000;
drugs.occurrence = 'annually';



car.creditorName = 'Car'
car.originalDebtAmount = 400;
car.currentDebtAmount =400;
car.intrestRate = 0.3;
car.originalMinumnPayment =60;
car.minumnPayment = 60;
car.isPayedOff = false;

// car.creditorName = 'loan'
// car.originalDebtAmount = 550;
// car.currentDebtAmount =550;
// car.intrestRate = 0.3;
// car.originalMinumnPayment =55;
// car.minumnPayment = 55;
// car.isPayedOff = false;

CuraLeaf.creditorName = 'Cura Leaf'
CuraLeaf.originalDebtAmount = 600;
CuraLeaf.currentDebtAmount =600;
CuraLeaf.intrestRate = 0.6;
CuraLeaf.originalMinumnPayment =80;
CuraLeaf.minumnPayment = 80;
CuraLeaf.isPayedOff = false;

BestBuy.creditorName = 'Best Buy'
BestBuy.originalDebtAmount = 500;
BestBuy.currentDebtAmount =500;
BestBuy.intrestRate = 0.5;
BestBuy.originalMinumnPayment =70;
BestBuy.minumnPayment = 70;
BestBuy.isPayedOff = false;

Discover.creditorName = 'Discover'
Discover.originalDebtAmount = 760;
Discover.currentDebtAmount =760;
Discover.intrestRate = 0.7;
Discover.originalMinumnPayment =75;
Discover.minumnPayment = 75;
Discover.isPayedOff = false;


let DebtCollection = [];
let IncomeCollection = [];
 DebtCollection.push(car)
 DebtCollection.push(CuraLeaf)
 DebtCollection.push(BestBuy)
 DebtCollection.push(Discover)

 IncomeCollection.push(guns)
 IncomeCollection.push(drugs)
 IncomeCollection.push(moreGuns)



// let CustDebtArry = [

//     {
//       creditorName: "payPal",
//       originalDebtAmount: 4109,
//       currentDebtAmount: 4109,
//       percentOfPayUsed: 3,
//       amountOfPayUsed: 0,
//       isPayedOff: false,
//       payOffStyle: "",
//       lastUpdated: Date.now(),
//       amountLeftOver: 0,
//     },
//     {
//       creditorName: "policeAndFire",
//       originalDebtAmount: 2450,
//       currentDebtAmount: 2450,
//       percentOfPayUsed: 2,
//       amountOfPayUsed: 0,
//       isPayedOff: false,
//       payOffStyle: "",
//       lastUpdated: Date.now(),
//       amountLeftOver: 0,
//     },
//     {
//       creditorName: "420 Empire",
//       originalDebtAmount: 4020,
//       currentDebtAmount: 4020,
//       percentOfPayUsed: 3,
//       amountOfPayUsed: 0,
//       isPayedOff: false,
//       payOffStyle: "",
//       lastUpdated: Date.now(),
//       amountLeftOver: 0,
//     },
//     {
//       creditorName: "Disover",
//       originalDebtAmount: 3970,
//       currentDebtAmount: 3970,
//       percentOfPayUsed: 2,
//       amountOfPayUsed: 0,
//       isPayedOff: false,
//       payOffStyle: "",
//       lastUpdated: new Date(),
//       amountLeftOver: 0,
//     }
//   ]
let user = {
    name: '0',
    userName: 'That guy'
}
//  DebtCollection = [
//     {
//       creditorName: "Car",
//       originalDebtAmount: 40000,
//       currentDebtAmount: 40000,
//       intrestRate: 0.3,
//       OriginalMinumnPayment: 600,
//       minumnPayment: 600,
//       isPayedOff: false,
  
//     },
//     {
//       creditorName: "CuraLeaf",
//       originalDebtAmount: 500,
//       currentDebtAmount: 500,
//       intrestRate: 0.1,
//       OriginalMinumnPayment: 60,
//       minumnPayment: 60,
//       isPayedOff: false,
//     },
//     {
//       creditorName: "Best Buy",
//       originalDebtAmount: 509,
//       currentDebtAmount: 509,
//       intrestRate: 0.4,
//       OriginalMinumnPayment: 60,
//       minumnPayment: 60,
//       isPayedOff: false,
//     },
//     {
//       creditorName: "Discover",
//       originalDebtAmount: 1009,
//       currentDebtAmount: 1009,
//       intrestRate: 0.9,
//       OriginalMinumnPayment: 60,
//       minumnPayment: 60,
//       isPayedOff: false,
//     }
// ],
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

//When a full budget model has been created and everthing has been caculated, all a user will have to do
//is login and all active budgetFrames will popup.
//A user will have the option to edit the budgetFrame upon logging in if necicary.
//When the user logs in all of the payments they should of made will show up and the user will be asked if they have made the payment 

//console.log(frame);

export function CreateBudget(budetFrame = new budgetFrameModel){

    const payOffStyle = budetFrame.payOffStyle.toString();

    const debtCollection = budetFrame.DebtCollection;
    const incomeCollection = budetFrame.IncomeCollection;
    const currentUser = budetFrame.user;

    let budgetOutcome = new BudgetOutcomeModel;

    let sortedArray = [];
   // let updatedArray = [];
    let minimumAdded = 0;

    //const allIncome = get all of the income from the collection 

    budgetOutcome.user = currentUser;

    //Pay the smallest debt as fast as 
    //possible. Pay minimums on all other debt.
    if(payOffStyle === 'snowball'){

        if(PayBareMinimum(debtCollection, incomeCollection)){

              //Sort the Array depending on the pay Off style
              sortedArray = SortDebtCustom(debtCollection, 'originalDebtAmount', 'low');

              //console.log(sortedArray);
              //Grab the first debt in the Array and modify the miniumPayment
              //Add what is left of the money to the miniumPayment
              minimumAdded = AmountAddedToCurrentDebt(debtCollection, incomeCollection);
              //console.log(minimumAdded);
            let  updatedArray = UpdateMiniMumPayment(sortedArray, minimumAdded);
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
                    outputTimeFrame.intrestPayed =GetMonthlyIntrestRate(arry.intrestRate);

                    outputTimeFrame.PaymentDate = arry.dueDate;
                    outputTimeFrame.payOffStyle = payOffStyle;
                    outputTimeFrame.PayOffDate = calculatePayoffDate(arry.originalDebtAmount, arry.intrestRate, arry.minumnPayment)

                    budgetOutcome.DebtPayOffArray.push(outputTimeFrame);
                })
              

              
                return budgetOutcome

        }else{

            //Let the User know the income will not pay off the debt.
        }
      
       



    //Pay the largest or highest interest rate debt as 
 //fast as possible. Pay minimums on all other debt.
    }else if(payOffStyle === 'avalanche'){

        if(PayBareMinimum(debtCollection, incomeCollection)){

            //Sort the Array depending on the pay Off style
            sortedArray = SortDebtCustom(debtCollection, 'intrestRate', 'high');

            //console.log(sortedArray);
            //Grab the first debt in the Array and modify the miniumPayment
            //Add what is left of the money to the miniumPayment
            minimumAdded = AmountAddedToCurrentDebt(debtCollection, incomeCollection);
            //console.log(minimumAdded);
          let  updatedArray = UpdateMiniMumPayment(sortedArray, minimumAdded);
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
                  outputTimeFrame.intrestPayed =GetMonthlyIntrestRate(arry.intrestRate);

                  outputTimeFrame.PaymentDate = arry.dueDate;
                  outputTimeFrame.payOffStyle = payOffStyle;
                  outputTimeFrame.PayOffDate = calculatePayoffDate(arry.originalDebtAmount, arry.intrestRate, arry.minumnPayment)

                  budgetOutcome.DebtPayOffArray.push(outputTimeFrame);
              })
            

            
              return budgetOutcome

      }else{

          //Let the User know the income will not pay off the debt.
      }

    }
    else if(payOffStyle === 'minimun'){

        if(PayBareMinimum(debtCollection, incomeCollection)){

            //Sort the Array depending on the pay Off style
            sortedArray = SortDebtCustom(debtCollection, 'intrestRate', 'high');

            //console.log(sortedArray);
            //Grab the first debt in the Array and modify the miniumPayment
            //Add what is left of the money to the miniumPayment

           // minimumAdded = AmountAddedToCurrentDebt(debtCollection, incomeCollection);
            //console.log(minimumAdded);
          let  updatedArray = debtCollection;
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
                  outputTimeFrame.intrestPayed =GetMonthlyIntrestRate(arry.intrestRate);

                  outputTimeFrame.PaymentDate = arry.dueDate;
                  outputTimeFrame.payOffStyle = payOffStyle;
                  outputTimeFrame.PayOffDate = calculatePayoffDate(arry.originalDebtAmount, arry.intrestRate, arry.minumnPayment)

                  budgetOutcome.DebtPayOffArray.push(outputTimeFrame);
              })
            

            
              return budgetOutcome

      }else{

          //Let the User know the income will not pay off the debt.
      }
    }

    return budgetOutcome;

}

// let outCome = CreateBudget(frame);
// console.log(outCome);


export function CreateCustomBudget(customBudetFrame = new CustomBudgetFrameModel){

    const payOffStyle = customBudetFrame.payOffStyle.toString();

    const debtCollection = customBudetFrame.DebtCollection;
    const incomeCollection = customBudetFrame.IncomeCollection;
    const currentUser = customBudetFrame.user;
    const payUserOptions = customBudetFrame.payUserOptions;

    


}

export function CreateBudgetFrame(){

}

export function CreateCustomBudgetFrame(){

}

export function UpdateBudget(){

}

