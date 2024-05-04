//import { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel, debtPayOffTimeFrameModel, CustomDebtModel, customDebtPayOffTimeFrameModel } from '../MongoSchema/SchemaModel.js'
//import { log, ceil, } from 'mathjs'
//import { UserModel } from "../MongoSchema/SchemaModel";
//import { Finance } from 'financejs'
//import { pmtjs } from 'pmtjs'
const { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel, debtPayOffTimeFrameModel, CustomDebtModel, customDebtPayOffTimeFrameModel } = require('../MongoSchema/SchemaModel.js')
//let SortDebtCustom, CustomPayBareMinimum, UpdateMiniMumPayment, AmountAddedToCurrentDebt, FindAmountLeftOver, FindAllCurrentDebt, PayOffRemainingDebt, CheckIfAllDebtsArePaid, CustomDebtPaymentFrame, getTotalIncomeAmount, GetTotalIntrest, calculatePayoffDate, GetTotalPayments, GetMonthlyIntrestRate, PayBareMinimum, DivideIncomeByOurr, ReturnErrorFrame = require('../../BudgetEngine/HelperFuctions.js');
const Finance = require('financejs');
let log, ceil = require('mathjs')
let finance = new Finance();


let testArray = [33, 55, 11, 3, 54, 89, 34, 2, 47, 65]
let testArray2 = [80, 200, '|', 40, 100, '|', 50, 300, '|']
const testArray3 = testArray2.splice(5);
const incomeArry = [

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


]
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

let RegularDebtArry = [
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
  }
]


function PayCurrentDebt(debt, amount) {

}

function FindLowestDebtItem(debtArray) {

  let goodInput = CheckMethodType(debtArray, 'array');

  if (goodInput) {
    for (let i = 0; i < debtArray.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < debtArray.length; j++) {
        if (debtArray[j] < debtArray[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        const temp = debtArray[i];
        debtArray[i] = debtArray[minIndex];
        debtArray[minIndex] = temp;
      }
    }
    return debtArray[0];
  }
  else {
    debtArray
  }


}


//---------------------------------------------BUDGET


//A method to get the total number of payments
function GetTotalPayments(initialLoanAmount, annualInterestRate, monthlyPayment) {

  let isGoodAmount = CheckMethodType(initialLoanAmount, 'float');
  let isGoodRate = CheckMethodType(annualInterestRate, 'float');
  let isGoodPayment = CheckMethodType(monthlyPayment, "float")
  let totalMonths = 0;
  let monthlyIntrestRate = 0;


  if (isGoodAmount && isGoodPayment && isGoodRate) {

    if (initialLoanAmount == monthlyPayment) {
      return totalMonths = 1
    }
    else {

      let currentPayment = 0;
      let x = 1;
      let isMin = false;
      while (isMin == false) {


        currentPayment = finance.AM(initialLoanAmount, annualInterestRate, x, 1);

        if (currentPayment >= monthlyPayment) {
          x++;

        }
        else {
          //Check and see if the remaining amount is over 50%
          //if 


          totalMonths = x;
          isMin = true;
        }

      }

    }

  } else {

  }

  return totalMonths;


}


//A method to update how much intresst have been payed so far.

function calculatePayoffDate(initialLoanAmount, annualInterestRate, monthlyPayment) {


  let isGoodAmount = CheckMethodType(initialLoanAmount, 'float');
  let isGoodRate = CheckMethodType(annualInterestRate, 'float');
  let isGoodPayment = CheckMethodType(monthlyPayment, "float")
  if (isGoodAmount && isGoodPayment && isGoodRate) { }

  if (initialLoanAmount === monthlyPayment) {
    //Debt is payed off
    return new Date();
  }
  else {

    let currentPayment = 0;
    let x = 1;
    let isMin = false;
    let roundedMonths = 0;
    while (isMin == false) {


      currentPayment = finance.AM(initialLoanAmount, annualInterestRate, x, 1);

      if (currentPayment >= monthlyPayment) {
        x++;

      }
      else {
        roundedMonths = x;
        isMin = true;
      }

    }
    // Round up to the nearest whole month
    //const monthlyInterestRate = annualInterestRate / 12 / 100;
    // Calculate the number of months to pay off the debt
    //const monthsToPayOff = finance.PMT(monthlyInterestRate, -monthlyPayment, initialLoanAmount);
    //const roundedMonths = Math.ceil(monthsToPayOff);
    // Calculate the payoff date
    const today = new Date();
    const payoffDate = new Date(today.getFullYear(), today.getMonth() + roundedMonths, today.getDate());
    return payoffDate.toDateString();
  }


}

function GetTotalIntrest(initialLoanAmount, minimumPayment, loanTermInMonths) {

  let isGoodAmount = CheckMethodType(initialLoanAmount, 'float');
  let isGoodTerm = CheckMethodType(loanTermInMonths, 'float');
  let isGoodPay = CheckMethodType(minimumPayment, "float")
  if (isGoodAmount && isGoodPay && isGoodTerm) {

    // const monthlyInterestRate = annualInterestRate / 12 / 100;
    // const monthlyPayment = (initialLoanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    // const totalPayments = monthlyPayment * numberOfPayments;
    const totalAmount = minimumPayment * loanTermInMonths;
    const totalInterestPaid = (totalAmount - initialLoanAmount);

    return totalInterestPaid;


    // Example usage:




  } else {

  }
  // Calculate the monthly interest rate



}

//A method to find the intrest of the debt object
//Given the intrest rate and the debt amount, this method will return the intrest rate
function GetMonthlyIntrestRate(intrestRate) {

  let goodIntrestRatePercent = CheckMethodType(intrestRate, 'float');
  let goodIntrestRateInt = CheckMethodType(intrestRate, 'number');
  ///let goodDebtAmount = CheckMethodType(debtAmount,'float')


  if (goodIntrestRatePercent || goodIntrestRateInt) {

    //let percent = (intrestRate / 100)


    const monthlyIntrestRate = intrestRate / 12;

    return monthlyIntrestRate;

  } else {
    return intrestRate
  }



}

function FindAllOriginalDebt(customArry = []) {
  let goodCustomArry = CheckMethodType(customArry, 'array');
  let totalDebt = 0;

  if (goodCustomArry) {
    customArry.forEach((arry) => {
      totalDebt += arry.originalDebtAmount;

    })

  }

  return totalDebt;
}

//returns the amount that will be added to the minimum payment to help pay it off faster.
function AmountAddedToCurrentDebt(debtArry = [], incomeArry = []) {

  const goodDebtArry = CheckMethodType(debtArry, 'array');
  const goodIncomeArry = CheckMethodType(incomeArry, 'array');
  let amountToBeAdded = 0;
  let allMinimum = 0;
  let totalIncome = 0;

  if (goodDebtArry && goodIncomeArry) {

    debtArry.forEach((debt) => {
      allMinimum = allMinimum + debt.originalMinumnPayment;

    })

    totalIncome = DivideIncomeByOurr(incomeArry);

    amountToBeAdded = (totalIncome - allMinimum);

    return amountToBeAdded;

  } else {

    //IDK 
  }

}

function UpdateMiniMumPayment(debtArry = [], amount) {

  const goodDebtArry = CheckMethodType(debtArry, 'array');
  const goodAmount = CheckMethodType(amount, 'float');

  if (goodDebtArry && goodAmount) {



    let tempAmount = 0;
    let incrementer = 0;



    for (let i = 0; i < debtArry.length; i++) {
      if (amount > debtArry[i].originalDebtAmount) {

        debtArry[i].minumnPayment = debtArry[i].originalDebtAmount;
        debtArry[i].isPayedOff = true;
        amount -= debtArry[i].originalDebtAmount
      }
      else {
        if (amount != 0) {
          debtArry[i].minumnPayment += amount;
          amount -= amount;
        }

      }
      if (amount == 0) {
        break;
      }
    }


    return debtArry;

  } else {
    return debtArry;
  }
}


function PayBareMinimum(debtArry = [], incomeArry = []) {

  const goodDebtArry = CheckMethodType(debtArry, 'array');
  const goodIncomeArry = CheckMethodType(incomeArry, 'array');
  let canPayMinimum = false;
  let totalIncome = 0;
  let allDebtMinimum = 0;

  if (goodDebtArry && goodIncomeArry) {

    totalIncome = DivideIncomeByOurr(incomeArry);
    debtArry.forEach((debt) => {
      allDebtMinimum += debt.minumnPayment;
    })

    if (totalIncome >= allDebtMinimum) {
      canPayMinimum = true;
    } else {
      canPayMinimum = false;
    }

    return canPayMinimum;


  } else {
    //Not sure yet

  }
}

//-----------------------------------------CUSTOM

function CustomDebtPaymentFrame(customArry = [], totalIncome) {

  const goodCustomArry = CheckMethodType(customArry, 'array');
  const goodIncome = CheckMethodType(totalIncome, 'float');
  let returnArry = [];



  if (goodCustomArry && goodIncome) {
    //loop through customArry and use the percent of pay to determin how 
    //much of the total Income will go to paying off that debt.
    customArry.forEach((Arry) => {
      let customDebtFrame = new customDebtPayOffTimeFrameModel;


      let amountOfPay = 0;
      let percentOfPay = Arry.percentOfIncome;

      amountOfPay = ReturnPercentageAmount(percentOfPay, totalIncome);

      if (amountOfPay >= Arry.originalDebtAmount) {

        if ((amountOfPay - Arry.originalDebtAmount) > 0) {
          Arry.isPayedOff = true;
          Arry.amountLeftOver = ((amountOfPay - Arry.originalDebtAmount));
          Arry.currentDebtAmount = 0;
          Arry.amountOfPayUsed = amountOfPay;
          Arry.payOffStyle = "custom"
        }

      } else if ((amountOfPay - Arry.originalDebtAmount) <= 0) {
        Arry.currentDebtAmount = SubtractAmountFromDebt(Arry.originalDebtAmount, amountOfPay);
        if (Arry.currentDebtAmount > 0) {
          Arry.isPayedOff == false;
        }
        Arry.amountOfPayUsed = amountOfPay;
        Arry.payOffStyle = "custom"
      }


      customDebtFrame.creditorName = Arry.creditorName;
      customDebtFrame.originalDebtAmount = Arry.originalDebtAmount;
      customDebtFrame.currentDebtAmount = Arry.currentDebtAmount;
      customDebtFrame.percentOfIncome = Arry.percentOfIncome;
      customDebtFrame.isPayedOff = Arry.isPayedOff;
      customDebtFrame.amountOfPayUsed = Arry.amountOfPayUsed;
      customDebtFrame.lastUpdated = Date.now();
      customDebtFrame.amountLeftOver = Arry.amountLeftOver;

      returnArry.push(customDebtFrame);

    })








    return returnArry;



  }
  else {

  }

}
//This method will use the amount left over to pay off the remain debts
function PayOffRemainingDebt(customArry = []) {

  const goodCustomArry = CheckMethodType(customArry, 'array');
  let totalLeftOver = 0;

  if (goodCustomArry) {


    customArry.forEach((arry) => {

      if (arry.isPayedOff == true && arry.amountLeftOver > 0) {
        totalLeftOver += arry.amountLeftOver;
        arry.amountLeftOver = 0;
      }

    })

    customArry.forEach((arry) => {

      if (totalLeftOver == 0) {
        return
      }
      else {
        if (arry.isPayedOff == false) {
          if (totalLeftOver > arry.currentDebtAmount) {
            totalLeftOver -= arry.currentDebtAmount
            arry.currentDebtAmount = 0;
            arry.isPayedOff = true;
          }
          else {
            if (totalLeftOver > 0) {
              arry.currentDebtAmount -= totalLeftOver;
              totalLeftOver -= totalLeftOver;


            }
          }
        }
      }

    })

    if (totalLeftOver > 0) {
      let x = totalLeftOver;
      customArry[0].amountLeftOver = x;

    }

    return customArry;
  }

}

//runs through all of the debt and returns the total
function FindAllCurrentDebt(customArry = []) {
  let goodCustomArry = CheckMethodType(customArry, 'array');
  let totalDebt = 0;

  if (goodCustomArry) {
    customArry.forEach((arry) => {
      totalDebt += arry.currentDebtAmount;

    })

  }

  return totalDebt;
}

//Used at the end to return the amount leftover to the user
function FindAmountLeftOver(customArry = []) {

  let goodCustomArry = CheckMethodType(customArry, 'array');
  let totalAmount = 0;

  if (goodCustomArry) {
    customArry.forEach((arry) => {
      totalAmount += arry.amountLeftOver;

    })

  }

  return totalAmount;

}

//returns a bool value if all of the current debts are paid
function CheckIfAllDebtsArePaid(customArry = []) {

  const goodCustomArry = CheckMethodType(customArry, 'array');
  let allDebtsPaid = false;
  let debtCount = 1;

  if (goodCustomArry) {
    customArry.forEach((arry) => {
      if (arry.currentDebtAmount > 0) {
        debtCount = debtCount + 1;
      }
    })
    if (debtCount > 1) {
      allDebtsPaid = false;
    }
    else if (debtCount === 1) {
      allDebtsPaid = true;
    }
    return allDebtsPaid
  }


}

function CustomPayBareMinimum(debtArry = [], incomeArry = []) {

  const goodDebtArry = CheckMethodType(debtArry, 'array');
  const goodIncomeArry = CheckMethodType(incomeArry, 'array');
  let canPayMinimum = false;
  let totalIncome = 0;
  let allDebtMinimum = 0;

  if (goodDebtArry && goodIncomeArry) {

    totalIncome = DivideIncomeByOurr(incomeArry);
    debtArry.forEach((debt) => {
      allDebtMinimum += debt.originalDebtAmount;
    })

    if (totalIncome >= allDebtMinimum) {
      canPayMinimum = true;
    } else {
      canPayMinimum = false;
    }

    return canPayMinimum;


  } else {
    //Not sure yet

  }
}

//-----------------------------------------------------BOTH

//Returns a true / false if the method arg matches the type
function CheckMethodType(input, type) {

  //The input is the data that is being passed through the parent method
  //The type is a string that will say what type of data should of been passed to the method


  let correctAmount = false;

  switch (type) {

    case 'string':
      if (typeof input === 'string') {
        correctAmount = true;
      }
      else {
        correctAmount = false;
      }
      return correctAmount;

    case 'number':
      if (Number.isInteger(input)) {
        correctAmount = true;
      }
      else {
        correctAmount = false;
      }

      return correctAmount;

    case 'float':

      if (typeof input === 'number' && !Number.isInteger(input) || Number.isInteger(input)) {
        correctAmount = true;
      }
      else {
        correctAmount = false;
      }
      return correctAmount;

    case 'array':
      if (Array.isArray(input)) {
        correctAmount = true;
      }
      else {
        correctAmount = false;
      }

      return correctAmount;

    default:
      return correctAmount;
  }



}

function SortDebtCustom(customArry = [], sortItem = '', direction = '') {

  const goodArray = CheckMethodType(customArry, 'array');
  const goodSort = CheckMethodType(sortItem, 'string');
  const goodDirection = CheckMethodType(direction, 'string')

  if (goodArray && goodSort && goodDirection) {
    if (direction.toLowerCase() == 'low') {
      switch (sortItem) {

        case 'originalDebtAmount':
          customArry.sort((a, b) => a.originalDebtAmount - b.originalDebtAmount)
          break;
        case 'currentDebtAmount':
          customArry.sort((a, b) => a.currentDebtAmount - b.currentDebtAmount)
          break;
        case 'percentOfPayUsed':
          customArry.sort((a, b) => a.percentOfPayUsed - b.percentOfPayUsed)
          break;
        case 'amountOfPayUsed':
          customArry.sort((a, b) => a.amountOfPayUsed - b.amountOfPayUsed)
          break;
        case 'amountLeftOver':
          customArry.sort((a, b) => a.amountLeftOver - b.amountLeftOver)
          break;
        case 'intrestRate':
          customArry.sort((a, b) => a.intrestRate - b.intrestRate)
          break;
        case 'minumnPayment':
          customArry.sort((a, b) => a.minumnPayment - b.minumnPayment)
          break;
        case 'monthlyPayment':
          customArry.sort((a, b) => a.monthlyPayment - b.monthlyPayment)
          break;
        case 'originalMinumnPayment':
          customArry.sort((a, b) => a.originalMinumnPayment - b.originalMinumnPayment)
          break;
        case 'percentOfIncome':
          customArry.sort((a, b) => a.percentOfIncome - b.percentOfIncome)
          break;

      }

    } else if (direction.toLowerCase() == 'high') {
      switch (sortItem) {

        case 'originalDebtAmount':
          customArry.sort((a, b) => b.originalDebtAmount - a.originalDebtAmount)
          break;
        case 'currentDebtAmount':
          customArry.sort((a, b) => b.currentDebtAmount - a.currentDebtAmount)
          break;
        case 'percentOfPayUsed':
          customArry.sort((a, b) => b.percentOfPayUsed - a.percentOfPayUsed)
          break;
        case 'amountOfPayUsed':
          customArry.sort((a, b) => b.amountOfPayUsed - a.amountOfPayUsed)
          break;
        case 'amountLeftOver':
          customArry.sort((a, b) => b.amountLeftOver - a.amountLeftOver)
          break;
        case 'intrestRate':
          customArry.sort((a, b) => b.intrestRate - a.intrestRate)
          break;
        case 'minumnPayment':
          customArry.sort((a, b) => b.minumnPayment - a.minumnPayment)
          break;
        case 'monthlyPayment':
          customArry.sort((a, b) => b.monthlyPayment - a.monthlyPayment)
          break;
        case 'originalMinumnPayment':
          customArry.sort((a, b) => b.originalMinumnPayment - a.originalMinumnPayment)
          break;
        case 'percentOfIncome':
          customArry.sort((a, b) => b.percentOfIncome - a.percentOfIncome)
          break;

      }
    } else {

    }
    return customArry;

  }

}

function ReturnPercentageAmount(percentage, amount) {
  const goodAmount = CheckMethodType(amount, 'float');
  const goodPercentage = CheckMethodType(percentage, 'float');
  let returnAmount = 0;

  if (goodAmount && goodPercentage) {
    returnAmount = ((amount / 10) * percentage);

  } else {
    return returnAmount
  }

  return returnAmount;

}

function SubtractAmountFromDebt(debt, amount) {


  return debt = debt - amount;

}

//returns the amount of money that is needed per month 
function DivideIncomeByOurr(incomeArry = []) {
  const goodIncome = CheckMethodType(incomeArry, 'array');

  let weeklyIcomeArry = [];
  let biWeeklyIncomeArry = [];
  let semiAnnuallyIncomeArry = [];
  let AnnuallyIncomeArry = [];

  let totalMonthlyIncome = 0;

  if (goodIncome) {

    incomeArry.forEach((income) => {
      switch (income.occurrence) {

        case 'weekly':
          weeklyIcomeArry.push(income.amount);
          break;
        case 'bi-weekly':
          biWeeklyIncomeArry.push(income.amount);
          break;
        case 'semi-annually':
          semiAnnuallyIncomeArry.push(income.amount);
          break;
        case 'annually':
          AnnuallyIncomeArry.push(income.amount);
          break;
      }
    })

    if (weeklyIcomeArry.length >= 1) {

      weeklyIcomeArry.forEach((week) => {

        totalMonthlyIncome += (week * 4)
      })
    }
    if (biWeeklyIncomeArry.length >= 1) {

      biWeeklyIncomeArry.forEach((week) => {

        totalMonthlyIncome += (week * 2)
      })
    }
    if (semiAnnuallyIncomeArry.length >= 1) {

      semiAnnuallyIncomeArry.forEach((week) => {

        totalMonthlyIncome += ((week * 2) / 12)
      })
    }
    if (AnnuallyIncomeArry.length >= 1) {

      AnnuallyIncomeArry.forEach((week) => {

        totalMonthlyIncome += (week / 12)
      })
    }
    return totalMonthlyIncome;

  } else {
    return totalMonthlyIncome;
  }


}


function ReturnErrorFrame(frameType) {

  let errPayOffFrame = new debtPayOffTimeFrameModel;
  let customErrFrame = new customDebtPayOffTimeFrameModel
  const emptyArray = [];


  const goodType = CheckMethodType(frameType, 'string');

  if (goodType) {

    switch (frameType) {

      case 'budgetFrameModel':
        const errorBudget = new budgetFrameModel({ payOffStyle: "Error", UserId: "Error", DebtCollection: emptyArray, IncomeCollection: emptyArray })
        return errorBudget;
        break;

      case 'CustomBudgetFrameModel':
        const errorCustomBudget = new CustomBudgetFrameModel({ payOffStyle: "Error", useLeftOver: false, UserId: "Error", DebtCollection: emptyArray, IncomeCollection: emptyArray })
        return errorCustomBudget;
        break;

      case 'debtPayOffTimeFrameModel':
        const errorPayOffTimeFrame = new debtPayOffTimeFrameModel({ creditorName: "Error", totalPayments: 0, paymentsLeft: 0, MinimumPayment: 0, originalDebtAmount: 0, currentDebtAmount: 0, totalIntrestPaid: 0, intrestPayed: 0, payOffStyle: 'Error', hasError: true });
        return errorPayOffTimeFrame;
        break;

      case 'customDebtPayOffTimeFrameModel':
        const errorCustomPayOffTimeFrame = new customDebtPayOffTimeFrameModel({ creditorName: "Error", percentOfPayUsed: 0, amountLeftOver: 0, amountOfPayUsed: 0, originalDebtAmount: 0, currentDebtAmount: 0, isPayedOff: false, payOffStyle: 'Error', hasError: true });
        return errorCustomPayOffTimeFrame
        break;

      case 'BudgetOutcomeModel':
        const errorBudgetOutcome = new BudgetOutcomeModel({ UserId: " ", DebtPayOffArray: emptyArray, isPayedOff: false });
        return errorBudgetOutcome
        break;

      case 'CustomBudgetOutcomeModel':
        const errorCustomBudgetOutcome = new CustomBudgetOutcomeModel({ UserId: " ", DebtPayOffArray: emptyArray, isPayedOff: false });
        return errorCustomPayOffTimeFrame
        break;
    }

  }
  else {

  }




}


module.exports = { CheckMethodType, ReturnErrorFrame, DivideIncomeByOurr, SubtractAmountFromDebt, ReturnPercentageAmount, SortDebtCustom, CheckMethodType, CustomPayBareMinimum, CheckIfAllDebtsArePaid, FindAmountLeftOver, FindAllCurrentDebt, PayOffRemainingDebt, CustomDebtPaymentFrame, PayBareMinimum, UpdateMiniMumPayment, AmountAddedToCurrentDebt, FindAllOriginalDebt, GetMonthlyIntrestRate, GetTotalIntrest, calculatePayoffDate, GetTotalPayments, FindLowestDebtItem, PayCurrentDebt, }
//A set of fuctions are going to have to be made to update the Budget Frame Models
//Maybe put them in a different folder