/* ------------------
       VARIABLES 
   ------------------ */

const display = document.querySelector(".display");
const error = document.querySelector(".error");
let displayText = "";
let operands = [];
let operators = [];
let isEvaluated = false;
let areOperationsDisabled = false;

/* ------------------
       LISTENERS 
   ------------------ */

const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click",function(){
    if(this.value=="="){
        if(isEvaluated){
            reset();
        }else{
            if(validateExpression()){
                processExpression();
                evaluateExpression();
            }else{
                showError("Invalid Expression!");
                reset();
            }
        }
    }else if(this.value=="C"){
        reset();
    }else if(this.value=="D"){
        if(isEvaluated){
            reset();
        }else{
            displayText = displayText.slice(0,displayText.length-1);
            updateDisplay();
        }
    }else{
        if(isEvaluated){
            isEvaluated = false;
            reset();
        }
        if(["*","/","+","-","."].includes(this.value)){
            areOperationsDisabled = true;
            toggleOperations();
        }else if(areOperationsDisabled){
            areOperationsDisabled = false;
            toggleOperations();
        }
        displayText += `${this.value}`;
        updateDisplay();
    }
}));

/* ------------------
       OPERATIONS 
   ------------------ */

function add(number1,number2){

    return +number1 + +number2;
}

function subtract(number1,number2){

    return +number1 - +number2;
}

function multiply(number1,number2){

    return +number1 * +number2;
}

function divide(number1,number2){

    if(number2==0){
        showError("Division by 0!")
        return null;
    }

    return +number1 / +number2;
}

function operate(number1,number2,operator){

    switch(operator){
        case "+":
            return add(number1,number2);
            break;
        case "-":
            return subtract(number1,number2);
            break;
        case "*":
            return multiply(number1,number2);
            break;
        case "/":
            return divide(number1,number2);
            break;
    }

}

/* ------------------
       DISPLAYING 
   ------------------ */

function updateDisplay(){

    display.textContent = displayText;

}

function showError(message){

    error.textContent = message;
    error.style.opacity = "1";
    setTimeout(()=>{
        error.style.transition = "opacity 1s";
        error.style.opacity = "0";
    },5000);
    error.style.removeProperty("transition");

}

/* ------------------
        UTILITY
   ------------------ */

function reset(){

    operands = [];
    operators = [];
    displayText = "";
    isEvaluated = false;
    display.textContent = displayText;

}

function validateExpression(){

    let text = displayText;
    text += " ";

    if(["+","-","*","/"].includes(text[0])){
        return false;
    }

    for(let i=0;i<text.length;i++){
        if(["+","-","*","/"].includes(text[i]) && ["+","-","*","/"," "].includes(text[i+1])){
            return false;
        }
    }

    return true;

}

function processExpression(){

    let text = displayText;
    let number = "";

    for(let i=0;i<text.length;i++){
        
        if(["+","-","*","/"].includes(text[i])){
            operators.push(text[i]);
            operands.push(+number);
            number = "";
        }else{
            number += text[i];
        }
        
    }

    operands.push(+number);

}

function evaluateExpression(){

    let result;

    //If expression has both multiplication/division and addition/subtraction
    if(["*","/"].some(el => operators.includes(el)) && ["+","-"].some(el => operators.includes(el))){

        for(let i=0;i<operators.length;i++){
            if(["+","-"].includes(operators[i])){
                continue;
            }
            result = operate(operands[i],operands[i+1],operators[i]);
            if(result==null){
                reset();
                return;
            }
            operands[i] = result;
            operands[i+1] = null;
            operators[i] = " ";
        }

        operators = operators.filter(operator => operator!=" ");
        operands = operands.filter(operand => operand!=null);

    }

    while(operators.length>0){
        result = operate(operands[0],operands[1],operators[0]);
        if(result==null){
            reset();
            return;
        }
        operands.splice(0,2,result);
        operators.splice(0,1);
    }

    displayText += `=${Math.round(operands[0]*100)/100}`;
    isEvaluated = true;
    updateDisplay();

}

function toggleOperations(){

    const operations = document.querySelectorAll(".operation");
    operations.forEach(operation => {
        if(areOperationsDisabled){
            console.log("disabling operation");
            operation.disabled = "true";
        }else{
            console.log("enabling operation");
            operation.removeAttribute("disabled");
        }
    });

}