/*
 * VIEW DE ALUNOS
 *
 * A view é responsável pela interação com o usuario
 * nessa primeira versão vamos utilizar:
 * 
 * - prompt() para receber informações;
 * - confirm () para fazer uma pergunta;
 * - console.log() para apresentar mensagens;
 * - console.table() para apresentar objetos e array;
 * - console.error() para apresentar erros; 
 */

const AlunoView = {

    /*
     * Solicita ao usuario dados necessários para o cadastro
     * e organiza em um unico objeto.
     *
     */
    lerDados() {
        return {
            ra: prompt(" Digite o RA do aluno: "),
            nome: prompt(" Digite o nome do aluno: "),
            email: prompt(" Digite o e-mail do aluno: "),
            curso: prompt(" Digite o curso: "),
            turma: prompt(" Digite a turma: ")
        };

    },

    /*
     * Apresenta o aluno que foi cadastrado com sucesso
     */

    exibirAluno(aluno) {

        console.log(" aluno cadastrado com sucesso ");

        /*
         * Apresentando em forma de tabela para facilitar a leitura
         */

        console.table(aluno);

    },

    /*
     * Apresenta uma mensagem de erro
     */
    exibirErro(mensagem) {
        console.error("ERRO:", mensagem);
    },

    /*
     * Pergunta ao usuário se deseja realizar outro cadastro.
     * - OK, que devolve true,
     * - Cancelar que devolve false.
     */

    perguntarNovoCadastro() {
        return confirm(" Deseja cadastrar outro aluno ? ");
    },

    /*
     * Apresenta uma lista completa de alunos
     * O parametro recebe uma array.
     */

    exibirLista(alunos) {
        /*
         * Propiedade length informa a quantidade da array
         */

        console.log(
            "Quantidade de alunos cadastrados: ",
            alunos.length
        );

        /*
         * verificar se o array está vazio
         * Se length for igual a zero, não houve cadastro
         */

        if (alunos.length === 0) {
            console.log(" Nenhum aluno foi cadastrado. ");

            /*
             * O return encerra a sessão, se não houver
             * cadastro o console.table não executa
             */

            return;
        }

        /*
         * se houver vai ser apresentado em tabela
         */

        console.table(alunos);
    },

    /*
     * Apresenta os alunos convertido para JSON
     * realizado anteriormente pela Json.stringify().
     */

    exibirJson(textoJson) {
        console.log(" Alunos em formato JSON: ");

        /*
         * A partir de agora o conteudo é um texto   
         */

        console.log(textoJson);

    },

    /*
     * Ao apresentar os dados reconstruidos com JSON.parse().
     * o texto deixa de ser Json e volta a ser JavaScript. 
     */

    exibirDadosRecuperados(dados) {
        console.log(" Dados reconstruídos com JSON.parse(): ");

        /*
         * Como os dados voltaram a ser uma array 
         * pode ser apresentado com console.table().
         */

        console.table(dados);
    }


};