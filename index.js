"use strict"

require("dotenv").config();
const Binance = require("node-binance-api");
const binance = new Binance().options({
  APIKEY: process.env.APIKEY,
  APISECRET: process.env.APISECRET
});
var RSI = require('technicalindicators').RSI;


function getRSI(inputRSI) {
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
        console.log({ rsi });
        resolve(closePriceArray);
      }, { limit: 15, endTime: +new Date() });
    } catch (error) {
      reject(error);
    }

  });
}

const candles = getCandles("BTCUSDT");

let rsi = {
  values: candles,
  period: 14
};

getRSI(rsi);