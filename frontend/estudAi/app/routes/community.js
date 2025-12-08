const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Rota /community acessada");
  next();
});

router.get("/", (req, res, next) => {
    res.render('community');
});

module.exports = router;