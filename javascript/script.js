function add(a,b){

    if(a===null || b===null){
        return;
    }else if(a==="" || b===""){
        return;
    }else if(isNaN(a) || isNaN(b)){
        return;
    }

    return +a + +b;
}

function subtract(a,b){

    if(a===null || b===null){
        return;
    }else if(a==="" || b===""){
        return;
    }else if(isNaN(a) || isNaN(b)){
        return;
    }

    return +a - +b;
}

function multiply(a,b){

    if(a===null || b===null){
        return;
    }else if(a==="" || b===""){
        return;
    }else if(isNaN(a) || isNaN(b)){
        return;
    }

    return +a * +b;
}

function divide(a,b){

    if(a===null || b===null){
        return;
    }else if(a==="" || b===""){
        return;
    }else if(isNaN(a) || isNaN(b)){
        return;
    }else if(b==0){
        return;
    }

    return +a / +b;
}