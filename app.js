let listaNumeroSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAletorio();
let tentativa = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Olá Maynara, vamos jogar ?');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100. Você possui 3 tentativas!');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    let palavraTentativa = tentativa > 1 ? 'tentativa' : 'tentativas';
    let mensagemTentativa = `Pode escolher o que deseja ganhar`

    if (tentativa == 3) {
        exibirTextoNaTela('h1', 'Você perdeu')
        exibirTextoNaTela('p', `Você utilizou ${tentativa} tentativas`)
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute == numeroSecreto) {
            exibirTextoNaTela('h1', 'Você ganhou!');
            exibirTextoNaTela('p', mensagemTentativa);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            if (chute > numeroSecreto) {
                exibirTextoNaTela('p', `O número secreto é menor. Você possui mais ${3 - tentativa} ${palavraTentativa}`);
            } else {
                exibirTextoNaTela('p', `O número secreto é maior. Você possui mais ${3 - tentativa} ${palavraTentativa}`);
            }
            tentativa++;
            limparCampo();
        }
    }
}

function gerarNumeroAletorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaNumeroSorteados.length;

    if (quantidadeElementosLista == numeroEscolhido) {
        listaNumeroSorteados = [];
    }

    if (listaNumeroSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAletorio();
    } else {
        listaNumeroSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAletorio();
    limparCampo();
    tentativa = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}