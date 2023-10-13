import { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel, debtPayOffTimeFrameModel } from '../MongoSchema/SchemaModel.js'
import {log,ceil,} from 'mathjs'
//import { UserModel } from "../MongoSchema/SchemaModel";

//Model vars
// let User = new UserModel;
// let Debt = new DebtModel;
// let Income = new IncomeModel;
// let budgetFrame = new budgetFrameModel;
// let CustomBudgetFrame = new CustomBudgetFrameModel;
// let BudgetOutcome = new BudgetOutcomeModel;
// let CustomBudgetOutcome = new CustomBudgetOutcomeModel;

//import {UserModel} from '../MongoSchema/SchemaModel.js';

let debt = new DebtModel;

debt.intrestRate = 4.3;
let testArray = [33,55,11,3,54,89,34,2,47,65]

export function ReturnHalf(){

}

export function ReturnPercentage(User, dividend){


}

export function SubtractAmountFromDebt(debt, amount){


}

export function PayCurrentDebt(debt, amount){

}

export function FindLowestDebtItem(debtArray){

  let goodInput = CheckMethodType(debtArray, 'array');

  if(goodInput){
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
  else{
    debtArray
  }
 
  
}


export function FindLowestDebtArray(debtArray){

  let goodInput = CheckMethodType(debtArray, 'array');

  if(goodInput){
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
    return debtArray;
  }
  else{
    debtArray
  }
 
  
}

//console.log(FindLowestDebtItem(testArray))

//list the debts by lowest intrest rate
export function SortDebtbyIntrestLowToHigh(intrestArray){

  let goodInput = CheckMethodType(intrestArray, 'array');

  if(goodInput){
    for (let i = 0; i < intrestArray.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < intrestArray.length; j++) {
        if (intrestArray[j] < intrestArray[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        const temp = intrestArray[i];
        intrestArray[i] = intrestArray[minIndex];
        intrestArray[minIndex] = temp;
      }
    }
    return intrestArray;
  }
  else {
    return intrestArray;
  }

  
}

export function getlowestDebtItem(intrestArray){

  let goodInput = CheckMethodType(intrestArray, 'array');

  if(goodInput){
    for (let i = 0; i < intrestArray.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < intrestArray.length; j++) {
        if (intrestArray[j] < intrestArray[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        const temp = intrestArray[i];
        intrestArray[i] = intrestArray[minIndex];
        intrestArray[minIndex] = temp;
      }
    }
    return intrestArray[0];
  }
  else {
    return intrestArray;
  }

  
}
//console.log(getlowestDebtItem(testArray));

//list the debts by highest intrest rate
export function SortDebtbyIntrestHighToLow(intrestArray){

  let goodInput = CheckMethodType(intrestArray, 'array');

  if(goodInput){
     // Create a copy of the array and reverse it
     const reversedArr = [...intrestArray].sort((a, b) => b - a);
     return reversedArr;
  }
  else{

    return intrestArray;
  }
 

}
//console.log(SortDebtbyIntrestHighToLow(testArray))
export function SortDebtCustom(){

}

//use the bugetFrame Object to return am array of days it will take 
export function FindPayOffDate(budgetFrameObject){



}

export function FindIntrestRateAI(){
  //Future idea
    //Use AI (Maybe) to find the intrest rate of a debt 
}

export function UpdateDebt(){

}

//Securitry
//Returns a true / false if the method arg matches the type
export function CheckMethodType(input, type){

  //The input is the data that is being passed through the parent method
  //The type is a string that will say what type of data should of been passed to the method


  let correctAmount = false;

    switch(type){

      case 'string':
        if(typeof input === 'string'){
          correctAmount = true;
        }
        else{
          correctAmount = false;
        }
        return correctAmount;

      case 'number':
        if(Number.isInteger(input) ){
          correctAmount = true;
        }
        else{
          correctAmount = false;
        }

      return correctAmount;

      case 'float':

      if (typeof input === 'number' && !Number.isInteger(input) || Number.isInteger(input)){
        correctAmount = true;
      }
      else{
        correctAmount = false;
      }
      return correctAmount;

      case 'array':
        if(Array.isArray(input)){
          correctAmount = true;
        }
        else{
          correctAmount = false;
        }
      
      return correctAmount;

      default:
        return correctAmount;
    }



}

//console.log(CheckMethodType(1.9, 'float'))



//A method to update the number of payments left

//A method that will show the current number of payments left if the user reports no change

//A method to find the intrest of the debt object
//Given the intrest rate and the debt amount, this method will return the intrest rate
export function GetMonthlyIntrestRate(intrestRate){

  let goodIntrestRatePercent = CheckMethodType(intrestRate,'float');
  let goodIntrestRateInt = CheckMethodType(intrestRate,'number');
  ///let goodDebtAmount = CheckMethodType(debtAmount,'float')
  

  if(goodIntrestRatePercent ||  goodIntrestRateInt){

    //let percent = (intrestRate / 100)
    

    const monthlyIntrestRate = intrestRate / 12;

   return monthlyIntrestRate;

  }else{
    return intrestRate
  }

  
  
}

//A method to get the total number of payments
export function GetTotalPayOffMonths(debtAmount,intrestRate,payment){

    let isGoodAmount = CheckMethodType(debtAmount, 'float');
    let isGoodRate = CheckMethodType(intrestRate, 'float');
    let isGoodPayment = CheckMethodType(payment, "float")
    let totalMonths = 0;
    let monthlyIntrestRate = 0;


    if(isGoodAmount && isGoodPayment && isGoodRate){
       // monthlyIntrestRate = GetMonthlyIntrestRate(intrestRate);
       monthlyIntrestRate = intrestRate /12;
     //   totalMonths = -log(1 - ((amount * monthlyIntrestRate)/ payment)) / log(1 + monthlyIntrestRate)
        //totalMonths = -log(1 - ((10000 * 0.004167) / 200)) / log(1 + 0.004167) //≈ 68.75

      //totalMonths =               -Math.log(1 - (amount * monthlyIntrestRate / payment)) / Math.log(1 + monthlyIntrestRate) 
    let totalMonths = -Math.log(1 - (debtAmount * monthlyIntrestRate / payment)) / Math.log(1 + monthlyIntrestRate);
  


      const totalPayMonths = ceil(totalMonths);

      return totalPayMonths
    }else{

    }

   // return totalMonths;


}


//A method to update how much intresst have been payed so far.

//console.log(GetMonthlyIntrestRate(0.05));
console.log(GetTotalPayOffMonths(40000, 0.04, 500));

function calculatePayoffDate(debtAmount, annualInterestRate, monthlyPayment) {
  // Calculate the monthly interest rate
  const monthlyInterestRate = annualInterestRate / 12;
  
  // Calculate the number of months required to pay off the debt
  const numberOfMonths = -Math.log(1 - (debtAmount * monthlyInterestRate / monthlyPayment)) / Math.log(1 + monthlyInterestRate);
  
  // Round up to the nearest whole month
  const roundedMonths = Math.ceil(numberOfMonths);
  
  // Calculate the payoff date
  const today = new Date();
  const payoffDate = new Date(today.getFullYear(), today.getMonth() + roundedMonths, today.getDate());
  
  return payoffDate.toDateString();
}

console.log(calculatePayoffDate(40000,0.03,500));

//Number of Months = -log(1 - ((Debt Amount x Monthly Interest Rate) / Monthly Payment)) / log(1 + Monthly Interest Rate)


