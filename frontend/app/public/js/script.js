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