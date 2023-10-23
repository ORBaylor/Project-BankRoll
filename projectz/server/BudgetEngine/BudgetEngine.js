
import { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel, debtPayOffTimeFrameModel, CustomDebtModel } from '../MongoSchema/SchemaModel.js'
import {SortDebtCustom, FindAmountLeftOver, FindAllCurrentDebt, PayOffRemainingDebt, CheckIfAllDebtsArePaid,CustomDebtPaymentFrame,getTotalIncomeAmount,GetTotalIntrest,calculatePayoffDate,GetTotalPayments,GetMonthlyIntrestRate} from './HelperFuctions.js'
//import * as HelperFuctionsJs from './HelperFuctions.js'





let CustDebtArry = [

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
  ]

//When a full budget model has been created and everthing has been caculated, all a user will have to do
//is login and all active budgetFrames will popup.
//A user will have the option to edit the budgetFrame upon logging in if necicary.
//When the user logs in all of the payments they should of made will show up and the user will be asked if they have made the payment 


export function CreateBudget(budetFrame = new budgetFrameModel){

    const payOffStyle = budetFrame.payOffStyle.toString();
    const useMinimunPay = budetFrame.useMinimumPayment;
    const usemonthlyPay = budetFrame.useMonthlyPayment;
    const useIncomeCollection = budetFrame.useIncomeCollection;
    const debtCollection = budetFrame.DebtCollection;
    const incomeCollection = budetFrame.IncomeCollection;
    const currentUser = budetFrame.user;

    //const allIncome = get all of the income from the collection 


    //Pay the smallest debt as fast as 
    //possible. Pay minimums on all other debt.
    if(payOffStyle === 'snowball'){

        //Needs an Income collection
        if(useIncomeCollection === true){

            //use the total income for the budget

            //Use a majority of the income for the smalllest debt and use a db trigger 
            //to update the rest.

        }else{

            if(useMinimunPay == true){

            }
            else if(usemonthlyPay == true){

            }
        }

    //Pay the largest or highest interest rate debt as 
 //fast as possible. Pay minimums on all other debt.
    }else if(payOffStyle === 'avalanche'){

         //Needs an Income collection
        if(useIncomeCollection === true){

            //use the total income for the budget

        }else{

            if(useMinimunPay == true){

            }
            else if(usemonthlyPay == true){

            }
        }

    }
    else if(payOffStyle === 'minimun'){

    }



}

export function CreateCustomBudget(){

}

export function CreateBudgetFrame(){

}

export function CreateCustomBudgetFrame(){

}

