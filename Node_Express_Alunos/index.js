const express = require("express");


const app = express()
app.use(express.json());



/*
    2-)
    Crie uma rota GET para “/alunos” que lista todos os alunos. 
    Deve conter query opcional para filtrar por nome e por média. 
    Ou seja, a rota pode ter este formato: “/alunos?nome=pedro”,
    “/alunos?media=7.5” ou esse “/alunos”. 
    Esta rota deve utilizar as funções exportadas pelo módulo alunos.js;
*/
const alunos = require("./alunos");
app.get('/alunos', (req, res) => {
    const nome = req.query.nome;
    const media = parseFloat(req.query.media);

    let filtrarAlunos = alunos;

    if (nome && media) {
        filtrarAlunos = filtrarAlunos.filter(aluno => (
            aluno.nome.toLowerCase().includes(nome.toLowerCase()) && aluno.media >= media
        ));
    } else if (nome) {
        filtrarAlunos = filtrarAlunos.filter(aluno => (
            aluno.nome.toLowerCase().includes(nome.toLowerCase())
        ));
    } else if (!isNaN(media)) {
        filtrarAlunos = filtrarAlunos.filter(aluno => (
            aluno.media == media
        ));
    }

    if (filtrarAlunos.length === 0) {
        return res.status(400).json("Aluno não encontrado");
    } else {
        return res.json(filtrarAlunos);
    }
});




/*
    3-)
    Crie uma rota POST para “/alunos/novo” e o corpo da requisição deve conter (nome, matrícula e média).
    Valide os campos passados e caso contrário indique um erro (400);
*/
app.post('/alunos/novo', (req, res) => {
    const { nome, matricula, media } = req.body;
    // console.log(req.body);

    if (!nome || !matricula || !media) {
        return res.status(400).send("Erro: Campos inválidos.");
    }

    const novaMatricula = parseInt(matricula);
    const novaMedia = parseFloat(media);

    if (isNaN(novaMatricula) || isNaN(novaMedia)) {
        return res.status(400).send("Erro: Matrícula ou média inválidos.");
    }

    const novoAluno = { nome, matricula: novaMatricula, media: novaMedia };
    alunos.push(novoAluno);

    return res.status(201).json(novoAluno);
});




/*
    4-)
    Crie uma rota POST para “/alunos/deletar/:index” que indica qual aluno remover do array de dados (index). 
    Trate a chamada se o aluno não existir (404);
*/
app.post('/alunos/deletar/:index', (req, res) => {
    const index = parseInt(req.params.index);
    // console.log(req.params.index);

    if (isNaN(index)) {
        return res.status(400).send("Erro: índice inválido.");
    }

    if (index < 0 || index >= alunos.length) {
        return res.status(404).send("Erro: Aluno não encontrado.");
    }

    const alunoRemovido = alunos.splice(index, 1)[0];
    return res.json(alunoRemovido);
});




/*
    5-)
    Crie uma rota POST para /alunos/atualizar/:index, 
    que no corpo da requisição recebe um objeto (nome, média) e atualiza os dados do aluno naquela posição.
    Trate a chamada se o aluno não existir (404);
*/
app.post('/alunos/atualizar/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const { nome, media } = req.body;
    console.log(req.body);

    if (isNaN(index)) {
        return res.status(400).send("Erro: índice inválido.");
    }

    if (index < 0 || index >= alunos.length) {
        return res.status(404).send("Erro: Aluno não encontrado.");
    }

    const alunoAtualizado = {
        nome: nome ? nome : alunos[index].nome,
        media: media ? parseFloat(media) : parseFloat(alunos[index].media)
    };

    alunos[index] = alunoAtualizado;
    return res.json(alunoAtualizado);
});





app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/");
});