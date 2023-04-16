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
    decBtn.disabled = false; // allows for next input to contain a decimal
}

function logInput(){
    const input = numArray.slice().join('');
    numArray.length = 0;
        if(input != ''){
           inputArray.push(input)
        }
}

function calc(){
    let calcArray = inputArray.slice().map(Number),
        x = calcArray[0],
        y = calcArray [1],
        z = operatorArray[0];
    
        if(z == '÷' && y == 0){
            const scrollText = document.createElement('p');
            const border = document.querySelector('.border');
            scrollText.setAttribute('id','scroll')
            display.appendChild(scrollText);
            scrollText.innerText = 'The undefined value of an indeterminate must surely have a limit?';
            border.classList.toggle('wrong');
            display.classList.toggle('wrongDisplay');
            setTimeout(() => {clear(); 
                display.innerText = 0;
                border.classList.toggle('wrong');
                display.classList.toggle('wrongDisplay');
                } , 8 * 1000);
        }else if(y || y == 0){
            const answer = operate(x,y,z);
                display.innerText = answer;
                inputArray.length = 0;
                operatorArray.splice(0,1);
                inputArray.push(answer);
                decBtn.disabled = false;
        }else if (!y){
            operatorArray.length = 0;
            operatorArray.push(z);
            return;
        }
}

function clear(){
    inputArray.length = 0;
    operatorArray.length = 0;
    numArray.length = 0;
    display.innerText = 0;
    decBtn.disabled = false;
    backBtn.disabled = false;
    display.style.fontSize = 75 + 'px';
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
        decBtn.disabled = true;
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

function check(){
    let input = display.innerText,
        check = input.includes('.');

        if (check != false){
            decBtn.disabled = true;
        } else{
            decBtn.disabled = false;
        }
}

function sizeAdjust(){
    const maxFont = 75;
          minFont = 60;
          adjustContent = document.createElement('p');
       
          
    let input = display.innerText,
        fontSize = maxFont;
        display.style.fontSize = fontSize + 'px';

        display.appendChild(adjustContent);
        adjustContent.innerText = input; 
        adjustContent.classList.add('adjust');

         while(fontSize > minFont && adjustContent.clientWidth > display.clientWidth - 20 ){
             fontSize -= 7;
             display.style.fontSize = fontSize +'px';
          }// -20 to adjust for padding
}

function overFlow(){
    let input = display.innerText,
        maxVal = 1e9,
        decimal = input.includes('.');
        
        if(input >= maxVal){
            display.innerText = Number.parseFloat(input).toExponential(3);
            display.style.fontSize = 70 + 'px';
        } else if(decimal != false){
            round = input.split('.')[1].length;
            if(round > 7){
                display.innerText = Number.parseFloat(input).toExponential(3);
                display.style.fontSize = 70 + 'px';
            }
         }
}

function keySupport(e){
   let userInput = e.key;
    if(userInput >= 0 && userInput <= 9 || userInput == '.' ){
        numArray.push(userInput);
        dispNum = numArray.slice().join('');
        display.innerText = dispNum;
    }else if(userInput == 'x' || userInput == '-' || userInput == '+' ){
        operatorArray.push(userInput);
        decBtn.disabled = false;
        logInput();
        calc();
    }else if(userInput =='/'){
        operatorArray.push('÷');
        decBtn.disabled = false;
        logInput();
        calc();
    }else if(userInput == 'Backspace'){
        backspace();
    }else if(userInput == '='){
        logInput();
        calc();
    }else if(userInput == '%'){
        percent();
    }else if(userInput == '*'){
        operatorArray.push('x');
        decBtn.disabled = false;
        logInput();
        calc();
    }
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
border = document.querySelector('.border');


opBtns.forEach(button => 
               button.addEventListener('click',logInput))

opBtns.forEach(button =>
               button.addEventListener('click',logOp))

opBtns.forEach(button => 
               button.addEventListener('click',calc))

opBtns.forEach(button =>
                button.addEventListener('click',sizeAdjust))
 
opBtns.forEach(button => 
                button.addEventListener('click',overFlow))

numBtns.forEach(button =>
                button.addEventListener('click',logNum))
            
numBtns.forEach(button =>
                button.addEventListener('click',check))

numBtns.forEach(button =>
                button.addEventListener('click',sizeAdjust))

numBtns.forEach(button =>
                button.addEventListener('click',overFlow))


document.addEventListener('keydown',keySupport);
document.addEventListener('keydown',overFlow);
document.addEventListener('keydown',sizeAdjust);


eqBtn.addEventListener('click',logInput);
eqBtn.addEventListener('click',calc);
eqBtn.addEventListener('click',sizeAdjust);
eqBtn.addEventListener('click',overFlow);

clearBtn.addEventListener('click',clear);

negBtn.addEventListener('click',negative);

percentBtn.addEventListener('click',percent);

backBtn.addEventListener('click',backspace);






