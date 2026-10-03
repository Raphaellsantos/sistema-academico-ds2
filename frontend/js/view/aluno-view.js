/*
 * VIEW DE ALUNOS --VERSÃO COM DOM
 *
 * A view é responsável por:
 * - Localizar elementos html;
 * - Ler os campos do formulário;
 * - observar o evento submit;
 * - apresentar mensagens;
 * - montar a tabela;
 * - apresentar o JSON.
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

    },

    /*
     * Registra a função que será executada
     * quando o formulário for enviado.
     * Parâmetro aoEnviar é uma função recebida do controller.
     */

    configuraFormulario(aoEnviar) {
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
    * Lê a propiedade value de cada campo.
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
    * Limpa os campos depois do cadastro bem-sucedido.
    */

    limparFormulario() {
        AlunoView.elementos.formulario.reset();

        /*
        * Devolve o foco ao campo RA,
        * facilitando o proximo cadastro
        */

        AlunoView.elementos.ra.focus();

    },


    /*
    * Apresenta a lista de alunos na tabela.
    */

    exibirLista(alunos) {
        const corpoTabela = AlunoView.elementos.corpoTabela;

        /*
        * Remove as linhas apresentada anteriormente
        */

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
