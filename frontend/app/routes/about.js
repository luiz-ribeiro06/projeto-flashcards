const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Rota /about acessada");
  next();
});

router.get("/", (req, res, next) => {
    res.render('about');
});

module.exports = router;