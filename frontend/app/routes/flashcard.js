const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Rota /flashcard acessada");
  next();
});

router.get("/", (req, res, next) => {
    res.render('flashcard');
});

module.exports = router;