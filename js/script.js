const $= document;
const form= $.querySelector('.form');
const btn= $.querySelector('.submit-B');
const inputs= $.querySelectorAll('.input');
const icons= $.querySelectorAll('.icon');
let labels= $.querySelectorAll('.label-i');

//-----------------------------------------------------------pattern
let checkEmail=/^\w+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
let checkPassword=/^(?=.*[a-z])+(?=.*[A-Z])(?=.*[\d])(?=.*[!@\#\$%\^\&])[A-Za-z\d@%!\^&\*\$]{8,}$/;
//-----------------------------------------------------------

inputs.forEach((input , i)=>{
    input.setAttribute('autocomplete','off');
    input.addEventListener('blur',(e)=>{
        input.classList.remove('true-info');
    });
})
//---------
inputs[0].addEventListener('focus',()=>{
    resetBtn();
    checkInput(0,checkEmail.test(inputs[0].value));
})
inputs[0].addEventListener('input',()=>{
    checkInput(0,checkEmail.test(inputs[0].value));
})
//---------
inputs[1].addEventListener('focus',()=>{
    resetBtn();
    checkInput(1,checkPassword.test(inputs[1].value));
})
inputs[1].addEventListener('input',()=>{
    checkInput(1,checkPassword.test(inputs[1].value));
})
//---------
inputs[2].addEventListener('focus',()=>{
    resetBtn();
    let password=inputs[1].value
    checkInput(2,inputs[2].value === password && inputs[2].value !=='');
});
inputs[2].addEventListener('input',()=>{
    let password=inputs[1].value;
    checkInput(2,inputs[2].value === password && inputs[2].value !=='');
});
//---------
btn.addEventListener('click', submitForm);
form.addEventListener('submit',e=>e.preventDefault());

//------------------------------------------------------------
function checkInput(i,condition){
    
    if(condition){
        inputs[i].classList.add('true-info');
        inputs[i].classList.remove('false-info');
        labels[i].style.display='none';
        
    }else{
        inputs[i].classList.remove('true-info');
        inputs[i].classList.add('false-info');
        labels[i].style.display='block';
    }
}

function submitForm(){
   let inputsArray = Array.from(inputs);

   inputsArray.map((input,i)=>{
    if(input.className.includes('false-info') || input.value ==''){
        labels[i].style.display='block';
        input.classList.add('false-info');
    }else{
        btn.style.backgroundColor='#FF0000';
        btn.innerHTML='Enter correct information';
    }

   })

   let checkInputs=inputsArray.every(input=>{
    return input.value != '' &&  !(input.className.includes('false-info'));
    })

    if(checkInputs){
     btn.style.backgroundColor='#32CD32';
     btn.innerHTML='Registration successful';
     inputs.forEach(input=> input.value='');
    }
}   

function resetBtn(){
    btn.style.backgroundColor='#ea4c88';
    btn.innerHTML='SIGN UP';
}