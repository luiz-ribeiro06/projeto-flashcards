const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Rota /question acessada");
  next();
});

router.get("/", (req, res) => {
    res.render('question');
});

module.exports = router;