/*
 * CONTROLER DE ALUNOS
 *
 * O controller comanda o funcionamento do aplicação.
 * 
 * Fica responável por:
 * -solicitar dados da View;
 * -enviar os dados da Model;
 * -Receber os dados da Model;
 * -Decidir qual metodo da view vai utilizar;
 * -Constrola a repetição dos cadastros;
 * -Coordernar a conversão de dados da Model;
*/

const AlunoController = {

    /*
     * O método que inicia o funcionamento da aplicação
     * Quando chamado o processo de cadastro inicia
     * até o usuario quiser parar
     */

    iniciar() {
        /*
         * Variavel que vai constrolar a repetição de cadastro 
         * Iniciando com true para garantir 1 repetição
         */

        let continuar = true;


        while (continuar) {
            /*
             * Solicita que a view solicite os dados do usuário.
             * LerDados() vai devolver
             * - RA / nome / e-mail / curso / turma.
             */

            const dados = AlunoView.lerDados();

            /*
             * Envia os dados para a Model
             * que fica resposável por 
             * normalizar / valida os campos / verifica a existência e cadastra o aluno
             */

            const resultado = AlunoModel.cadastrar(dados);

            /*
             * se o resultado for true,
             * o aluno foi cadastrado corretamente
             */

            if (resultado.sucesso) {
                /*
                 * Solicita que a view apresente o aluno.
                 */

                AlunoView.exibirAluno(resultado.aluno);

            } else {

                /*
                 * se o resultado for falso,
                 * a view apresenta o erro
                 */

                AlunoView.exibirErro(resultado.mensagem);

            }

            /*
             * Pergunta se deseja cadastrar novo aluno
             * true - quando clica em OK
             * false - quando clica em Cancelar   
             */

            continuar = AlunoView.perguntarNovoCadastro();

        }

        /*
         * Esse trecho será executado quando o laço terminar.
         */

        const alunos = AlunoModel.listar();

        /*
         * A lista é enviada para View apresentar a
         * quantidade de alunos em uma tabela.
         */

        AlunoView.exibirLista(alunos);

        /*
         * Converte array de alunos para JSON.
         * 1° parametro/ alunos - valor que será convertido
         * 2° parametro/ null - não será aplicado filtro na conversão
         * 3° parametro/ 2 - quant. de espaço utilizado na identação,
         * que facilita a leitura do JSON 
         */

        const textoJson = JSON.stringify(alunos, null, 2);

        /*
        * Solicita que a view apresente  o texto JSON.
        * Pois agora é uma string e não mais Array
        */

        AlunoView.exibirJson(textoJson);

        /*
        * convertendo o texto Json novamente em um valor JavaScript
        * JSON.parse() produzirá um novo array.
        */

        const dadosRecuperados = JSON.parse(textoJson);

        /*
        * Solicita que a view apresente os dados reconstruidos
        */

        AlunoView.exibirDadosRecuperados(dadosRecuperados);


    }


};

/*
* Inicia a aplicação,
* para que o AlunoController faça
* o processo de cadastro.
*/

AlunoController.iniciar();
