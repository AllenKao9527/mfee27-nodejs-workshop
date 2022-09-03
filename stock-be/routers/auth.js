const express = require('express');
const router = express.Router();
const pool = require('../utils/db');

// for hash password
const bcrypt = require('bcrypt');

// /api/1.0/auth/register
router.post('/api/1.0/auth/register', async (req, res, next) => {
  // 確認資料有沒有收到
  console.log('register', req.body);
  // 驗證來自前端的資料

  let [members] = await pool.execute('SELECT * FROM members WHERE email = ?', [req.body.email]);
  if (members.length === 0) {
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    // 資料存到資料庫
    let result = await pool.execute('INSERT INTO members (email, password, name) VALUES (?, ?, ?);', [req.body.email, hashedPassword, req.body.name]);
    console.log('insert new member', result);
    // 回覆前端
    res.json({ message: 'ok' });
  } else {
    // email已存在 -> 回覆 400 跟錯誤訊息
    return res.status(400).json({ message: '這個 email 已經註冊過' });
  }
});

module.exports = router;
