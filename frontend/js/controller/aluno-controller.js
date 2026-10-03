/*
 * CONTROLER DE ALUNOS - VERSÃO DOM
 * - inicia a aplicação;
 * - conecta o formulá à operação de cadastro;
 * - envia dados para Model;
 * - analisa o resultado
 * - solicita a atualização
*/

const AlunoController = {
    /*
     * Inicia a aplicação
     */

    iniciar() {

        /*
         * Solicita a localização dos elementos HTML pela View
         */

        AlunoView.inicializar();

        /*
         * Entrega a função para a view executar
         * quando enviar o formulário
         */

        AlunoView.configuraFormulario(
            function (dados) {
                AlunoController.cadastrar(dados);
            }
        );

        /*
         * Apresenta o estado inicial da aplicação.
         *
         * Como ainda não existe alunos, a tabela mostrará
         * a mensagem "Nenhum aluno foi cadastrado".
         */

        AlunoController.atualizarVisualizacao();
    },

    /*
     * Coordena o cadastro de um aluno.
     */

    cadastrar(dados) {

        /*
         * Envia os dados para o Model.
         */

        const resultado = AlunoModel.cadastrar(dados);

        /*
         * Se Model identificar algum problema,
         * apresenta o erro e encerra este método
         */

        if (!resultado.sucesso) {
            AlunoView.exibirErro(resultado.mensagem);
            return;
        }

        /*
         * Apresenta a confirmação do cadastro.
         */

        AlunoView.exibirSucesso(
            `Aluno ${resultado.aluno.nome} cadastrado com sucesso.`
        );

        /*
         * Limpa o formulário
         */

        AlunoView.limparFormulario();

        /*
         * Atualiza a tabela e o JSON.
         */

        AlunoController.atualizarVisualizacao();

    },

    /*
     * Atualiza todas as representações da lista de alunos.
     */

    atualizarVisualizacao() {

        /*
         * Solicita ao Model a lista atual.
         */

        const alunos = AlunoModel.listar();


        /*
         * Solicita que a view monte a tabela.
         */

        AlunoView.exibirLista(alunos);


        /*
         * Converte o array para o texto JSON formatado.
         */

        const textoJson = JSON.stringify(alunos, null, 2);


        /*
         * Solicita que a view apresente o JSON.
         */

        AlunoView.exibirJson(textoJson);
    }
};

/*
 * Inicia a aplicação depois que os scrips forem carregados
 */

AlunoController.iniciar();
