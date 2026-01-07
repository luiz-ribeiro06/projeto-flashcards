const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Configurações Iniciais
dotenv.config();
const connectDB = require("./database/connection");
const app = express();

connectDB();

// --- Middlewares ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura o EJS
app.set('views', path.join(__dirname, '../frontend/app/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../frontend/app/public')));

// Rotas da API
const questionRouter = require('./routes/question');
app.use('/api/question', questionRouter);

// Rotas das Páginas (Frontend)
app.get('/', (req, res) => res.render('home'));
app.get('/add', (req, res) => res.render('add'));
app.get('/question', (req, res) => res.render('question'));
app.get('/folder', (req, res) => res.render('folder'));
app.get('/answer', (req, res) => res.render('answer'));
app.get('/list', (req, res) => res.render('list'));
app.get('/flashcard', (req, res) => res.render('flashcard'));
app.get('/community', (req, res) => res.render('community'));
app.get('/user', (req, res) => res.render('user'));
app.get('/about', (req, res) => res.render('about'));
app.get('/addflashcard', (req, res) => res.render('addflashcard'));

// Tratamento de Erros
app.use((req, res, next) => {
    const err = new Error('Página não encontrada');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    if (req.accepts('html')) {
        res.render('error', { message: err.message, error: err });
    } else {
        res.json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));