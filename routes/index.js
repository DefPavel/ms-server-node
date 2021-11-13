const express = require('express');
const router = express.Router();
// Ссылка на контроллер Авторизации
const AuthController = require('../controllers/auth-controller');
// Ссылка на контроллер Главной страницы
const HomeController = require('../controllers/home-controller');

// Ссылка на конфинг подключения
const config = require('../config');
// Ссылка на модуль sql server
const sql = require('mssql');

/*router.get('/', (req, res, next) => {

  sql.connect(config).then(() => {
    return sql.query('select top 1 * from Users')
  })
  .then(result => {
    res.send(result);
  })
  .catch(err => {
      console.log(err);
  })
  sql.on('error', err => {
      console.log(err);
  })
  res.render('login', { title: 'Авторизация' });
});*/

router.get('/test', (req, res) => {

  sql.connect(config, (err) => {
      
      if (err) console.log(err);
      // create Request object
      const request = new sql.Request();    
      // query to the database and get the records
      request.query('select * from Users', (err, recordset) => {
          
          if (err) console.log(err)
          // send records as a response
          res.send(recordset);
          
      });
  });
  
});

// Render Auth Page
router.get('/', AuthController.GetLoginView );
// Render Home Page
router.get('/home', AuthController.mustBeLoggedIn, HomeController.GetHomeView );
// Авторизация
router.post('/auth', AuthController.Auth);
// Удалить токен
router.get('/logout', AuthController.Logout );




module.exports = router;
