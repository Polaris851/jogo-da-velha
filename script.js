const celulas = document.querySelectorAll('.celula');
const container = document.querySelector('.container');
const telaMensagem = document.getElementById('resultado');
const mensagem = document.getElementById('msg');
const reiniciar = document.getElementById('btn');

let isCircle;

const combinacaoVitoria = [
    [ 0, 1, 2],
    [ 3, 4, 5],
    [ 6, 7, 8],
    [ 0, 3, 6],
    [ 1, 4, 7],
    [ 2, 5, 8],
    [ 0, 4, 8],
    [ 2, 4, 6]
];


function startJogo() {
    isCircle = false;
    for(const cell of celulas) {
        cell.classList.remove('O');
        cell.classList.remove('X');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true});
    }
    
    verificaJogador();
    telaMensagem.classList.remove('res');
};

function endJogo(empate) {
    if(empate) {
        mensagem.innerHTML = 'Empate';
    } else {
        mensagem.innerHTML = isCircle ? 'O jogador O venceu':'O jogador X venceu';
    }
    
    telaMensagem.classList.add('res');
}

function checkVencedor(currentJogador) {
    return combinacaoVitoria.some((combinacao) => {
        return combinacao.every((index) => {
            return celulas[index].classList.contains(currentJogador);
        });
    });
};

function checkEmpate() {
    return [...celulas].every((cell) => {
        return cell.classList.contains('X') || cell.classList.contains('O')
    })
}

function addJogada(cell, turno) {
    cell.classList.add(turno);
};

function verificaJogador() {
    container.classList.remove('O');
    container.classList.remove('X');

    if(isCircle) {
        container.classList.add('O');   
    } else {
        container.classList.add('X');   
    }
}

function mudaJogador() {
    isCircle = !isCircle;

    verificaJogador();
};

function handleClick(e) {
    const cell = e.target;
    const turno = isCircle ? 'O':'X';

    addJogada(cell, turno);

    const vencedor = checkVencedor(turno);
    const empate = checkEmpate();
    
    if(vencedor) {
        endJogo(false);
    } else if(empate) {
        endJogo(true);
    } else {
        mudaJogador();
    }
}

startJogo();
reiniciar.addEventListener('click', startJogo);