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
      }, { limit: 23, endTime: +new Date() });
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


main();

// var inputRSI = {
//   values : [43794.37,  46253.4,
//     45584.99,    45511,
//        44399,    47800,
//     47068.51, 46973.82,
//     45901.29, 44695.95,
//     44705.29, 46760.62,
//     49322.47, 48821.87],
//   period : 14
// };
// var expectedResult = [
//     86.41,86.43,89.65,86.50,84.96,80.54,77.56,58.06
// ];

// let a= RSI.calculate(inputRSI);
// console.log(a);