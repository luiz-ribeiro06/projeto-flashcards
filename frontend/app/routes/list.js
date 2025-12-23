const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Rota /list acessada");
  next();
});

router.get("/", (req, res, next) => {
    res.render('list');
});

module.exports = router;