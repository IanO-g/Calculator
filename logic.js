function add(x,y){
    return x +y;
}

function subtract(x,y){
    return x - y;
}

function multiply(x,y){
    return x * y;
}

function divide(x,y){
    return x / y;
}

function operate(x,y,z){
    if (z == 'add'){
        return add(x,y);
    } else if (z == 'subtract'){
        return subtract(x,y);
    } else if(z == 'multiply'){
        return multiply(x,y);
    } else if(z == 'divide'){
        return divide(x,y);
    } return;
}