/*
* MODEL DE ALUNOS
*
* O model é responsável:
*   - pelos dados dos alunos;
*   - pelas validações;
*   - pelas regras de cadastro.
*/

const AlunoModel = {
    /*
     *Array que armazena temporariamente os alunos cadastrados.
     */

    alunos: [],

    /*
    Padroniza um valor antes de executar,
    se for null ou undefined devolve vazio para evitar erro
    */

    normalizarTexto(valor) {
        if (valor === null || valor === undefined) {
            return "";
        }

        return String(valor).trim();
    },

    /*
    Realiza uma validação simples do e-mail.
    para primeira versão vamos validar e-mail que contenha "@" e "."
    O método includes(), verifica se o texto está presente e com condições verdadeiras 
    */

    validarEmail(email) {
        return email.includes("@") && email.includes(".");

    },

    /*
     *Procura um aluno por RA.
     *O metodo find() percorre array até encontrar o 
     *aluno com o RA igual ao informado, se encontrar
     * devolve ao objeto aluno, se não devolve undefined.
     */

    localizarPorRa(ra) {
        return AlunoModel.alunos.find(
            aluno => aluno.ra === ra
        );
    },

    /*
     *Realiza o cadastro do aluno
     *O parametro deve ser:
     *-ra;
     *-nome;
     *-email;
     *-curso;
     * turma.
     */

    cadastrar(dados) {

        /*
         *Antes de validar os dados, normaliza todos os valores e 
         *elimina espaços desnecessários para não causar erro
         *durante a execução com null e undefined.
         */

        const ra = AlunoModel.normalizarTexto(dados.ra);
        const nome = AlunoModel.normalizarTexto(dados.nome);
        const email = AlunoModel.normalizarTexto(dados.email);
        const curso = AlunoModel.normalizarTexto(dados.curso);
        const turma = AlunoModel.normalizarTexto(dados.turma);



        /*
         * Verifica se algum campo obrigatório está vazio. 
         * se alguma condição a baixo for verdadeira o cadastro 
         * é recusado
         */

        if (
            ra === "" ||
            nome === "" ||
            email === "" ||
            curso === "" ||
            turma === ""
        ) {
            /*
            * em vez de mandar mensagem de erro para o usuário   
            * a model devolve o resultado para controller, que 
            * vai pedir para a view apresentar a mensagem!
            */
            return {
                sucesso: false,
                mensagem: "Todos os campos são obrigatórios"
            };
        }

        /*
         * Valindando o e-mail,   
         * se o e-mail for inválido
         * a condição será executada!
         */

        if (!AlunoModel.validarEmail(email)) {
            return {
                sucesso: false,
                mensagem: "Informe um e-mail válido."
            };
        }

        /*
         * Verificando a existência de um RA.  
         * Se a condição for verdadeira, o
         * cadastro duplicado será impedido.
         */

        if (AlunoModel.localizarPorRa(ra)) {
            return {
                sucesso: false,
                mensagem: "já existe um aluno com esse RA."
            };
        }

        /*
        * Com as validações aprovadas,
        * o novo aluno é instanciado. 
        */

        const aluno = {

            /*
             * Nessa versão o identificador calcula utilizando   
             * a quantidade de alunos +1
             * Posteriormente será o papel do banco de dados.
             */

            id: AlunoModel.alunos.length + 1,

            /*
             * dados normalidados e recebidos  
             */
            ra: ra,
            nome: nome,
            email: email,
            curso: curso,
            turma: turma,


            /*
             * Todo novo aluno começa como "ativo".   
             * No futuro, esse valor poderá ser alterado
             * sem precisar apagar definitivamente o cadastro.
             */

            ativo: true
        };

        /*
         * Adiciona o objeto aluno ao final do array
         */

        AlunoModel.alunos.push(aluno);

        /*
         * Informa que o cadastro foi concluido com sucesso. 
         * Devolve o aluno criado para Controller para que ela
         * encaminhe para o View apresentar.
         */

        return {
            sucesso: true,
            aluno: aluno
        };
    },

    /*
     * Devolve a lista de alunos cadastrados, 
     * o operador spread (...) cria um novo array
     * para não ir diretamente o array original da Model.
     */

    listar() {
        return [...AlunoModel.alunos];
    }





};


