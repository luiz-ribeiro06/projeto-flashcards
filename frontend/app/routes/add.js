const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Rota /add acessada");
  next();
});

router.get("/", (req, res, next) => {
    res.render('add');
});

module.exports = router;