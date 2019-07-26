const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const mogoose = require('mongodb');
const User = require('../models/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Cadastro' });
});

/*router.post('/signup', function(req, res, next) {
  User.getAll().then((usuarios)=> {
    console.log(usuarios);
    res.render('signup', { title: 'Cadastro' });

  }).catch((error)=>{
    console.log(error);
  });
});
*/
/*router.post('/signup', function(req, res, next) {
  User.create().then(()=> {
    console.log(usuarios);
    res.render('signup', { title: 'Cadastro' });

  }).catch((error)=>{
    console.log(error);
  });
}); */

router.post('/signup', function(req, res, next) {
  const user = req.body.user;
  firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then((criado)=> {
    User.create(user).then((id)=> {
      console.log(id);
      console.log(user);
      res.redirect('/login');
    }).catch((error)=>{
      console.log(error);
    });

}).catch((error)=>{
  console.log(error);
});
});

router.get('/login', function (req, res, next) {
    res.render('login', { title: 'Login' });
});
//router.post(sing up)
router.post('/login', function (req, res, next) {
  const hermon = req.body.user;

  console.log(hermon);
  firebase.auth().signInWithEmailAndPassword(hermon.email, hermon.password).then((logado) => {
  console.log(logado);
  console.log("deu certo");
  res.redirect('/login');
  }).catch((error)=>{
    console.log(error);
  });
});

module.exports = router;
