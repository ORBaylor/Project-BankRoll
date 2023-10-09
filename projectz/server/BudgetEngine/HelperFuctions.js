import { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel } from '../MongoSchema/SchemaModel.js'

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
console.log(getlowestDebtItem(testArray));

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

export function FindIntrestRate(){
  //Fu
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
        if(Number.isInteger(input)){
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

