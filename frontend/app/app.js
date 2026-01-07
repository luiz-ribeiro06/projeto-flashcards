const express = require("express");
const path = require('path');
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    console.log(`Acesso à rota: ${req.path}`);
    next();
});

const addflashcardRouter = require("./routes/addflashcard");
const aboutRouter = require("./routes/about");
const userRouter = require("./routes/user");
const homeRouter = require("./routes/home");
const addRouter = require("./routes/add");
const folderRouter  = require("./routes/folder");
const { error } = require("console");
const answerRouter = require("./routes/answer");
const listRouter = require("./routes/list");
const flashcardRouter = require("./routes/flashcard");
const communityRouter = require("./routes/community");

app.use("/", homeRouter);
app.use("/add", addRouter);
app.use("/folder", folderRouter);
app.use("/answer", answerRouter);
app.use("/list", listRouter);
app.use("/flashcard", flashcardRouter);
app.use("/community", communityRouter);
app.use("/user", userRouter);
app.use("/about", aboutRouter);
app.use("/addflashcard", addflashcardRouter);

app.get('/user', function(req, res){
  res.render('user');
});

app.get('/add', function(req, res){
  res.render('add');
});

app.get('/', function(req, res){
  res.render('home');
});

app.get('/folder', function(req, res){
  res.render('folder');
});



app.get('/community', function(req, res){
  res.render('community');
});

app.get('/list', function(req, res){
  res.render('list');
});

app.get('/flashcard', function(req, res){
  res.render('flashcard');
});

app.get('/about', function(req, res){
  res.render('about');
});

app.get('/addflashcard', function(req, res){
  res.render('addflashcard');
});

app.use((req, res, next) => {
  const err = new Error('Página não encontrada');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
});
});

module.exports = app;