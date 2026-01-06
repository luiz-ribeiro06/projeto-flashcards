const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Rota /answer acessada");
  next();
});

router.get("/", (req, res, next) => {
    res.render('answer');
});

module.exports = router;