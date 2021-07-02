const pegarDoBanco = () => JSON.parse(localStorage.getItem('todo-conteudo')) ?? [];

const enviarProBanco = (bancoDeDados) => localStorage.setItem('todo-conteudo', JSON.stringify(bancoDeDados));


const criarItem = (tarefa, status, indice) => {
   const item = document.createElement('label');
   item.classList.add('todo__item');
   item.innerHTML = `
    <input type="checkbox" ${status} data-indice = ${indice} >
    <div>${tarefa}</div>
    <input type="button" value="X" data-indice = ${indice}>   
   `

   document.getElementById('todo-conteudo').appendChild(item);
}

const limparTarefas = () => {
   const conteudo = document.getElementById('todo-conteudo');
   while(conteudo.firstChild) {
       conteudo.removeChild(conteudo.lastChild);
   }
}

const atualizarTela = () => {
    limparTarefas();
    const bancoDeDados = pegarDoBanco();
    bancoDeDados.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if(tecla=== 'Enter'){
        const bancoDeDados = pegarDoBanco();
        bancoDeDados.push({'tarefa' : texto, 'status' : ''})
        enviarProBanco(bancoDeDados);
        atualizarTela();
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    const bancoDeDados = pegarDoBanco();
    bancoDeDados.splice(indice, 1);
    enviarProBanco(bancoDeDados);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const bancoDeDados = pegarDoBanco();
    bancoDeDados[indice].status = bancoDeDados[indice].status === '' ? 'checked' : '';
    enviarProBanco(bancoDeDados);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if(elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if(elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

document.getElementById('novo__item').addEventListener('keypress', inserirItem);
document.getElementById('todo-conteudo').addEventListener('click' , clickItem);


atualizarTela();