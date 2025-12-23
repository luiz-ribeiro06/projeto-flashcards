var express = require('express')
var router = express.Router()

router.use((req, res, next) => {
  console.log("Rota /folder acessada");
  next();
});

router.get('/', function(req, res, next) {
  res.render('folder')
})

module.exports = router;