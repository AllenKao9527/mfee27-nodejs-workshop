// router: mini app
const express = require('express');
const router = express.Router();

const pool = require('../utils/db');

// router.use
// router.get

// API
// 列出所有股票代碼
// GET /stocks
router.get('/', async (req, res, next) => {
  console.log('/api/1.0/stocks');

  // 寫法1:
  // let result = await pool.execute('SELECT * FROM stocks');
  // let data = result[0];
  // 寫法2:
  let [data] = await pool.execute('SELECT * FROM stocks');

  // console.log('result', data);
  res.json(data);
});

// 列出某個股票代碼的所有報價資料
// GET /stocks/2330
router.get('/:stockId', async (req, res, next) => {
  const stockId = req.params.stockId;

  // 去資料庫撈資料
  // let [data] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id=?', [stockId]);

  // sql injection
  // stockId 2330 || 1=1 --
  // SELECT * FROM stock_prices WHERE stock_id=2330 || 1=1 -- and ....
  // http://localhost:3002/api/1.0/stocks/2412 || 1=1 --
  // let [data] = await pool.execute(`SELECT * FROM stock_prices WHERE stock_id=${stockId}`);

  // 分頁

  // 目前第幾頁 -> query string
  // 預設第一頁
  let page = req.query.page || 1;

  // perPage
  const perPage = 5;

  // total -> 總筆數
  let [total] = await pool.execute('SELECT COUNT(*) AS total FROM stock_prices WHERE stock_id=?', [stockId]);
  console.log(total);
  total = total[0].total;
  // console.log(total);

  // lastPage -> 總頁數 -> Math.ceil
  let lastPage = Math.ceil(total / perPage);

  // 計算offset -> 跳過幾筆
  const offset = perPage * (page - 1);

  // 取得資料
  let [data] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id = ? ORDER BY date LIMIT ? OFFSET ?', [stockId, perPage, offset]);

  // 把取得的資料回覆給前端
  res.json({
    pagination: {
      total,
      perPage,
      page,
      lastPage,
    },
    data,
  });
});

module.exports = router;
