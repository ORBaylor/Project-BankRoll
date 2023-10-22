import { UserModel, DebtModel, IncomeModel, budgetFrameModel, CustomBudgetFrameModel, BudgetOutcomeModel, CustomBudgetOutcomeModel, debtPayOffTimeFrameModel, CustomDebtModel } from '../MongoSchema/SchemaModel.js'
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
let testArray2 = [80,200,'|',40,100,'|',50,300,'|'] 
const testArray3 = testArray2.splice(5);
const incomeArry = [

  {
      amount: 300
  },
  {
     amount: 500
  },
  {
    amount: 100
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
//console.log(testArray3);

//The custom object that will be used
//to change the array of data
// let customDebtObjArry=  [

//     customDebtObj = {
//     id: 0,
//     creditorName: '',
//     totalAmount: 0,
//     amountPayed: 0,
//     amountLeft: 0,
//     isPayedOff: false,
//     }
    
// ]
 

export function ReturnHalf(){

}

//For Custom Debt payoff, Maybe?
export function ReturnPercentageAmount(percentage, amount){
    const goodAmount= CheckMethodType(amount, 'float');
    const goodPercentage = CheckMethodType(percentage, 'float');
    let returnAmount = 0;

    if(goodAmount && goodPercentage){
      returnAmount = ((amount / 10) * percentage);

    }else{
      return returnAmount
    }

    return returnAmount;

}
//console.log(ReturnPercentageAmount(1.5, 400))

export function SubtractAmountFromDebt(debt, amount){


  return debt = debt - amount;

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


// export function FindLowestDebtArrayDecending(debtArray){

//   let goodInput = CheckMethodType(debtArray, 'array');

//   if(goodInput){
//     // for (let i = 0; i < debtArray.length - 1; i++) {
//     //   let minIndex = i;
//     //   for (let j = i + 1; j < debtArray.length; j++) {
//     //     if (debtArray[j] < debtArray[minIndex]) {
//     //       minIndex = j;
//     //     }
//     //   }
//     //   if (minIndex !== i) {
//     //     const temp = debtArray[i];
//     //     debtArray[i] = debtArray[minIndex];
//     //     debtArray[minIndex] = temp;
//     //   }
//     // }
//     debtArray.sort((a,b) => a.originalDebtAmount - b.originalDebtAmount)
    
//     return debtArray;

//     //people.sort((a, b) => a.age - b.age);
//   }
//   else{
//     debtArray
//   }
 
  
// }

export function SortIncome(){

}




//list the debts by lowest intrest rate
// export function SortDebtbyIntrestLowToHigh(intrestArray = []){

//   let goodInput = CheckMethodType(intrestArray, 'array');

//   if(goodInput){
//     for (let i = 0; i < intrestArray.length - 1; i++) {
//       let minIndex = i;
//       for (let j = i + 1; j < intrestArray.length; j++) {
//         if (intrestArray[j] < intrestArray[minIndex]) {
//           minIndex = j;
//         }
//       }
//       if (minIndex !== i) {
//         const temp = intrestArray[i];
//         intrestArray[i] = intrestArray[minIndex];
//         intrestArray[minIndex] = temp;
//       }
//     }
//     return intrestArray;
//   }
//   else {
//     return intrestArray;
//   }

  
// }

// export function getlowestDebtItem(intrestArray){

//   let goodInput = CheckMethodType(intrestArray, 'array');

//   if(goodInput){
//     for (let i = 0; i < intrestArray.length - 1; i++) {
//       let minIndex = i;
//       for (let j = i + 1; j < intrestArray.length; j++) {
//         if (intrestArray[j] < intrestArray[minIndex]) {
//           minIndex = j;
//         }
//       }
//       if (minIndex !== i) {
//         const temp = intrestArray[i];
//         intrestArray[i] = intrestArray[minIndex];
//         intrestArray[minIndex] = temp;
//       }
//     }
//     return intrestArray[0];
//   }
//   else {
//     return intrestArray;
//   }

  
// }


//list the debts by highest intrest rate
// export function SortDebtbyIntrestHighToLow(intrestArray){

//   let goodInput = CheckMethodType(intrestArray, 'array');

//   if(goodInput){
//      // Create a copy of the array and reverse it
//      const reversedArr = [...intrestArray].sort((a, b) => b.intrestRate - a.intrestRate);
//      return reversedArr;
//   }
//   else{

//     return intrestArray;
//   }
 

// }

export function SortDebtCustom(customArry = [], sortItem = '', direction = ''){

  const goodArray = CheckMethodType(customArry, 'array');
  const goodSort = CheckMethodType(sortItem, 'string');
  const  goodDirection = CheckMethodType(direction, 'string')

  if(goodArray && goodSort && goodDirection){
   if(direction.toLowerCase() == 'low'){
      switch(sortItem){

        case 'originalDebtAmount':
          customArry.sort((a,b) => a.originalDebtAmount - b.originalDebtAmount)
          break;
        case 'currentDebtAmount':
          customArry.sort((a,b) => a.currentDebtAmount - b.currentDebtAmount)
          break;
        case 'percentOfPayUsed':
          customArry.sort((a,b) => a.percentOfPayUsed - b.percentOfPayUsed)
          break;
        case 'amountOfPayUsed':
          customArry.sort((a,b) => a.amountOfPayUsed - b.amountOfPayUsed)
          break;
        case 'amountLeftOver':
          customArry.sort((a,b) => a.amountLeftOver - b.amountLeftOver)
          break;
        case 'intrestRate':
          customArry.sort((a,b) => a.intrestRate - b.intrestRate)
          break;
        case 'minumnPayment':
          customArry.sort((a,b) => a.minumnPayment - b.minumnPayment)
          break;
          case 'monthlyPayment':
            customArry.sort((a,b) => a.monthlyPayment - b.monthlyPayment)
            break;

      }

   }else if(direction.toLowerCase() == 'high'){
    switch(sortItem){

      case 'originalDebtAmount':
        customArry.sort((a,b) => b.originalDebtAmount - a.originalDebtAmount )
        break;
      case 'currentDebtAmount':
        customArry.sort((a,b) => b.currentDebtAmount - a.currentDebtAmount )
        break;
      case 'percentOfPayUsed':
        customArry.sort((a,b) => b.percentOfPayUsed - a.percentOfPayUsed )
        break;
      case 'amountOfPayUsed':
        customArry.sort((a,b) => b.amountOfPayUsed - a.amountOfPayUsed )
        break;
      case 'amountLeftOver':
        customArry.sort((a,b) => b.amountLeftOver - a.amountLeftOver )
        break;
      case 'intrestRate':
          customArry.sort((a,b) => b.intrestRate - a.intrestRate)
          break;
      case 'minumnPayment':
          customArry.sort((a,b) => b.minumnPayment - a.minumnPayment)
          break;
      case 'monthlyPayment':
            customArry.sort((a,b) => b.monthlyPayment - a.monthlyPayment)
            break;

    }
   }else{

   }
    return customArry;

  }

}

let protoArry = SortDebtCustom(CustDebtArry, 'currentDebtAmount', 'high');
console.log(protoArry)

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
export function GetTotalPayments(debtAmount,intrestRate,payment){

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

export function calculatePayoffDate(debtAmount, annualInterestRate, monthlyPayment) {
  // Calculate the monthly interest rate
  const monthlyInterestRate = annualInterestRate / 12;
  
  // Calculate the number of months required to pay off the debt
  const numberOfMonths = -Math.log(1 - (debtAmount * monthlyInterestRate / monthlyPayment)) / Math.log(1 + monthlyInterestRate);


  //console.log(((numberOfMonths * monthlyPayment) - debtAmount).toFixed(2));
  // Round up to the nearest whole month
  const roundedMonths = Math.ceil(numberOfMonths);
  
  // Calculate the payoff date
  const today = new Date();
  const payoffDate = new Date(today.getFullYear(), today.getMonth() + roundedMonths, today.getDate());
  
  return payoffDate.toDateString();
}

export function GetTotalIntrest(debtAmount, annualInterestRate, monthlyPayment){

  // Calculate the monthly interest rate
  const monthlyInterestRate = annualInterestRate / 12;
  
  // Calculate the number of months required to pay off the debt
  const numberOfMonths = -Math.log(1 - (debtAmount * monthlyInterestRate / monthlyPayment)) / Math.log(1 + monthlyInterestRate);

  const totalIntrest = ((numberOfMonths * monthlyPayment) - debtAmount).toFixed(2)
  
  return totalIntrest;


}

//Number of Months = -log(1 - ((Debt Amount x Monthly Interest Rate) / Monthly Payment)) / log(1 + Monthly Interest Rate)

//CUSTOM DEBTS

//RETURNS A MAP OF HOW MUCH EACH DEBT WILL BE PAYED.

export function getTotalIncomeAmount(incomeArry = []){

  const goodIncomeArry = CheckMethodType(incomeArry, 'array');
  let returnAmount  = 0;

  if(goodIncomeArry){

     incomeArry.forEach((arry) => {

      returnAmount += arry.amount;

     })

     return returnAmount;
  }

  return returnAmount;
}
//Returns an array of CustomDebtModel with the pay updated
export function CustomDebtPaymentFrame(customArry = [], totalIncome ){

  const goodCustomArry = CheckMethodType(customArry, 'array');
  const goodIncome = CheckMethodType(totalIncome, 'float');
  let returnArry = [];
  let customDebt = new CustomDebtModel;

   
  if(goodCustomArry && goodIncome){
      //loop through customArry and use the percent of pay to determin how 
      //much of the total Income will go to paying off that debt.
      customArry.forEach((Arry) => {

        let percentOfPay = 0;
        let amountOfPay = 0;

       amountOfPay = ReturnPercentageAmount(Arry.percentOfPayUsed, totalIncome);
      
       if(amountOfPay >= Arry.originalDebtAmount){

          if((amountOfPay - Arry.originalDebtAmount) > 0){
            Arry.isPayedOff = true;
            Arry.amountLeftOver = ((amountOfPay - Arry.originalDebtAmount));
            Arry.currentDebtAmount = 0;
            Arry.amountOfPayUsed = amountOfPay;
            Arry.payOffStyle = "custom"
          }
          
       }else if((amountOfPay - Arry.originalDebtAmount) <= 0){
            Arry.currentDebtAmount = SubtractAmountFromDebt(Arry.originalDebtAmount, amountOfPay);
            if(Arry.currentDebtAmount !== 0){
              Arry.isPayedOff == false;
            }
            Arry.amountOfPayUsed = amountOfPay;
            Arry.payOffStyle = "custom"
       }


      })

      return customArry;

      

  }
  else{

  }

}

export function CheckIfAllDebtsArePaid(customArry = []){

  const goodCustomArry = CheckMethodType(customArry, 'array');
  let allDebtsPaid = false;
  let debtCount = 1;

  if(goodCustomArry){
      customArry.forEach((arry) => {
        if(arry.amountLeftOver > 0){
           debtCount = debtCount + 1;
        }
      })
      if(debtCount > 1){
        allDebtsPaid = false;
      }
      else if(debtCount === 1){
        allDebtsPaid = true;
      }
      return allDebtsPaid
  }


}

//This method will use the amount left over to pay off the remain debts
export function PayOffRemainingDebt(customArry = []){

  const goodCustomArry = CheckMethodType(customArry, 'array');
  let totalLeftOver = 0;

  if(goodCustomArry){

    
    customArry.forEach((arry) => {

      if(arry.isPayedOff == true && arry.amountLeftOver > 0){
          totalLeftOver += arry.amountLeftOver;
          arry.amountLeftOver = 0;
      }
      // else {

      //   if(arry.currentDebtAmount > 0 && totalLeftOver > arry)
      // }
    })

    customArry.forEach((arry) =>{

        if(totalLeftOver == 0){
          return
        }
        else{
          if(arry.isPayedOff == false){
            if(totalLeftOver > arry.currentDebtAmount){
                totalLeftOver -= arry.currentDebtAmount
                arry.currentDebtAmount = 0;
                arry.isPayedOff = true;
            }
            else{
              if(totalLeftOver > 0){
                  arry.currentDebtAmount -= totalLeftOver;
                  totalLeftOver -= totalLeftOver;
                  //totalLeftOver = 0;
               
              }
            }
        }
        }
       
    })

    if(totalLeftOver > 0){
      let x = totalLeftOver
      customArry[0].amountLeftOver = x;
      
    }

    return customArry;
  }

}

export function FindAllCurrentDebt(customArry = []){
      let goodCustomArry = CheckMethodType(customArry, 'array');
      let totalDebt = 0;

      if(goodCustomArry){
          customArry.forEach((arry) => {
            totalDebt += arry.currentDebtAmount;

          })

      }
      
      return totalDebt;
}

export function FindAmountLeftOver(customArry = []){

  let goodCustomArry = CheckMethodType(customArry, 'array');
  let totalAmount = 0;

  if(goodCustomArry){
      customArry.forEach((arry) => {
        totalAmount += arry.amountLeftOver;

      })

  }
  
  return totalAmount;

}

const newArry = CustomDebtPaymentFrame(CustDebtArry, 15000);