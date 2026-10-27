/*
 * Importar o Model responsável pelos dados
 * e pelas regras relacionadas aos alunos.
 */

import AlunoModel from "../model/aluno-model.js";

/*
 * O Controller recebe as requisições encaminhadas
 * pelo Router, chama o Model e produz a resposta.
 */


const AlunoController = {
    /*
     * Lista todos os alunos cadastrados.
     * 
     * Endpoint:
     * GET / api/alunos.
     */
    listar(req, res) {

        /*
         * Solicita a lista ao Model
         */

        const alunos = AlunoModel.listar();

        /*
         * Envia uma resposta com status 200.
         * 
         * O status 200 significa que a requisição
         * foi processada com sucesso.
         */
        return res.status(200).json({
            total: alunos.length,
            dados: alunos
        });

    },


    /*
     * Cadastra um novo aluno.
     * 
     * Endpoint:
     * POST /api/alunos
     */

    cadastrar(req, res) {

        /*
         * Express.json() já converteu o JSON
         * recebido para um objeto JavaScript.
         * 
         * O resultado está disponivel em req.body.
         */

        const dados = req.body;

        /*
         * Encaminha os dados ao Model. 
         */

        const resultado = AlunoModel.cadastrar(dados);

        /*
         * Verifica se o Model encontrou
         * algum problema de validação.
         */

        if (!resultado.sucesso) {
            return res.status(resultado.status).json({
                sucesso: false,
                mensagem: resultado.mensagem
            });
        }

        /*
         * Retorna p status 201 quando o
         * aluno é criado com sucesso.
         */

        return res.status(201).json ({
            sucesso: true,
            mensagem: "Aluno cadastrado com sucesso.",
            dados: resultado.aluno
        });
    }

};

/*
 * Exporta o Controller.
 */

export default AlunoController;