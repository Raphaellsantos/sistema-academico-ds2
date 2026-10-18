/*
 * Este array representa temporariamente
 * o armazenamento dos alunos
 * 
 * Está em memória, dentro do servidor.
 * 
 * Quando o servidor for encerrado, apaga todos os alunos
 * 
 * Futuramente será substituido por banco de dados MySQL.
 */

const alunos = [];

/*
 * O alunoModel representa o Model da arquitetura MVC.
 * 
 * Suas responsabilidades são:
 * 
 * - representar os dados dos alunos;
 * - normalizar os valores recebidos;
 * - validar as regras de cadastro;
 * - impedir RA duplicado;
 * - criar um novo aluno;
 * - fornecer a lista de alunos.
 */

const AlunoModel = {

    /*
     * Romeve espaços estras do início e do final.
     * Também evita problemas com valores Null ou undefined.
     */

    normalizaTexto(valor) {
        /*
         * Verifica se o valor não foi informado. 
         */

        if (valor === null || valor === undefined) {
            return "";
        }

        /*
         * String converte valor pra texto.
         * trim () remove os espaços do início e do final.
         */

        return String(valor).trim();

    },

    /*
     * Realiza uma validação simples do e-mail.
     * 
     * essa validação será melhorada nas versões futuras.
     */

    validaEmail(email) {

        return email.includes("@") && email.includes(".");

    },

    /*
     * Procura o aluno pelo RA
     * 
     * find() percorre o array e devolve o primeiro
     * aluno que satisfazer a condição
     * 
     * Se nenhum aluno for encontrado, resultado undefined.
     */

    localizarPorRa(ra) {
        return alunos.find(aluno => aluno.ra === ra);

    },

    /*
     * Gera o proximo indicador do aluno.
     * 
     * Como ainda não existe banco de dados,
     * o identificador será realizado a partir do maior ID.
     */

    gerarProximoId() {
        /*
         * se não existem alunos, o primeiro ID será 1.
         */

        if (alunos.length === 0) {
            return 1;
        }

        /*
         * map() cria um array contendo somente
         * os IDs dos alunos.
         */

        const ids = alunos.map(aluno => aluno.id);

        /*
         * Math.max() encontra o maior ID.
         * O operador ... espalha os valores do array
         * como argumentos da função.
         */

        const maiorId = Math.max(...ids);

        /*
         * O proximo ID será o maior ID mais 1.
         */

        return maiorId + 1;

    },

    /* 
     * Cadastra um novo aluno.
     * 
     * O parâmetro dados deverá conter
     * -ra;
     * -nome;
     * -email;
     * -curso;
     * -turma. 
     */

    cadastrar(dados) {

        /* 
         * O operador? é chamado de encadernamento opcional
         * 
         * ele evita um erro caso o objeto dados
         * não tenha sido informado
         */

        const ra = AlunoModel.normalizaTexto(dados?.ra);
        const nome = AlunoModel.normalizaTexto(dados?.nome);
        const email = AlunoModel.normalizaTexto(dados?.email);
        const curso = AlunoModel.normalizaTexto(dados?.curso);
        const turma = AlunoModel.normalizaTexto(dados?.turma);

        /* 
         * Valida se todos os campos obrigatórios
         * forem preenchidos
         */

        if (

            ra === "" ||
            nome === "" ||
            email === "" ||
            curso === "" ||
            turma === ""
        ) {
            return {
                sucesso: false,
                status: 400,
                mensagem: "Todos os campos são obrigatórios."
            };

        }

        /* 
         * Valida o formato básico do e-mail. 
         */

        if (AlunoModel.localizarPorRa(ra)) {
            return {
                sucesso: false,
                status: 409,
                mensagem: "Já existe um aluno com esse RA."
            };

        }

        /* 
         * Cria o objeto que representa o novo aluno.
         */

        const aluno = {
            id: AlunoModel.gerarProximoId(),
            ra,
            nome,
            email,
            curso,
            turma,
            ativo: true
        };

        /* 
         * Adiciona o aluno ao array armazenado em memória. 
         */

        alunos.push(aluno);

        /* 
         * Retorna o resultado positivo do cadastro
         */

        return {
            sucesso: true,
            status: 201,
            aluno
        };


    },

    /* 
     * Devolve todos os alunos cadastrado
     * 
     * O operador ... cria uma copia do array.
     * 
     * Dessa forma, quem chamar listar() não receberá
     * diretamente o array interno do Model.
     */

    listar() {
        return [...alunos];
    }


};

/*
 * Exportar o Model para que ele possa ser importado
 * pelo Controller.
 */


export default AlunoModel;