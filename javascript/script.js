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