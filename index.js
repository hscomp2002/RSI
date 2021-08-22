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
      }, { limit: 41, endTime: +new Date() });
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