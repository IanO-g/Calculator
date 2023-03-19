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

const numArray = [];
function showNum(e){
    e.stopPropagation()
    numArray.push(e.target.innerText);
    disNum = numArray.join('');
    display.innerText = disNum;
}

function opHere(e){
    if(e.target.innerText == 'C'){
        display.innerText = ''
        numArray.length = 0
    }
}


numBtns = document.querySelectorAll('.numbers')
opBtns = document.querySelectorAll('.operators')
allBtns = document.querySelectorAll('button')
display = document.querySelector('.display')

numBtns.forEach(button => 
    button.addEventListener('click',showNum))

opBtns.forEach(button => 
    button.addEventListener('click',opHere))