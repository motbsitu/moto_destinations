const router = require('express').Router();
const passport = require('passport');

router.post('/', passport.authenticate('local'), function(req, res) {
  res.sendStatus(200);
});

router.get('/', function (req, res){
  res.send(req.isAuthenticated());
})

router.get('/logout', function (req, res){
  console.log('logging out');
  req.logout()
  res.redirect('/');
})

module.exports = router;
