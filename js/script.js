var eth;
var ethBtc;
var btcCad;

function getEthBalance() {
    fetch('https://api.nanopool.org/v1/eth/balance/0x1dd262d8172887bf4dc30a1ee6093493252901cc')
        .then(res => res.json())
        .then(data => {
            eth = parseFloat(data.data);
            ethBal.innerHTML = "ETH: " + eth.toFixed(8).toString()})
}

function getLastHashrate(){
    fetch ('https://api.nanopool.org/v1/eth/reportedhashrate/0x1dd262d8172887bf4dc30a1ee6093493252901cc')
        .then(res => res.json())
        .then(data => {lastHashrate.innerHTML = "Last Hashrate: " + (parseFloat(data.data).toFixed(1)).toString() + " Mh/s"})
}

function getPastHourHashrate(){
    fetch ('https://api.nanopool.org/v1/eth/avghashratelimited/0x1dd262d8172887bf4dc30a1ee6093493252901cc/1')
        .then(res => res.json())
        .then(data => {pastHourHashrate.innerHTML = "Past Hour Hashrate: " + (parseFloat(data.data).toFixed(1)).toString() + " Mh/s"})
}

//function getBalanceUsd() {
//    fetch('https://api.nanopool.org/v1/eth/prices')
//        .then(res => res.json())
//        .then(data => {usdBal.innerHTML = "USD: " + (parseFloat(data.data.price_usd) * eth).toFixed(2).toString()})
//}

function getBalanceCad() {
    fetch('https://api.coingecko.com/api/v3/exchange_rates')
        .then(res => res.json())
        .then(data => {
            ethBtc = parseFloat(data.rates.eth.value);
            btcCad = parseFloat(data.rates.cad.value);
            cadBal.innerHTML = "CAD: " + (eth * (1 / ethBtc) * btcCad).toFixed(2)})
}

function realtimeClock() {
    var rtClock = new Date();

    var hours = rtClock.getHours();
    var minutes = rtClock.getMinutes();
    var seconds = rtClock.getSeconds();

    var amPm = (hours < 12) ? "AM" : "PM";

    hours = (hours > 12) ? hours - 12 : hours;
    if (hours == 0){
        hours = 12;
    }

    //hours = ("0" + hours).slice(-2);
    minutes = ("0" + minutes).slice(-2);
    seconds = ("0" + seconds).slice(-2);

    document.getElementById('clock').innerHTML = hours + " : " + minutes + " : " + seconds + " " + amPm;
    var t = setTimeout(realtimeClock, 500);
    getEthBalance();
    getBalanceCad();
    getLastHashrate();
    getPastHourHashrate();
}

