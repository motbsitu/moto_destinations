const router = require('express').Router();
const passport = require('passport');

router.post('/', passport.authenticate('local'), function(req, res) {
  res.sendStatus(200);
});

// router.get('/', function (req, res){
//   res.send(req.isAuthenticated());
// })



module.exports = router;
