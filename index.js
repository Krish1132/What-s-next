let myLeads = [];
const inputBtn = document.querySelector('#input-btn');
const inputEl = document.querySelector('#input-el');
const ulEl = document.querySelector('#ul-El');
const delBtn = document.querySelector('#delete-btn');
const savetabBtn = document.querySelector('#savetab-btn');

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

inputBtn.addEventListener('click', function () {
    if(inputEl.value){
        let pos = myLeads.indexOf(inputEl.value);
        if (myLeads.includes(inputEl.value) && pos === 0){
        }
        else if (myLeads.includes(inputEl.value) && pos !== 0) {
            myLeads.splice(pos ,1);
            myLeads.unshift(inputEl.value);
        }
        else{
            myLeads.push(inputEl.value);
        }
        inputEl.value = '';
        window.localStorage.setItem('myLeads', JSON.stringify(myLeads));
        render(myLeads);
    }
});

function render(arr) {
    let temp = '';
    for (let i = 0; i < arr.length; i++) {
        if(isValidUrl(arr[i])){
            temp += `<li><div class="link-elem"><a href="${arr[i]}" target="_blank">${arr[i]}</a></div><div class="cross"><button id='${i}'>&#10060;</button></div></li>`;
        }else{
            temp += `<li><div class="link-elem">${arr[i]}</div><div class="cross"><button id='${i}'>&#10060</button></div></li>`;
        }
        // Alternate way to create elements
        // const li = document.createElement('li');
        // li.textContent =  arr[i];
        // ulEl.append(li);
        // 
    }
    ulEl.innerHTML = temp;
}

ulEl.addEventListener('click', function (e) {
    if(e.target && e.target.nodeName === 'BUTTON'){
        myLeads.splice(e.target.id, 1);
    }
    window.localStorage.setItem('myLeads', JSON.stringify(myLeads));
    render(myLeads);
});

delBtn.addEventListener('click', function () {
    myLeads = [];
    localStorage.clear();
    ulEl.innerHTML = '';
});

savetabBtn.addEventListener('click', function () {

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        let tab_elem = tabs[0].url;
        let pos = myLeads.indexOf(tab_elem);
        if (myLeads.includes(tab_elem) && pos === 0) {
        }
        else if (myLeads.includes(tab_elem) && pos !== 0) {
            myLeads.splice(pos, 1);
            myLeads.unshift(tab_elem);
        }
        else {
            myLeads.push(tab_elem);
        }
        inputEl.value = '';
        localStorage.setItem('myLeads', JSON.stringify(myLeads));
        render(myLeads);
    });
});

function isValidUrl(userInput) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(userInput);
}