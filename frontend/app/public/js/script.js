const API_URL = "/api/question"
const questionsContainer = document.getElementById('questionsContainer')

document.addEventListener('DOMContentLoaded', () => {
    const btnAdd = document.getElementById('btnAdicionarAlternativa');
    const container = document.getElementById('alternativas-container');
    const form = document.getElementById('formQuestao');

    btnAdd.addEventListener('click', () => {
        const div = document.createElement('div');
        div.className = 'input-group mb-2 alternativa';
        div.innerHTML = `
            <div class="input-group-text">
                <input class="form-check-input mt-0" type="radio" name="correta">
            </div>
            <textarea class="form-control" rows="1" placeholder="Digite a alternativa" required></textarea>
            <button type="button" class="btn btn-outline-secondary btn-remove">X</button>
        `;
        
        div.querySelector('.btn-remove').addEventListener('click', () => {
            div.remove();
        });

        container.appendChild(div);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const statement = document.getElementById('enunciado').value;
        const discipline = document.getElementById('disciplina').value;
        
        const alternativaDivs = document.querySelectorAll('.alternativa');
        const alternative = [];

        alternativaDivs.forEach(div => {
            const text = div.querySelector('textarea').value;
            const correct = div.querySelector('input[type="radio"]').checked;
            
            if (text.trim()) {
                alternative.push({
                    text: text,
                    correct: correct
                });
            }
        });

        const data = {
            statement,
            discipline,
            alternative
        };

        try {
            const response = await fetch('http://localhost:3000/api/question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                alert('Questão adicionada com sucesso!');
                form.reset();
            } else {
                alert('Erro: ' + (result.erro || 'Erro desconhecido'));
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao conectar com o servidor.');
        }
    });
});

// carregar as questões

async function loadQuestions() {
    questionsContainer.innerHTML = "<p>Carregando questões...</p>";

    try {
        const res = await fetch(API_URL);
        const questions = await res.json();

        questionsContainer.innerHTML = "";

        questions.forEach((q) => {
            const card = document.createElement('div');
            card.className = "card";
            card.innerHTML = `
                <h3>Matéria: ${q.discipline}</h3>
                <button onclick="goToAnswer('${q._id}')">Responder</button>
                <button onclick="deleteQuestion('${q._id}')">Excluir</button>
            `;
            questionsContainer.appendChild(card);
        });

    } catch (err) {
        console.error(err);
        questionsContainer.innerHTML = "<p>Erro ao carregar questões</p>";
    }
    
}

async function deleteQuestion(id) {
   if(!confirm("Deseja excluir?")) return ;
   try {
    await fetch(`${API_URL}/${id}`, {method: "DELETE"})
    loadQuestions();
   } catch (error) {
    alert('Erro ao excluir questão!')
   }

}

function goToAnswer(id) {
  window.location.href = `/answer/${id}`;
}


loadQuestions();