const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Rota /addflashcard acessada");
  next();
});

router.get("/", (req, res, next) => {
    res.render('addflashcard');
});

module.exports = router;