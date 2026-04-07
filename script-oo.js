class Calculadora{ //Aqui é o começo da função
    constructor(container){
        this.container = container;
        this.display = document.getElementById("display"); //A gente vai pegar o elemento display
        this.botoes = document.querySelectorAll(".botao"); //E os elementos botões
        this.expressao = ""; //E vamos definir a variavel expressão como ""

        this.iniciar() //E aqui iniciamos nossa calculadora

    }
    iniciar(){
        this.atualizarDisplay("0"); //O valor do display vai começar com 0
        this.configurarCliques(); //A gente vai chamar a função para verificar os cliques
        this.configurarTeclado(); //A gente vai chamar a função para configurar o teclado
    }

    atualizarDisplay(valor){ //A gente vai ataulizar o display com o valor do calculo
        this.display.value = valor || "0";

    }

    limpar(){
        this.expressao = ""; //A gente vai limpar o display quando o jogador quiser
        this.atualizarDisplay("0");
    }

    adicionarValor(valor){
        if(this.display.value === "0" && valor !== "."){
            this.expressao = valor;
        } else {
            this.expressao += valor;
        }
        this.atualizarDisplay(this.expressao);
    }

    calcular(){
        try{
            const resultado = eval(this.expressao);

            if(resultado === undefined || isNaN(resultado)){
                this.atualizarDisplay("Erro");
                this.expressao = "";
                return;
            }

            this.expressao = String(resultado);
            this.atualizarDisplay(this.expressao);
        } catch (erro){
            this.atualizarDisplay("Erro");
            this.expressao = "";
        }
    }


    apagarUltimo(){
        this.expressao = this.expressao.slice(0, -1);
        this.atualizarDisplay(this.expressao);
    }

    tratarEntrada(valor){
        if(valor === "C"){
            this.limpar();
            return;
        }
        if(valor === "="){
            this.calcular();
            return;
        }
        
        this.adicionarValor(valor);
    }
    configurarCliques() {
        this.botoes.forEach((botao) => { 
            botao.addEventListener("click", (evento) => { //A gente vai verificar o click do botão
                const valor = evento.target.dataset.valor; //E vai definir o valor com base em qual botão foi clicado

                if(valor){
                    this.tratarEntrada(valor); 
                }
            });
        });
    }

    configurarTeclado(){
    document.addEventListener("keydown", (evento) => {
        const tecla = evento.key;

        if((tecla >= "0" && tecla <= "9") || ["+", "-", "*", "/", "."].includes(tecla)){
            this.adicionarValor(tecla);
        } else if(tecla === "Enter"){
            this.calcular();
        } else if(tecla === "Backspace"){
            this.apagarUltimo();
        } else if(tecla === "Escape"){
            this.limpar();
        }
    });
    }
}

const calculadora = Calculadora(document.getElementById("calc1"))
const calculadora2 = Calculadora(document.getElementById("calc2"))