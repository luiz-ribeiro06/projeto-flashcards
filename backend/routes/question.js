// essa rota é add e question ao mesmo tempo. O add vai ser usado normalmente para adicionar questões e o question para listar.

const express = require("express");
const Question = require("../models/Question");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { alternative } = req.body;

    if (!Array.isArray(alternative)) {
      return res.status(400).json({
        erro: "Campo 'alternative' é obrigatório e deve ser um array"
      });
    }

    const correctCount = alternative.filter(a => a.correct === true).length;

    if (correctCount !== 1) {
      return res.status(400).json({
        erro: "A questão deve ter exatamente uma alternativa correta"
      });
    }

    const question = new Question(req.body);
    const saved = await question.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// listar as questões
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// achar por id
router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ erro: "Questão não encontrada" });
    }

    res.json(question);
  } catch (error) {
    res.status(400).json({ erro: "ID inválido" });
  }
});

// atualizar questão
router.put('/:id', async (req, res)=>{
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});
    if(!updatedQuestion) return res.status(404).json({erro: 'questão não encontrada'})
     res.json(updatedQuestion);

  } catch (error) {
    res.status(400).json({ erro: "questão não encontrada!" });
  }
})

//deletar
router.delete('/:id', async(req, res)=>{
    try {
    const removedQuestion = await Question.findByIdAndDelete(req.params.id);
    if(!removedQuestion) return res.status(404).json({erro: 'questão não encontrada'})
    res.json({mensagem: 'removido com sucesso!'});

  } catch (error) {
    res.status(400).json({ erro: "questão não encontrada!" });
  }
})


module.exports = router;
