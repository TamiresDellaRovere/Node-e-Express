/*
    1-)
    Crie um módulo alunos.js que exporta um array de alunos,
    uma função que filtra pelo nome e uma que filtra pela média (maior ou igual).
*/
const alunos = [
    { nome: "Tamires", media: "9.2" },
    { nome: "Jessica", media: "10" },
    { nome: "Tainara", media: "9.5" },
    { nome: "Luzia", media: "8.7" },
    { nome: "Clara", media: "7.5" },
    { nome: "Igor", media: "6.3" },
    { nome: "Isabela", media: "5.4" },
];

function nomeAluno(alunos, nome) {
    return alunos.filter(aluno => {
        return aluno.nome.toLowerCase().includes(nome.toLowerCase()); 
    });
}


function mediaAluno(alunos, media) {
    if (media >= 7) {
        return alunos.filter(aluno => aluno.media >= media);
    }
}


module.exports = alunos, nomeAluno, mediaAluno;