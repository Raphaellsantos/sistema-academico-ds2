/*
 * MODEL ALUNOS - VERSÃO 0.3
 *
 * O model contém as regras relacionadas ao aluno.
 * 
 * Ele não sabe:
 * - de onde os dados vieram
 * - como serão apresentado
 * - onde serão armazenados.
*/

const AlunoModel = {

    /*
     * converte o valor para texto
     * e remove espaços no começo e no final
     *
     */

    normalizarTexto(valor) {
        if (valor === null || valor === undefined) {
            return "";
        }

        return String(valor).trim();
    },


    /*
     * Realiza uma validação introdutória do e-mail. 
     *
    */

    validarEmail(email) {
        return email.includes("@") && email.includes(".");
    },

    /*
     * Procura um aluno pelo RA dentro do array recebido,
     * agora o trabalho da model passa para camada Service.
    */

    localizarPorRa(alunos, ra) {
        return alunos.find(
            aluno => aluno.ra === ra
        );
    },


    /*
    * Calcula o proximo identificador,
    * se não houver alunos, o primeiro Id será 1.
    */

    gerarProximoId(alunos) {
        if (alunos.length === 0) {
            return 1;
        }

        /*
         * map () cria um array contendo somente os IDs
         *
         * ex:  alunos = [{ id:1 }, { id:4 }]
         * ids = [1, 4]
         */

        const ids = alunos.map(
            aluno => aluno.id
        );

        /*
         * Math.max() encontra o maior ID.
         *
         * O operador spreed (...) entrega cada
         * numero do array com argumento
         */

        const maiorId = Math.max(...ids);

        return maiorId + 1;
    },


    /*
     * Valida os dados e cria um novo objeto aluno.
     *
     * Model não salva objeto e devolve para camada Service.
     */

    criar(dados, alunos) {
        const ra = AlunoModel.normalizarTexto(dados.ra);
        const nome = AlunoModel.normalizarTexto(dados.nome);
        const email = AlunoModel.normalizarTexto(dados.email);
        const curso = AlunoModel.normalizarTexto(dados.curso);
        const turma = AlunoModel.normalizarTexto(dados.turma);


        /*
         * Verifica os campos obrigatórios
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
                mensagem: "Todos os campos são obrigatórios"
            };
        }

        /*
         * Verifica o formato básico do e-mail
         */


        if (!AlunoModel.validarEmail(email)) {
            return {
                sucesso: false,
                mensagem: "Informa um e-mail valido"
            };
        }

        /*
         * Verifica se o Ra já existe na lista recebida.
         */

        if (AlunoModel.localizarPorRa(alunos, ra)) {
            return {
                sucesso: false,
                mensagem: "Já existe um aluno com esse RA."
            };
        }

        /*
         * Cria um objeto depois que todas as validações
         * foram aprovadas.
         */

        const aluno = {
            id: AlunoModel.gerarProximoId(alunos),
            ra: ra,
            nome: nome,
            email: email,
            curso: curso,
            turma: turma,
            ativo: true
        };

        /*
         * Devolve para a camada Service
         * Model não utiliza push() nem LocalStorage.
         */

        return {
            sucesso: true,
            aluno: aluno
        };

    }

};
