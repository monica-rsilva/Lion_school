'use strict';

const criarButton = cursos => {

  const button = document.createElement('button')
  button.classList.add('buttonCurso')

  const icone = document.createElement('img')
  icone.src = cursos.icone
  icone.alt = cursos.nome

  const name = document.createElement('span')
  name.classList.add('button_name')
  name.textContent = cursos.sigla

  button.append(icone,name)

  return button
}
const carregarCursos = async() => {
  const url = `https://api-lion-school.onrender.com/v1/lion-school/cursos`;

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
  img.src = alunos.foto

  const name = document.createElement('span')
  name.textContent = alunos.nome

  

}

