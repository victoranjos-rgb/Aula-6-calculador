class Calculadora{
    constructor(){
        this.display = document.getElementById("display");
        this.botoes = document.querySelectorAll(".botao");
        this.expressao = "";

        this.iniciar()

    }
    iniciar(){
        this.atualizarDisplay("0");
        this.configurarCliques();
        this.configurarTeclado();
    }

    atualizarDisplay(valor){
        this.display.value = valor || "0";

    }

    limpar(){
        this.expressao = "";
        this.atualizarDisplay("0");
    }

    configurarCliques(){
        this.botoes.forEach(botao) =>{
            botao.addEventListner("click", (evento) =>{
                const valor = evento.target.dataset.valor;

                if(valor){
                    this.tratarEntrada(valor);
                }
            })
        }
    }
}