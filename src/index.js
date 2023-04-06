'use strict';

const criarButton = cursos => {

  const button = document.createElement('button')
  button.classList.add('buttonCurso')
  button.id = cursos.sigla

  const icone = document.createElement('img')
  icone.src = cursos.icone
  icone.alt = cursos.nome

  const name = document.createElement('span')
  name.classList.add('button_name')
  name.textContent = cursos.sigla

  button.append(icone,name)

  button.addEventListener('click', function(){

    localStorage.setItem('id',button.id)

   carregarCardAluno()

  })

  return button
}

const carregarCursos = async() => {

  const url = `https://segredo.onrender.com/v1/lion-school/cursos`;

  const response = await fetch(url);
  const data = await response.json();
  const cursos = await data.course

  const container = document.getElementById('courses')
  const cardButton = cursos.map(criarButton)

  container.replaceChildren(...cardButton)

}

carregarCursos();

const cardAluno = alunos => {

  const card = document.createElement('div')
  card.classList.add('card_aluno')

  const img = document.createElement('img')
  img.src = alunos.photo

  const name = document.createElement('span')
  name.textContent = alunos.name

  card.append(img,name)

  return card

}

  const carregarCardAluno = async() => {

    let curso = localStorage.getItem('id')

    const url = `https://segredo.onrender.com/v1/lion-school/alunos/por/${curso}`

    const response = await fetch(url);
    const data = await response.json();
    const alunos = await data.student
    
    const container = document.querySelector('#main')

    const header = document.querySelector('#main header')
    container.removeChild(header);

    const cards = document.createElement('div')
    cards.classList.add('div_cards')

    const noasme = document.createElement('div')
    noasme.classList.add('card_aluno')

    const img = document.createElement('img')
    img.src = alunos.photo

    const nome = document.createElement('span')
    nome.textContent = alunos.name

    // noasme.appendchildren(img,nome)

    cards.append(noasme)

    container.appendChild(cards)

    const card_Aluno = alunos.map(cardAluno)

    cards.replaceChildren(...card_Aluno)

  }
  

