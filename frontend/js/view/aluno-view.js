/*
 * VIEW DE ALUNOS --VERSÃO 0.3
 *
 * A view continua responsável pelo DOM e pelos eventos

 */

const AlunoView = {

    /*
     * Objeto que armazenará referencias ao elementos HTML.
     * Isso vai evitar repetir document.getElementbyId()
     */

    elementos: {},

    /*
     * Localiza e armazena os elementos da página.
     * Método deve ser executado antes dos demais.
     */


    inicializar() {

        AlunoView.elementos.formulario =
            document.getElementById("form-aluno");

        AlunoView.elementos.ra =
            document.getElementById("ra");

        AlunoView.elementos.nome =
            document.getElementById("nome");

        AlunoView.elementos.email =
            document.getElementById("email");

        AlunoView.elementos.curso =
            document.getElementById("curso");

        AlunoView.elementos.turma =
            document.getElementById("turma");

        AlunoView.elementos.mensagem =
            document.getElementById("mensagem");

        AlunoView.elementos.corpoTabela =
            document.getElementById("corpo-tabela-alunos");

        AlunoView.elementos.totalAlunos =
            document.getElementById("total-alunos");

        AlunoView.elementos.saidaJson =
            document.getElementById("saida-json");

        /*
         * Nova referência da versão 0.3
         */

        AlunoView.elementos.botaoLimpar =
            document.getElementById("btn-limpar-dados");
    },


    /*
     * Configura o evento submit
     */


    configurarFormulario(aoEnviar) {
        AlunoView.elementos.formulario.addEventListener(
            "submit",
            function (evento) {

                /*
                * impede o comportamento padrão do formulário
                * evitando o carregamento da págica
                */
                evento.preventDefault();

                /*
                 * Lê os valores atuais do formulário
                 */
                const dados = AlunoView.lerDados();

                /*
                * Envia os dados para a função fornecida pelo controller.
                */

                aoEnviar(dados);

            }
        );
    },

    /*
     * Configura o evento click do botão limpar dados.
     */

    configurarBotaoLimpar(aoLimpar) {
        AlunoView.elementos.botaoLimpar.addEventListener(
            "click",
            function () {
                aoLimpar();
            }
        );
    },


    /*
    * Lê os valores do formulário.
    */


    lerDados() {
        return {
            ra: AlunoView.elementos.ra.value,
            nome: AlunoView.elementos.nome.value,
            email: AlunoView.elementos.email.value,
            curso: AlunoView.elementos.curso.value,
            turma: AlunoView.elementos.turma.value

        };
    },

    /*
    * Solicita a confirmação antes de remover os dados.
    */

    confirmarLimpeza() {
        return confirm(
            "Deseja remover todos os alunos cadastrados ?"
        );
    },

    /*
    * Apresenta uma mensagem de sucesso.
    */

    exibirSucesso(mensagem) {
        AlunoView.elementos.mensagem.textContent = mensagem;

        /*
        * Define as classes utulizadas pelo CSS.
        */

        AlunoView.elementos.mensagem.className =
            "mensagem sucesso";
    },

    /*
    * Apresenta a mensagem de erro.
    */

    exibirErro(mensagem) {
        AlunoView.elementos.mensagem.textContent = mensagem;

        AlunoView.elementos.mensagem.className =

            "mensagem erro";

    },


    /*
    * Limpa o formulário e devolve o foco ao RA
    */

    limparFormulario() {
        AlunoView.elementos.formulario.reset();


        AlunoView.elementos.ra.focus();

    },


    /*
    * Reconstroi a tabela de alunos.
    */

    exibirLista(alunos) {
        const corpoTabela = AlunoView.elementos.corpoTabela;


        corpoTabela.textContent = "";

        /*
        * Atualiza a quantidade de alunos.
        */

        AlunoView.elementos.totalAlunos.textContent =
            `Total: ${alunos.length}`;


        /*
        * Cria uma linha informativa, se não houver aluno!
        */

        if (alunos.length === 0) {
            const linha = document.createElement("tr");
            const celula = document.createElement("td");

            celula.colSpan = 7;
            celula.textContent =
                "Nenhum aluno foi cadastrado.";

            linha.appendChild(celula);
            corpoTabela.appendChild(linha);

            return;

        }

        /*
        * Percorre o array e cria uma linha para cada aluno.
        */

        alunos.forEach(function (aluno) {
            const linha = document.createElement("tr");

            /*
            * Organiza os calores na mesma ordem
            * dascolunas eistentes no HTML.
            */

            const valores = [
                aluno.id,
                aluno.ra,
                aluno.nome,
                aluno.email,
                aluno.curso,
                aluno.turma,

                /*
                * Operador ternário:
                * se ativo for true - apresenta "ATIVO";
                * caso constrário - apresenta "INATIVO".
                */
                aluno.ativo ? "ativo" : "Inativo"
            ];

            /*
            * Cria uma célula para cada valor.
            */

            valores.forEach(function (valor) {
                const celula = document.createElement("td");

                /*
                * textContent insere valor como texto.
                * Não utiliza innerHTML com dados fornecidos pelo usuario
                */

                celula.textContent = valor;

                linha.appendChild(celula);
            });

            corpoTabela.appendChild(linha);
        });

    },


    /*
    * Apresenta o texto JSON dentro da tag pre.
    */

    exibirJson(textoJson) {
        AlunoView.elementos.saidaJson.textContent = textoJson;
    }

};
