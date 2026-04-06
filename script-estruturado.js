const display = document.getElementById("display");
const botoes = document.querySelectorAll(".botao");

let expressao = "";

function atualizarDisplay(valor) {
  display.value = valor || "0";
}

function limpar() {
  expressao = "";
  atualizarDisplay("0");
}

function adicionarValor(valor) {
  if (display.value === "0" && valor !== ".") {
    expressao = valor;
  } else {
    expressao += valor;
  }

  atualizarDisplay(expressao);
}

function calcular() {
  try {
    const resultado = eval(expressao);

    if (resultado === undefined || isNaN(resultado)) {
      atualizarDisplay("Erro");
      expressao = "";
      return;
    }

    expressao = String(resultado);
    atualizarDisplay(expressao);
  } catch (erro) {
    atualizarDisplay("Erro");
    expressao = "";
  }
}

function tratarClique(evento) {
  const valor = evento.target.dataset.valor;

  if (!valor) return;

  if (valor === "C") {
    limpar();
    return;
  }

  if (valor === "=") {
    calcular();
    return;
  }

  adicionarValor(valor);
}

botoes.forEach(function (botao) {
  botao.addEventListener("click", tratarClique);
});

document.addEventListener("keydown", function (evento) {
  const tecla = evento.key;

  if (
    (tecla >= "0" && tecla <= "9") ||
    ["+", "-", "*", "/", "."].includes(tecla)
  ) {
    adicionarValor(tecla);
  } else if (tecla === "Enter") {
    calcular();
  } else if (tecla === "Backspace") {
    expressao = expressao.slice(0, -1);
    atualizarDisplay(expressao);
  } else if (tecla === "Escape") {
    limpar();
  }
});

atualizarDisplay("0");