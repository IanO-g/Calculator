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
const operatorArray = [];
const inputArray = [];


function logNum(e){
    e.stopPropagation()
    numArray.push(e.target.innerText);
    dispNum = numArray.slice().join('');
    display.innerText = dispNum;
}

function logOp(e){
    e.stopPropagation();
    operatorArray.push(e.target.innerText);
}

function logInput(){
    const input = numArray.slice().join('');
    numArray.length = 0;
    if(input != ''){
    inputArray.push(input)}
}

function calc(e){
    let calcArray = inputArray.slice().map(Number),
        x = calcArray[0],
        y = calcArray [1],
        z = operatorArray[0];
    console.log(x,y,z)
    if (!y){
        operatorArray.length = 0;
        operatorArray.push(e.target.innerText);
        return;
    } else { 
        const answer = operate(x,y,z);
        display.innerText = answer;
        inputArray.length = 0;
        operatorArray.splice(0,1);
        inputArray.push(answer);
    }
}

function clear(){
    inputArray.length = 0;
    operatorArray.length = 0;
    numArray.length = 0;
    display.innerText = '';
    decBtn.disabled = false;
}

function negative(){
    let newInput = Number(display.innerText);
        if (Math.sign(newInput) == -1){
            posInput = newInput * -1;
            display.innerText = posInput;
            numArray.length = 0;
            numArray.push(posInput);
        } else {
            negInput = newInput * -1;
            display.innerText = negInput;
            numArray.length = 0;
            numArray.push(negInput);
        }
}

function percent(){
    let newInput = Number(display.innerText);
        percentInput = newInput/100;
        display.innerText = percentInput;
        numArray.length = 0;
        numArray.push(percentInput);
}

function backspace(){
    let backInput = display.innerText.slice(0,-1);
    
    const deciCheck = display.innerText.slice(-1);
        if(deciCheck == '.'){
            decBtn.disabled = false;
        }

    numArray.length = 0;
    numArray.push(backInput);
    display.innerText = backInput; 
}


numBtns = document.querySelectorAll('.numbers');
opBtns = document.querySelectorAll('.operators');
display = document.querySelector('.display');
negBtn = document.querySelector('#negative');
clearBtn = document.querySelector('#clear');
eqBtn = document.querySelector('#equals');
percentBtn = document.querySelector('#percent');
decBtn = document.querySelector('#decimal');
backBtn = document.querySelector('#backspace');


opBtns.forEach(button => 
         button.addEventListener('click',logInput))

opBtns.forEach(button =>
        button.addEventListener('click',logOp))

opBtns.forEach(button => 
            button.addEventListener('click',calc))

numBtns.forEach(button =>
            button.addEventListener('click',logNum))


eqBtn.addEventListener('click' , logInput);
eqBtn.addEventListener('click' , calc);

clearBtn.addEventListener('click',clear);

negBtn.addEventListener('click',negative);

percentBtn.addEventListener('click',percent);

decBtn.addEventListener('click', function (){decBtn.disabled = true});

backBtn.addEventListener('click',backspace);


// change array for percent and decimal 
// enable decimal button 