const API_URL = "/api/question";
const questionId = window.location.pathname.split('/').pop();

const statementEl = document.getElementById('statement');
const alternativesEl = document.getElementById('alternatives');
const form = document.getElementById('answerForm');

async function loadQuestion() {
  try {
    const res = await fetch(`${API_URL}/${questionId}`);
    if (!res.ok) throw new Error("Erro ao buscar questão");

    const q = await res.json();

    statementEl.textContent = q.statement;
    alternativesEl.innerHTML = "";

    q.alternative.forEach((alt, index) => {
      const label = document.createElement('label');
      label.style.display = "block";

      label.innerHTML = `
        <input type="radio" name="answer" value="${index}" required>
        ${alt.text}
      `;

      alternativesEl.appendChild(label);
    });

  } catch (err) {
    statementEl.textContent = "Erro ao carregar a questão";
    console.error(err);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return;

  const selectedIndex = Number(selected.value);
  alert(`Você marcou a alternativa ${selectedIndex + 1}`);

  
});

loadQuestion();
