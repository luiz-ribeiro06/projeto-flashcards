const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const questionRouter = require('./backend/routes/question')

dotenv.config();
const app = express();

app.use(express.json());
app.use('/question', questionRouter);
app.use(cors());

app.get("/", (req, res) => {
  res.send("Servidor funcionando.");
});

const connectDB = require("./connection");
const { appendFile } = require("fs");
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
