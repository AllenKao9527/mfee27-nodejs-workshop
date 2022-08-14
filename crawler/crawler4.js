// 1. 自動取得今日日期 （可能利用 cron 排程工具 系統每日自動執行）
// 2. 從檔案中讀取股票代碼
const axios = require('axios');
const moment = require('moment');
const fsPromises = require('fs/promises');

//取得日期

// TODO: 需要從 stock.txt 的檔案裡讀取股票代碼

// axios.get(url, 設定)
(async () => {
  try {
    let stockNo = await fsPromises.readFile('./crawler/stock.txt', 'utf8');

    let queryNameResponse = await axios.get('https://www.twse.com.tw/zh/api/codeQuery', {
      params: {
        query: stockNo,
      },
    });
    // console.log(queryNameResponse.data.suggestions);
    let suggestions = queryNameResponse.data.suggestions;
    let suggestion = suggestions[0];
    if (suggestion === '(無符合之代碼或名稱)') {
      console.error(suggestion);
      throw new Error(suggestion);
    }
    let stockName = suggestion.split('\t').pop();
    console.log('stockName', stockName);

    let queryDate = moment().format('YYYYMMDD'); //'20220814';
    console.log(queryDate);
    let response = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY`, {
      params: {
        response: 'json',
        date: queryDate,
        stockNo: stockNo,
      },
    });
    console.log(response.data);
  } catch (e) {
    console.error(e);
  }
})();
