
//Dont use inline
//PROTOTYPE
//we declare some global variable to use 
var maritalState, time;

maritalState = getMaritalState();
time = getTime();

//this function will get whatever value user has selected fromt the available two values i.e. Married and Unmarried.
function getMaritalState(){
    const Value = $('#nature').val();
    return Value;
}
//this function will get whatever value user has selected fromt the available two values i.e. Yearly and Monthly.

function getTime(){
    const Value2 = $('#time').val();
    return Value2;
}

//this event will call two functions when user changes the selector from "Unmarried to Married" or "Yearly to monthly" and vice verca.
document.querySelector("#nature").addEventListener("change",() => maritalState = getMaritalState());
document.querySelector("#time").addEventListener("change",()=> time = getTime());

let insurace;

function eraseText(elem) {
    document.getElementById(elem).value = "";
}
function checkNumInsurace() {
    let number = document.getElementById('Insurance').value;
    if (number > 25000) {
        alert("Number bigger than 25000!")
        eraseText("Insurance");
    } else return parseInt(number);
}

//This is the main function where our code goes in it will be called when the Calculate button is clicked.
function main(){
    const salaryMonthly = parseInt($('#Salary').val());
    const salaryYearly = salaryMonthly * 12;
    // const bonus = parseInt($('#bonus').val());
    // const otherIncome = parseInt($('#others').val());
    // const providentFund = parseInt($('#provident').val());
    // const CIT = parseInt($('#Citizen').val());
    // const insurance = parseInt($('#Insurance').val());
    // const taxableIncome = salaryYearly + bonus + otherIncome - providentFund - CIT - insurance
    function salaryArrayBand(salary, bandList){
        salaryArr = []
        for (let i of bandList){
            if (salary > i){
                salaryArr.push(i);
                let remaining_salary = salary - i;
                salary = remaining_salary;
            }else{
                salaryArr.push(salary);
                break;
            }
        }
        return salaryArr;
    }
    function taxableIncomeCalc(salaryArr){
        let taxableIncome = 0;
        rates = [1, 10, 20, 30, 36];
        for (let i = 0; i < salaryArr.length; i++){
            taxableIncome += (rates[i] / 100) * salaryArr[i];
        }
        return taxableIncome;
    }
    function taxCalculator(totalIncome, maritalState){
        bandListForMarried = [450000, 100000, 200000, 1250000, 2000000];
        bandListForUnmarried = [400000, 100000, 200000, 1300000, 2000000];
        if (maritalState === "married"){
            marriedPersonIncome = salaryArrayBand(totalIncome, bandListForMarried);
            return taxableIncomeCalc(marriedPersonIncome)
        }
        unmarriedPersonIncome = salaryArrayBand(totalIncome, bandListForUnmarried);
        return taxableIncomeCalc(unmarriedPersonIncome);


    }
    const taxableIncome = taxCalculator(salaryYearly, maritalState)
    document.querySelector("#taxable").value = taxableIncome;
    document.querySelector('#total').value = salaryYearly;

    
    
    
}

//This event will call the main function calculation the final Salary tax based on user given input.
document.querySelector('#calculate').addEventListener("click", ()=> main());