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


export function ReturnHalf(){

}

export function ReturnPercentage(User, dividend){



}

export function SubtractAmountFromDebt(debt, amount){


}

export function PayCurrentDebt(debt, amount){

}

export function FindLowestDebt(debArray){

  for (let i = 0; i < debArray.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < debArray.length; j++) {
      if (debArray[j] < debArray[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      const temp = debArray[i];
      debArray[i] = debArray[minIndex];
      debArray[minIndex] = temp;
    }
  }
  return debArray;
}

let testArray = [33,55,11,3,54,89,34,2,47,65]

//list the debts by lowest intrest rate
export function SortDebtbyIntrestLowToHigh(intrestArray){

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



//list the debts by highest intrest rate
export function SortDebtbyIntrestHighToLow(intrestArray){

  // Create a copy of the array and reverse it
  const reversedArr = [...intrestArray].sort((a, b) => b - a);
  return reversedArr;

}
console.log(SortDebtbyIntrestHighToLow(testArray))
export function SortDebtCustom(){

}

//use the bugetFrame Object to return am array of 
export function findPayOffDate(budgetFrameObject){



}

export function findIntrestRate(){
  //Fu
    //Use AI (Maybe) to find the intrest rate of a debt 
}

export function updateDebt(){

}