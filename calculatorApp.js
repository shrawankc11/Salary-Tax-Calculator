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

let insurance, providentFund, salaryMonthly;

function getSalary(){
    let number = document.getElementById("Salary").value;
    return (number);
}

document.getElementById("Salary").addEventListener('blur', () => salaryMonthly = getSalary())

//This function takes in element id as an parameter and removes the elements value from the text-box if condition are not met
function eraseText(elem) {
    document.getElementById(elem).value = "";
}

//This function checks if Insurance is bigger than 25000 or not, which is a standard amount for calculation tax 
function checkNumInsurace() {
    let number = document.getElementById('Insurance').value;
    if (number > 25000) {
        alert("Insurance cannot be more than Rs.25000!")
        eraseText("Insurance");
    } else return parseInt(number);
}

//This function checks if epf fund is properly inserted or not
function checkNumEPF(salary){
    let number = document.getElementById("provident").value;
    if (number > (20/100 * salary)){
        alert("EPF cannot be more than 20% of salary!")
        eraseText("provident");
    }else return parseInt(number);
}

//This eventlistener runs when we removed our inpur cursor from epf textbox
document.getElementById('provident').addEventListener('blur', () => checkNumEPF(salaryMonthly));

//This eventListener runs when we remove our input cursor from insrance textbox
document.getElementById('Insurance').addEventListener('blur', () => checkNumInsurace());

//This is the main function where our code goes in it will be called when the Calculate button is clicked.
function main(){
    //we set some variables to use it in the future code
    const salaryMonthly = $('#Salary').val();
    const months = $('#months').val();
    const year = $('#time').val();
    const salaryYearly = salaryMonthly * months;
    const bonus = parseInt($('#bonus').val());
    
    providentFund = checkNumEPF(salaryMonthly);
    const CIT = parseInt($('#Citizen').val());
    insurance = checkNumInsurace();
    const taxableIncome = salaryYearly + bonus - insurance - CIT - providentFund;

    //this function takes in Yearly Salary of the person and divides it into small list according to the band's provided by government
    //It return a list of different sections of salary in a band-list like structure
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

    //this function calculates the taxable Income after the bandlist has been passed into it
    //meaning that it will apply different tax rates to different part of the salary passed
    //it returns the taxable Income of the passed salary 
    function taxableIncomeCalc(salaryArr){
        let taxableIncome = 0;
        rates = [1, 10, 20, 30, 36];
        for (let i = 0; i < salaryArr.length; i++){
            taxableIncome += (rates[i] / 100) * salaryArr[i];
        }
        return taxableIncome;
    }

    //this is the calculating function where most of the calculation happens. 
    //This function returns taxable Income of a person as per their Marital State
    
    function taxCalculator(totalIncome, maritalState){
        bandList = {
            married : [450000, 100000, 200000, 1250000, 2000000],
            unmarried : [400000, 100000, 200000, 1300000, 2000000],
        };
        if (maritalState === "married"){    //if the person is married then the married property of the bandlist object is passed 
            marriedPersonIncome = salaryArrayBand(totalIncome, bandList.married);
            return taxableIncomeCalc(marriedPersonIncome)
        }       //else if the perosn is not married then the unmarried property of the bandlist object is passed
        unmarriedPersonIncome = salaryArrayBand(totalIncome, bandList.unmarried);
        return taxableIncomeCalc(unmarriedPersonIncome);

    }
    const taxableIncomeFinal = taxCalculator(taxableIncome, maritalState);  //This is the final tax that gets output
    // const taxableIncomeFinal = salaryYearly + bonus + otherIncome - insurance - CIT - providentFund;
    // const tax = taxableIncome + bonus + otherIncome - insurance - CIT - providentFund;
    document.querySelector("#taxable").value = taxableIncomeFinal;   
    document.querySelector('#total').value = salaryYearly;

}
//This event will call the main function calculation the final Salary tax based on user given input.
document.querySelector('#calculate').addEventListener("click", ()=> main());

