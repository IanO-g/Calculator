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

function calc(e){
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
                } , 11 * 1000);
        }else if(y || y == 0){
            const answer = operate(x,y,z);
                display.innerText = answer;
                inputArray.length = 0;
                operatorArray.splice(0,1);
                inputArray.push(answer);
                decBtn.disabled = false;
                console.log(overFlow(answer)); // this allows answers > 1e9 to be presented in exponential notation; reason unknown
        }else if (!y){
            operatorArray.length = 0;
            operatorArray.push(e.target.innerText);
            return;
        }
}

function clear(){
    inputArray.length = 0;
    operatorArray.length = 0;
    numArray.length = 0;
    display.innerText = 0;
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
    const maxFont = 16;
          minFont = 12;
          maxLength = 10;
    let input = display.innerText,
        fontSize = maxFont;
        display.style.fontSize = fontSize + 'px';
        console.log(input.length)

        while(fontSize > minFont && input.length > 7){
            fontSize--;
            display.style.fontSize = fontSize +'px';
         }
}

 function overFlow(){
    let input = display.innerText,
        maxVal = 1e9,
        decimal = input.includes('.');
        

        if(input >= maxVal){
            display.innerText = Number.parseFloat(input).toExponential(2)
        } else if(decimal != false){
            round = input.split('.')[1].length;
            if(round > 3){
                display.innerText = Number.parseFloat(input).toExponential(2)
            }
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


opBtns.forEach(button => 
         button.addEventListener('click',logInput))

opBtns.forEach(button =>
        button.addEventListener('click',logOp))

opBtns.forEach(button => 
            button.addEventListener('click',calc))     

numBtns.forEach(button =>
            button.addEventListener('click',logNum))
            
numBtns.forEach(button =>
                button.addEventListener('click',check))

numBtns.forEach(button =>
                button.addEventListener('click',sizeAdjust))

numBtns.forEach(button =>
                button.addEventListener('click',overFlow))





eqBtn.addEventListener('click',logInput);
eqBtn.addEventListener('click',calc);

clearBtn.addEventListener('click',clear);

negBtn.addEventListener('click',negative);

percentBtn.addEventListener('click',percent);

backBtn.addEventListener('click',backspace);


border = document.querySelector('.border');

// decimals
// keyboard support

