/*
 * SERVICE DE ALUNOS
 *
 * O service coordena a Model
 * e a persistencia dos dados
 * Nessa versão, a persistencia utiliza localStorage.
 */

const AlunoService = {

    CHAVE_STORAGE: "sistema-acabemico-ds2:alunos",

    /*
     * Recupera os alunos armazenados.
     */

    listar() {

        /*
         * getItem() recupera o texto associado à chave.
         * Se não existir o resultado será Null. 
         */

        const textoJson = localStorage.getItem(
            AlunoService.CHAVE_STORAGE
        );

        /*
         * Devolve um array vazio se não estiver 
         * nada armazenado
         */

        if (textoJson === null) {
            return [];
        }


        /*
         * try permite tentar executar uma operação que pode gerar erro 
         * JSON.parse() gera erro quando recebe um JSON inválido
         */

        try {
            const dados = JSON.parse(textoJson);

            /*
             * Confirma se realmente é um array
             */

            if (!Array.isArray(dados)) {
                return [];
            }

            return dados;

        } catch (erro) {

            /*
             * Se o conteúdo estiver corrompido,
             * remove o valor inválido
             */

            localStorage.removeItem(
                AlunoService.CHAVE_STORAGE
            );

            return [];

        }

    },


    /*
     * Converte o array para JSON e salva no navegador
     */

    salvar(alunos) {
        const textoJson = JSON.stringify(alunos);

        localStorage.setItem(
            AlunoService.CHAVE_STORAGE,
            textoJson
        );
    },

    /*
     * Coordena o cadastro do aluno. 
     */

    cadastrar(dados) {

        /*
         * Recupera a lista atual. 
         */

        const alunos = AlunoService.listar();

        /*
         * Solicita a validação e criação para a Model
         */

        const resultado = AlunoModel.criar(
            dados,
            alunos
        );

        /*
         * Se o Model identificar o problema,
         * devolve o mesmo resultado ao Constroller. 
         */

        if (!resultado.sucesso) {
            return resultado;
        }

        /*
         * Adiciona ao array o aluno criado
         */

        alunos.push(resultado.aluno);

        /*
         * Salva o array atualizado.
         */

        AlunoService.salvar(alunos);

        /*
         * Devolve o resultado ao controller.
         */

        return resultado;
    },

    /*
     * Remove toda a lista armazenada.
     */

    limpar() {
        localStorage.removeItem(
            AlunoService.CHAVE_STORAGE
        );
    }


};