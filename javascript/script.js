const display = document.querySelector(".display");
let displayText = "";
let operands = [];
let operators = [];
let isEvaluated = false;

const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click",function(){
    if(this.value=="="){
        if(validateExpression()){
            processExpression();
            evaluateExpression();
            isEvaluated = true;
        }else{
            alert("Invalid Expression!");
            reset();
        }
    }else if(this.value=="C"){
        reset();
    }else{
        if(isEvaluated){
            isEvaluated = false;
            reset();
        }
        displayText += `${this.value}`;
        updateDisplay(this.value);
    }
}));

function add(number1,number2){

    if(number1===null || number2===null){
        return;
    }else if(number1==="" || number2===""){
        return;
    }else if(isNaN(number1) || isNaN(number2)){
        return;
    }

    return +number1 + +number2;
}

function subtract(number1,number2){

    if(number1===null || number2===null){
        return;
    }else if(number1==="" || number2===""){
        return;
    }else if(isNaN(number1) || isNaN(number2)){
        return;
    }

    return +number1 - +number2;
}

function multiply(number1,number2){

    if(number1===null || number2===null){
        return;
    }else if(number1==="" || number2===""){
        return;
    }else if(isNaN(number1) || isNaN(number2)){
        return;
    }

    return +number1 * +number2;
}

function divide(number1,number2){

    if(number1===null || number2===null){
        return;
    }else if(number1==="" || number2===""){
        return;
    }else if(isNaN(number1) || isNaN(number2)){
        return;
    }else if(number2==0){
        return;
    }

    return +number1 / +number2;
}

function operate(number1,number2,operator){

    if(operator==null){
        return;
    }

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
        default:
            return "Invalid operator.";
    }

}

function updateDisplay(){

    display.textContent = displayText;

}

function reset(){

    operands = [];
    operators = [];
    displayText = "";
    display.textContent = displayText;

}

function validateExpression(){

    let text = displayText.replaceAll(" ","");
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

    let text = displayText.replaceAll(" ","");
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
            operands[i] = result;
            operands[i+1] = result;
            operators[i] = " ";
        }

        let unique = [];
        operators = operators.filter(operator => operator!=" ");
        operands.forEach(operand => {
            if(!unique.includes(operand)){
                unique.push(operand);
            }
        })
        operands = [...unique];

    }

    while(operators.length>0){
        result = operate(operands[0],operands[1],operators[0]);
        operands.splice(0,2,result);
        operators.splice(0,1);
    }

    displayText += `=${Math.round(operands[0]*100)/100}`;
    updateDisplay();

}