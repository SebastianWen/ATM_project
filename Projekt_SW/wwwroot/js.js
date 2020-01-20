const uri = 'api/Accounts';
let data = '';
let id = '';
let urlApi = '';
const errorLog = document.getElementById('errorLog');
const formLogin = document.getElementById('formLogin');
const mainContentButton = document.getElementById('mainContentButton');

errorLog.style.visibility = 'hidden';
mainContentButton.style.visibility = 'hidden';
boxContentInputPullMoney.style.display = 'none';
boxContentInputShowMoney.style.display = 'none';
boxContentInputPushMoney.style.display = 'none';
boxContentInputChangePin.style.display = 'none';


function getOneItem() {
    id = document.getElementById('id').value;
    const pin = document.getElementById('pin').value;
    const request = new XMLHttpRequest();
    urlApi = 'https://localhost:44358/api/Accounts/' + id;
    request.open('GET', urlApi, true);
    request.onload = function () {
        data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400 && data.pin == pin) {
            formLogin.style.visibility = 'hidden';
            errorLog.style.visibility = 'hidden';
            mainContentButton.style.visibility = 'visible';
            document.getElementById('userName').innerHTML = data.name;
        } else {
            errorLog.style.visibility = 'visible';
        }
    }
    request.send();
}

function showMoney() {
    boxContentInputPullMoney.style.display = 'none';
    boxContentInputPushMoney.style.display = 'none';
    boxContentInputChangePin.style.display = 'none';
    boxContentInputShowMoney.style.display = 'block';
    fetch(urlApi)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            data = myJson;
            document.getElementById("contentInputShowMoney").value = "Stan konta " + data.money + "zł";
        });
}

function pullMoney() {
    boxContentInputShowMoney.style.display = 'none';
    boxContentInputPushMoney.style.display = 'none';
    boxContentInputChangePin.style.display = 'none';
    boxContentInputPullMoney.style.display = 'block';
}

function buttonPullMoney() {
    let money = document.getElementById('contentInputPullMoney').value;
    money = parseFloat(money) + data.money;
    const test = { id: parseInt(id), pin: data.pin, name: data.name, money: money };


    const putMethod = {
        method: 'PUT', // Method itself
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content
        },
        body: JSON.stringify(test) // We send data in JSON format
    }

    fetch(urlApi, putMethod)
        .then(response => response.json())
        .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
        .catch(err => console.log(err))
}

function pushMoney() {
    boxContentInputShowMoney.style.display = 'none';
    boxContentInputPushMoney.style.display = 'block';
    boxContentInputChangePin.style.display = 'none';
    boxContentInputPullMoney.style.display = 'none';
    noMoney.style.visibility = 'hidden';
}

function buttonPushMoney() {

    let money = document.getElementById('contentInputPushMoney').value;
    if (parseFloat(money) <= data.money) {
        noMoney.style.visibility = 'hidden';
        money = data.money - parseFloat(money);

        const test = { id: parseInt(id), pin: data.pin, name: data.name, money: money };

        const putMethod = {
            method: 'PUT', // Method itself
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content
            },
            body: JSON.stringify(test) // We send data in JSON format
        }

        fetch(urlApi, putMethod)
            .then(response => response.json())
            .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
            .catch(err => console.log(err))
    } else {
        noMoney.style.visibility = 'visible';
    }
}

function changePin() {
    boxContentInputShowMoney.style.display = 'none';
    boxContentInputPushMoney.style.display = 'none';
    boxContentInputPullMoney.style.display = 'none';
    boxContentInputChangePin.style.display = 'block';
}

function buttonChangePin() {
    let pin = document.getElementById('contentInputChangePin').value;
    console.log(pin);
    const test = { id: parseInt(id), pin: parseInt(pin), name: data.name, money: data.money };

    const putMethod = {
        method: 'PUT', // Method itself
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content
        },
        body: JSON.stringify(test) // We send data in JSON format
    }

    fetch(urlApi, putMethod)
        .then(response => response.json())
        .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
        .catch(err => console.log(err))
}
