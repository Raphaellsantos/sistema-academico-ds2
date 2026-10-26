/*
 * O Constroller coordena:
 *
 * -Model;
 * -View;
 * Service.
 */

const AlunoConstroller = {

    /*
     * Inicia a aplicação.
     * 
     * A função é assíncrona porque, ao abrir a página,
     * consultaremos os alunos no banckend.
     */

    async iniciar() {

        /*
         * Localiza os elementos HTML.
         */

        AlunoView.iniciar();

        /*
         * Configura o evento de envio do formulário.
         */

        AlunoView.configurarFormulario(
            AlunoConstroller.cadastrar
        );

        /*
         * Informar que os dados estão sendo caregados.
         */

        AlunoView.exibirMensagem(
            "Carregando alunos...",
            "informacao"
        );

        try {

            /*
             * Consulta os alunos existentes no servidor.
             */

            await AlunoConstroller.atualziarVisualizacao();

            AlunoView.exibirMensagem(
                "Dados carregados com sucesso.",
                "Sucesso"
            );

        } catch (erro) {
            AlunoView.exibirMensagem(
                erro.message,
                "erro"
            );
        }

    },


    /*
     * Executa o cadastro do aluno.
     */

    async cadastrar(evento) {

        /*
         * Evita o regarregamento da página.
         */
        evento.preventDefault();

        /*
         * Solicita à View os valores do formulário.
         */

        const dadosInformados = AlunoView.lerDados();

        /*
         * Encaminha os dados para a validação inicial.
         */

        const validacao = AlunoModel.validar(
            dadosInformados
        );

        /*
         * Interrompe o processo caso a validação
         * do front encontre um problema.
         */

        if (!validacao.sucesso) {
            AlunoView.exibirMensagem(
                validacao.mensagem,
                "erro"
            );

            return;
        }

        /*
         * Desabilita temporariamente o botão.
         */
        AlunoView.alterarEstadoFormulario(true);

        AlunoView.exibirMensagem(
            "Enviando dados para o servidor...",
            "informacao"
        );

        try {

            /*
             * Envia o aluno para o backend.
             */

            const resultado =
                await AlunoService.cadastrar(
                    validacao.dados
                );

            /*
             * Consulta novamente a lista do servidor.
             */

            await AlunoConstroller.atualziarVisualizacao();

            /*
             * Limpa o formulário depois do sucesso.
             */

            AlunoView.limparFormulario();

            /*
             * Apresenta a mensagem desenvolvida pela API.
             */

            AlunoView.exibirMensagem(
                resultado.mensagem,
                "sucesso"
            );

        } catch (erro) {
            /*
             * Apresenta erros de validação da API,
             * RA duplicado ou falha de conexão.
             */

            AlunoView.exibirMensagem(
                erro.message,
                "erro"
            );

        } finally {

            /*
             * O botão finally sempre será executado,
             * indepedentemente do sucesso ou do erro.
             */

            AlunoView.alterarEstadoFormulario(false);
        }
    },


    /*
     * Consulta os alunos na API e atualiza a View.
     */

    async atualziarVisualizacao() {
        /*
         * Aguarda o Service consultar o backend.
         */

        const alunos = await AlunoService.listar();

        /*
         * Atualiza a tabela.
         */

        AlunoView.exibirLista(alunos);

        /*
         * Atualiza a apresentação em JSON.
         */

        AlunoView.exibirJson(alunos);
    }
};

/*
 * Inicia a aplicação.
 */

AlunoConstroller.iniciar();
