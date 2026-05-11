let inputTarefa = document.getElementById('input')
let inputDescricao = document.getElementById('inputDescricao')
let btnAdd = document.getElementById('addTarefa')
let listaP = document.getElementById('listaPendente')
let listaA = document.getElementById('listaAndamento')
let listaC = document.getElementById('listaConcluida')
let titulosPendentes = document.getElementById('tituloPendente')
let titulosAndamento = document.getElementById('tituloAndamento')
let titulosConcluidos = document.getElementById('tituloConcluido')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
console.log({ tarefas })

function adicionar() {
  let tarefa = inputTarefa.value.trim()
  let descricao = inputDescricao.value.trim()
  if (tarefa === '') {
    alert('digite sua tarefa')
    return
  }
  if (descricao === '') {
    descricao = 'digite sua descrição no campo de descrição'
  }


  tarefas.push({ tarefa: tarefa, descricao: descricao, status: 'pendente' })
  inputTarefa.value = ''
  inputDescricao.value = ''
  atualizar()

}

function renderizar() {

  listaP.innerHTML = ''
  listaA.innerHTML = ''
  listaC.innerHTML = ''

  if (tarefas.length === 0) {
    listaP.innerHTML = '<p>Nenhuma tarefa aqui</p>'
    listaA.innerHTML = '<p>Nenhuma tarefa aqui</p>'
    listaC.innerHTML = '<p>Nenhuma tarefa aqui</p>'
  }

  tarefas.forEach((tarefaObj, index) => {
    let showTarefa = document.createElement('h3')
    let showDescricao = document.createElement('p')
    let btnEditar = document.createElement('button')
    let btnDelete = document.createElement('button')
    let btnConcluido = document.createElement('button')
    let btnPendente = document.createElement('button')
    let btnAndamento = document.createElement('button')
    let status = document.createElement('div')
    let showStatus = document.createElement('p')
    let action = document.createElement('div')
    let tarefaEl = document.createElement('div')

    tarefaEl.classList.add('tarefaEl')
    action.classList.add('actions')
    status.classList.add('status')

    showTarefa.textContent = tarefaObj.tarefa
    showDescricao.textContent = tarefaObj.descricao
    showStatus.textContent = `Status: ${tarefaObj.status}`
    btnEditar.textContent = 'editar'
    btnDelete.textContent = 'deletar'
    btnConcluido.textContent = '✔'
    btnPendente.textContent = '⏳'
    btnAndamento.textContent = '🚧'

    action.appendChild(btnEditar)
    action.appendChild(btnDelete)
    status.appendChild(btnPendente)
    status.appendChild(btnAndamento)
    status.appendChild(btnConcluido)
    tarefaEl.appendChild(showTarefa)
    tarefaEl.appendChild(showDescricao)
    tarefaEl.appendChild(action)
    tarefaEl.appendChild(status)



    if (tarefaObj.status === 'pendente') {
      listaP.appendChild(tarefaEl)


    } else if (tarefaObj.status === 'andamento') {
      listaA.appendChild(tarefaEl)

    } else {
      listaC.appendChild(tarefaEl)
    }

    if (tarefaObj.status === 'pendente') {
      tarefaEl.style.borderLeft = '5px solid gray'
    }

    if (tarefaObj.status === 'andamento') {
      tarefaEl.style.borderLeft = '5px solid orange'
    }

    if (tarefaObj.status === 'concluido') {
      tarefaEl.style.borderLeft = '5px solid green'
    }

    btnDelete.onclick = () => {
      tarefas.splice(index, 1)
      atualizar()

    }

    btnEditar.onclick = () => {
      let novaTarefa = prompt('editar:', tarefaObj.tarefa.trim())
      if (novaTarefa === null) return

      if (novaTarefa.trim() === '') {
        alert('tarefa invalida!')
        return
      }
      tarefas.splice(index, 1, {
        tarefa: novaTarefa,
        descricao: tarefaObj.descricao,
        status: tarefaObj.status
      })
      atualizar()

    }

    btnAndamento.onclick = () => {
      tarefas[index].status = 'andamento'
      atualizar()

    }

    btnConcluido.onclick = () => {
      tarefas[index].status = 'concluido'
      atualizar()

    }

    btnPendente.onclick = () => {
      tarefas[index].status = 'pendente'

      atualizar()
    }
  })
  contarTarefas()
}

function salvarTarefas() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function contarTarefas() {
  let pendente = tarefas.filter(t => t.status === 'pendente').length
  let andamento = tarefas.filter(t => t.status === 'andamento').length
  let concluido = tarefas.filter(t => t.status === 'concluido').length
  titulosPendentes.textContent = `Pendente(s) ${pendente}`
  titulosAndamento.textContent = `Andamento ${andamento}`
  titulosConcluidos.textContent = `Concluido(s) ${concluido}`

}

function limparConcluidas() {
  tarefas = tarefas.filter(t => t.status !== 'concluido')
  atualizar()
}

function atualizar() {
  salvarTarefas()
  renderizar()
}

inputTarefa.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    adicionar()
    salvarTarefas()

  }
})
renderizar()
btnAdd.addEventListener('click', adicionar)