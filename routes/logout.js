const router = require('express').Router();
const passport = require('passport');



router.get('/', function (req, res){
  console.log('logging out');
  req.logout()
  res.redirect('/');
})

module.exports = router;
