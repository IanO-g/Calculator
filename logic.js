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
    if (z == '+'){
        return add(x,y);
    } else if (z == '-'){
        return subtract(x,y);
    } else if(z == 'x'){
        return multiply(x,y);
    } else if(z == '÷'){
        return divide(x,y);
    } return;
}

const numArray = [];
function calc(e){
    e.stopPropagation()
    if(e.target.class = 'numbers') {
        numArray.push(e.target.innerText);
        disNum = numArray.join('');
        display.innerText = disNum;
    }

    if(e.target.innerText == 'C'){
        display.innerText = '';
        numArray.length = 0;
    }

    if(e.target.innerText == 'x'){
        firstArray = numArray.slice();
        numArray.length = 0;
        display.innerText = '';
        return firstArray;
    }

    if(e.target.innerText == '='){
        let z = firstArray.pop(),
            y = firstArray.join(''),
            x = numArray.slice(0,-1).join('');
        
        const answer =  operate(x,y,z);
        display.innerText = answer;
} 
}


numBtns = document.querySelectorAll('.numbers')
opBtns = document.querySelectorAll('.operators')
allBtns = document.querySelectorAll('button')
display = document.querySelector('.display')


allBtns.forEach(button => 
        button.addEventListener('click',calc))