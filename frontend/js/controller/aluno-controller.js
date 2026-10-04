/*
 * CONTROLER DE ALUNOS - VERSÃO 0.3
 * Controller agora utiliza o Service.
 *
 * Ele não acesso mais diretamente o Array, LocalStorage e Model
*/

const AlunoController = {
    /*
     * Inicia a aplicação
     */

    iniciar() {

        /*
         * Inicia as referências da View
         */

        AlunoView.inicializar();

        /*
         * Configura o cadastro.
         */

        AlunoView.configurarFormulario(
            function (dados) {
                AlunoController.cadastrar(dados);
            }
        );

        /*
         * Configura o botão de limpeza.
         */

        AlunoView.configurarBotaoLimpar(
            function () {
                AlunoController.limparDados();
            }
        );

        /*
         * Apresenta o estado inicial da aplicação.
         *
         * Isso faz os alunos voltarem para a tabela
         * depois que a página for atualizada
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

        const resultado = AlunoService.cadastrar(dados);


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
     * Cooerdena a remoção de todos os dados
     */

    limparDados() {
        const alunos = AlunoService.listar();

        /*
         * Evita solicitar confirmação quanto
         * a lista já estiver vazia.
         */

        if (alunos.length === 0) {
            AlunoView.exibirErro(
                "Não existem alunos para remover."
            );

            return;
        }

        /*
         * Solicita a confirmação à View
         */
        const confirmou = AlunoView.confirmarLimpeza();

        if (!confirmou) {
            return;
        }

        /*
         * Solicita que o Service remova os dados.
         */

        AlunoService.limpar();

        AlunoView.exibirSucesso(
            "Todos os alunos foram removidos."
        );

        AlunoController.atualizarVisualizacao();
    },

    /*
     * Recupera os dados e atualiza a interface
     */

    atualizarVisualizacao(){
        const alunos = AlunoService.listar();

        AlunoView.exibirLista(alunos);

        const textoJson = JSON.stringify(
            alunos,
            null,
            2
        );

        AlunoView.exibirJson(textoJson);
    }

};

/*
 * Inicia a aplicação depois que os scrips forem carregados
 */

AlunoController.iniciar();
