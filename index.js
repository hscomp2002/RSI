"use strict"

require("dotenv").config();
const Binance = require("node-binance-api");
const binance = new Binance().options({
  APIKEY: process.env.APIKEY,
  APISECRET: process.env.APISECRET
});
var RSI = require('technicalindicators').RSI;


function getRSI(inputRSI) {
  console.log({inputRSI});
  let rsi = RSI.calculate(inputRSI);
  console.log(rsi);
  return rsi;
}

function getCandles(symbol) {
  return new Promise((resolve, reject) => {
    try {
      binance.candlesticks(symbol, process.env.TIMEFRAME, (error, ticks, symbol) => {
        let closePriceArray = [];
        for (let i in ticks) {
          if (i != ticks.length - 1) {
            closePriceArray.push(Number(ticks[i][4]));
          }
        }
        resolve(closePriceArray);
      }, { limit: 15, endTime: +new Date() });
    } catch (error) {
      reject(error);
    }

  });
}
async function main() {
  const candles = await getCandles("BTCUSDT");

  let rsi = {
    values: candles,
    period: 14
  };

  getRSI(rsi);
}


//main();

var inputRSI = {
  values : [127.75,129.02,132.75,145.40,148.98,137.52,147.38,139.05,137.23,149.30,162.45,178.95,200.35,221.90,243.23,243.52,286.42,280.27,277.35,269.02,263.23,214.90],
  period : 14
};
var expectedResult = [
    86.41,86.43,89.65,86.50,84.96,80.54,77.56,58.06
];

let a= RSI.calculate(inputRSI);
console.log(a);