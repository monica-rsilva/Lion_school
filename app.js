/*
Name: Kauê Lima, Mônica
Version: 1.0
*/


const express = require("express"); // Responsavel pelas requisoes 
const cors = require("cors"); //  Responsalvel pelas permissoes das requisiçoes
const bodyParse = require("body-parser"); // responsavel pela manipulaçao do body da requisição
const { request, response } = require("express");

const app = express();

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    // Indo no header e criando uma permissao de origem    (*) --> significa que ela é publica. 
    // Podemos tambem podemos limitar nossa APi, colocando IP da maquina,ela so ira responder para aquela maquina

    response.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS"); // Permite gerenciar quais metodos poderão fazer requisições.

    app.use(cors());// Ativa no cors das requisições as permissões estabelecidas 
    next();
})


// Endpoints --> Pontos de parada 
const listCourse = require('./modulo/functions.js');
const { getStudentInformation, getStudentsForCourse } = require("./modulo/functions.js");



app.get("/v1/lion-school/cursos", cors(), async function (request, response, next) { // endpoint para listar os Estados
    let listCourseSchool = listCourse.getListCourse()

    response.json(listCourseSchool)
    response.status(200);

});

app.get("/v1/lion-school/alunos", cors(), async function (request, response, next) {
    let listStudentData = listCourse.getListNameStudents()
    response.json(listStudentData)
    response.status(200)
});


app.get("/v1/lion-school/alunos/:matricula", cors(),async function(request, response, next) {

  let matricula = request.params.matricula
  let statusCode
  let dataStudent = {}

  //Tratamento para vaidar os valores encaminhados no parâmetro
  if (matricula == '' || matricula == undefined ) {
      statusCode = 400
      dataStudent.message = ("Não é possível processar a requisição!")
  } else {
      //chama a função que filtra o estado pela matricula
      let student = getStudentInformation(matricula)
      statusCode = 200  
      dataStudent = student
          //valida se houve retorno válido da funçao
      
  }

  response.status(statusCode)
  response.json(dataStudent)
     
})


app.get("/v1/lion-school/alunos/por/:curso",cors(),async function(request, response,next){

  let course = request.params.curso
  let statusCode;
  let dataCourse = {}

  if (course == '' || course == undefined || !isNaN(course) ) {
    statusCode = 400
    dataCourse.message = ("Não é possível processar a requisição!")
  } 
    let funcao = listCourse.getStudentsForCourse(course)

    if (funcao) {
      statusCode = 200
      dataCourse = funcao  
    }else{
      statusCode = 404
    }
    
  response.status(statusCode)
  response.json(dataCourse)
  

})

app.get("/v1/lion-school/alunos/status/:status",cors(),async function(request,response,next){
  let status = request.params.status
  let statusCode;
  let dataStatus = {}

  if (status == '' || status == undefined || !isNaN(status) ) {
    statusCode = 400
    dataStatus.message = ("Não é possível processar a requisição!")
  } 
    let funcao = listCourse.getStudentsStatus(status)

    if (funcao) {
      statusCode = 200
      dataStatus = funcao  
    }else{
      statusCode = 404
    }
    
  response.status(statusCode)
  response.json(dataStatus)
})



app.listen(8080, function () {
    console.log('Servidor aguardando requisições na porta 8080');

})