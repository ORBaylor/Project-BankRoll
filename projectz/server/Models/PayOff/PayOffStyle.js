
export let payOffStyle = {
    //Snowball: Pay off smaller balances first and leave the bigger ones for last
    //Avalanche: Pay off the debt with the most intrest so you pay off less money over time
    //Custom: This will be a set of rules the Budget Engine will follow to pay off debt using the Quick Budget Option
    style: 'snowball' | 'avalanche' | 'custom'
}