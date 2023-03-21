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
const displayArray = [];
const operatorArray = [];

function calc(e){
    e.stopPropagation()
    if(e.target.class = 'numbers') {
        numArray.push(e.target.innerText);
        displayArray.push(e.target.innerText);
        disNum = displayArray.join('');
        display.innerText = disNum
    }

    if(e.target.innerText == 'C'){
        display.innerText = '';
        numArray.length = 0;
        displayArray.length = 0;
        operatorArray.length = 0;
    }

    if(e.target.value == 'operate'){
        const firstArray = numArray.slice();
        const input = firstArray.join('').split(/\+|\-|\x|\÷/);
        const inputNums = input.map(Number);
        operatorArray.push(e.target.innerText);
        operator = operatorArray[0];

        displayArray.length = 0;
        display.innerText = '';
        
        firstInput = inputNums[0];
        secondInput = inputNums[1];
 
        let x = firstInput,
            y = secondInput;
            z = operator
         
            if (y == ''){
                return;
            } else {
                const answer = operate(x,y,z);
                display.innerText = answer;
                numArray.length = 0;
                displayArray.length = 0;
                operatorArray.splice(0,1);
                numArray.push(answer,z);
                console.log(z);
            }
    
    }

    if(e.target.innerText == '='){
        let z = firstArray.pop(),
            x = firstArray.join(''),
            y = numArray.slice(0,-1).join('');
        
        const answer =  operate(x,y,z);
        display.innerText = answer;
        numArray.length = 0
        numArray.push(answer)
       
    } 
    
}


numBtns = document.querySelectorAll('.numbers')
opBtns = document.querySelectorAll('.operators')
allBtns = document.querySelectorAll('button')
display = document.querySelector('.display')


allBtns.forEach(button => 
        button.addEventListener('click',calc))