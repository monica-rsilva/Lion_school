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
const listCourse = require('./modulo/functions.js')
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


app.get("/v1/lion-school/alunos/:matricula", cors(async function (request, response, next) {

    let matricula = request.params.matricula
    let statusCode
    let dadosEstado = {}

    if (matricula == '' || matricula == undefined || isNaN(matricula)) {
        statusCode = 400
        dadosEstado.message = "Não é possível processar a requisição, pois a sigla do estado não foi informada ou não atende a quantidade de caracteres (2)."
      } else {
        let abc = listCourse.getStudentInformation(matricula)
        if (abc) {
          statusCode = 200
          dadosEstado = abc
        } else {
          statusCode = 404
        }
      }
      response.status(statusCode)
      response.json(dadosEstado)


}))


app.listen(8080, function () {
    console.log('Servidor aguardando requisições na porta 8080');

})