const jwt = require('jsonwebtoken');
// Ключ 
const jwtsecret = '5hEH2V8QLh';

// промежуточная проверка токена
exports.mustBeLoggedIn = (req, res, next) => {
    jwt.verify(req.cookies.cookieToken, jwtsecret, 
       (err) => {
      if (err) {
        res.redirect("/");
      } 
      else {
        next();
      }
    });
}
// Получить View Login Или Home , если персона имеет токен
exports.GetLoginView = (req, res) => {
    jwt.verify(req.cookies.cookieToken, jwtsecret, (err, decoded) => {
        if (err) {
          res.render('login', { title: 'Авторизация' });
        } else {
          res.render('home', { name: decoded.name , name_link: '/home' });
        }
      })
}
// Авторизация 
exports.Auth = (req, res) => {
  if (req.body.username === "vitalik" && req.body.password === "qwerty") {
    res.cookie(
      "cookieToken",
      jwt.sign({ name: req.body.username, role: "Admin" }, jwtsecret),
      { httpOnly: true,
        expiresIn: '1h' // Токен истекает через 1 час
      }
    )
    res.redirect("/home")
  } else {
    res.send({message:"Неверный логин или пароль"});
  }

}
// Удаление токена
exports.Logout = (req, res) => {
    res.clearCookie('cookieToken')
    res.redirect('/');  
}