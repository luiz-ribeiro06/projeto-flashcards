const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Rota /home acessada");
  next();
});

router.get('/', function(req, res, next){
  res.render('home')
})

module.exports = router;