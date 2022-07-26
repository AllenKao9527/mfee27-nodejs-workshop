const express = require('express');
// 初始化 dotenv
require('dotenv').config();
// 利用 express 這個框架/函式庫 來建立一個 web application
const app = express();

const port = process.env.SERVER_PORT || 3002;

const cors = require('cors');
// 使用這個第三方提供的 cors 中間件
// 來允許跨源存取
// 預設都是全部開放
app.use(cors());
// 使用情境: 當前後端網址不同時，只想允許自己的前端來跨源存取
//          就可以利用 origin 這個設定來限制，不然預設是 * (全部)
// const corsOptions = {
//   origin: ['http://localhost:3000'],
// };
// app.use(cors(corsOptions));

// 使用資料庫
const pool = require('./utils/db');

// 讓 express 認得 json
// Content-Type: application/json
// 就要加上這個中間件
app.use(express.json());

// 設定視圖引擎
app.set('view engine', 'pug');
// 告訴 express 視圖在哪裡
app.set('views', 'views');

// 設置靜態檔案
const path = require('path');
// express.static -> 讓靜態檔案可以有網址
// http://localhost:3002/uploads/檔案名稱
app.use(express.static(path.join(__dirname, 'public')));
// 或是給 prefix
// http://localhost:3002/public/uploads/檔案名稱
// app.use('/public', express.static(path.join(__dirname, 'public')));

// 測試 server side render
app.get('/ssr', (req, res, next) => {
  // views/index.pug
  res.render('index', {
    stocks: ['台積電', '長榮航', '聯發科'],
  });
});

// request -> middleware 1 -> middleware 2 -> ... -> reponse
// 中間件裡一定要有 next 或者 response
// - next() 往下一個中間件
// - res.xxx 結束 (req-res cycle)
// pipeline pattern

// 一般的 middleware
app.use((req, res, next) => {
  console.log('這是中間件 A');
  let now = new Date();
  console.log(`有人來訪問喔 at ${now.toISOString()}`);

  next();
});

app.use((req, res, next) => {
  console.log('這是中間件 C');

  next();
});

// 路由中間件
// app.[method]
// method: get, post, delete, put, patch, ...
// GET /
app.get('/', (req, res, next) => {
  console.log('這裡是首頁');
  res.send('Hello Express');
});
app.get('/test', (req, res, next) => {
  console.log('這裡是 test 1');
  res.send('Hello Test 1');
  // next();
});

let stockRouter = require('./routers/stocks');
app.use('/api/1.0/stocks', stockRouter);

let authRouter = require('./routers/auth');
app.use(authRouter);

// app.get('/test', (req, res, next) => {
//   console.log('這裡是 test 2');
//   res.send('Hello Test 2');
// });

// 在所有的路由中間件的下面
// 既然前面所有的「網址」都比不到，表示前面沒有任何符合的網址 (旅程一直沒有被結束)
// --> 404
// 利用這個特殊的順序，把這裡當成 404
app.use((req, res, next) => {
  console.log('在所有路由中間件的下面 -> 404 了！');
  res.status(404).send('Not Found!!');
});

// 啟動 server，並且開始 listen 一個 port
app.listen(port, () => {
  console.log(`server start at ${port}`);
});
