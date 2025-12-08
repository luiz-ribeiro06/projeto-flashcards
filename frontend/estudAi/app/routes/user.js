const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Rota /user acessada");
  next();
});

router.get("/", (req, res, next) => {
    res.render('user');
});

module.exports = router;