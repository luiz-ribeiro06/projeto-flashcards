document.addEventListener("DOMContentLoaded", () => {
  const btnAdicionar = document.getElementById("btnAdicionarAlternativa");
  const container = document.getElementById("alternativas-container");

  btnAdicionar.addEventListener("click", () => {
    const alternativas = container.querySelectorAll(".alternativa");
    const ultima = alternativas[alternativas.length - 1];

    const nova = ultima.cloneNode(true);
    nova.querySelector("textarea").value = "";
    nova.querySelector("input[type='radio']").checked = false;

    container.appendChild(nova);
  });
});