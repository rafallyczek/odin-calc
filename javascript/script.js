const display = document.querySelector(".display");
let displayText = "";
let operands = [];
let operators = [];

const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click",function(){
    if(this.value=="="){
        if(checkDisplayText()){
            console.log("correct");
        }
    }else if(this.value=="C"){
        reset();
    }else{
        if(["+","-","*","/"].includes(this.value)){
            operators.push(this.value)
        }else{
            operands.push(+this.value);
        }
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

function updateDisplay(value){

    displayText += `${value} `;
    display.textContent = displayText;

}

function reset(){

    operands = [];
    operators = [];
    displayText = "";
    display.textContent = displayText;

}

function checkDisplayText(){

    text = displayText.replaceAll(" ","");
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