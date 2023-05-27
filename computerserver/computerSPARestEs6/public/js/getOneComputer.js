import { updateMessage, clearMessage } from '/js/helperFunctions.js';

let resultarea;
let messagearea;
let computerId;

document.addEventListener('DOMContentLoaded',init);

function init(){
    resultarea=document.getElementById('resultarea');
    computerId=document.getElementById('computerid');
    messagearea=document.getElementById('messagearea');
    document.getElementById('submit')
        .addEventListener('click', send);
}

async function send(){
    clearMessage(messagearea);
    resultarea.innerHTML='';
    try{
        if (computerId.value.trim().length>0){
            const data = await fetch(`/getOne/${computerId.value}`);
            const result = await data.json();
            if (result) {
                if (result.message) {
                    updateMessage(messagearea,result.message, result.type);
                }
                else {
                    updateComputer(result);
                }
            }
        }
        
    }
    catch(error){
        updateMessage(messagearea,`Not found. ${error.message}`,'error')
    }
};

function updateComputer(result){
    if(result.length===0) return;
    const computer=result[0];
    resultarea.innerHTML=`
    <p><span class="legend">Id</span> ${computer.id}</p>
    <p><span class="legend">Name</span> ${computer.name}</p>
    <p><span class="legend">Type</span> ${computer.type}</p>
    <p><span class="legend">Processor</span> ${computer.processor}</p>
    <p><span class="legend">Amount</span> ${computer.amount}</p>
    `
}
