/*
 * Este objeto contem os cabeçalhos relacionados ao CORS.(Cross-Origin Resource Sharing),
 * Este cabeçalho permite que o frontend executados em outros endereços, 
 * façam requisiões para o backend
 * 
 * ex: frontend: http:/127.0.0.1:5500
 *     backend: http:/localhost:3000
 *
*/

const cabecalhosCors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-type"
};

/*
 * Envia uma resposta no formato JSON.
 * 
 * Parêmetros:
 * 
 * res:
 * Apresente a resposta em HTTP que será enviado ao cliente.
 *
 * status:
 * código do estado de resposta
 * EX: 200, 201, 400, 404 e 500.
 * 
 * dados:
 * objeto de Array que será convertido para JSON.
*/

export function enviarJson(res, status, dados) {

    /*
     * JSON.Stringify() converte um valor JavaScript 
     *  em uma String em formato JSON
     * 
     * Valor Null representa a função de substituição
     * Valor 2 cria uma identação no Json, 
     * facilitando a leitura.
     *
    */

    const textoJson = JSON.stringify(dados, null, 2);

    /*
     * writeHead() define:
     * 1. O código de status da reposta
     * 2. Os cabechalhos HTTP.
    */

    res.writeHead(status, {
        /*
         * Informa que o conteudo enviado é Json
         * e utiliza a codificação UTF-8.
         */
        "Content-Type": "application/json; charset=utf-8",

        /*
         * O operador de espalhamentos adiciona  
         * os cabeçalhos CORS ao objeto.
         */

        ...cabecalhosCors

    });

    /*
     * end() finaliza a resposta e envia o conteudo
     * para quem realizou a requisição.
     */

    res.end(textoJson);




}

/*
 * Envia uma resposta sem conteudo.
 * Esta função sera utilizado nas requisições OPTIONS,
 * realizado automaticamente pelo navegador em 
 * determinasdas situações envolvendo o CORS.
 */


export function enviarSemConteudo(res) {

    /*
     * O status 404 significa:
     * "A requisição foi procesasda com sucesso,
     * mas não existe conteúdo para retornar."
     */

    res.writeHead(204, cabecalhosCors);


    /*
     * Finaliza a resposta sem enviar um corpo
     */

    res.end();


}

/*
 * Lê o corpo de um requisição HTTP e transforma
 * o Json recebido em  um ojeto JavaScript
 * 
 * A Função é assíncrona porque o conteudo de requisição
 * pode chegar do servidor dividido em partes.
 */

export function lerCorpoJson(req) {

    /*
     * Criamos e retornamos um Promise.
     * 
     * A promisse representa uma operação
     * que vai ser concluida no futuro.
     */

    return new Promise((resolve, reject) => {

        /*
         * Está variável amazenará as partes recebidas
         * durante as leituras da requisição.
         */

        let corpo = "";

        /*
         * O evento "data" é executado sempre que
         * uma nova partes dos dados chegam ao servidor.
         */

        req.on("data", parte => {

            /*
             * Cada parte recebida é acrescentada 
             * a variavel do corpo.
             */

            corpo += parte;
        });

        /*
         * O evento "end" é executado quando o servidor
         * termina de receber todo o corpo da requisição.
         */

        req.on("end", () => {

            /*
             * Se o corpo estiver vazio,
             * consideramos que foi recebido
             * um objeto vazio.
             */

            if (corpo.trim() === "") {
                resolve({});
                return;
            }

            try {


                /*
                 * JSON.parse() transforma o texto em JSON
                 * em um objeto JavaScript.
                 */

                const dados = JSON.parse(corpo);

                /*
                 * A promisse é concluida com sucesso
                 * e devolve os dados convertidos
                 */

                resolve(dados);

            } catch (erro) {

                /*
                 * Se o JSON estiver incorreto,
                 * a Promise será rejeitada.
                 */

                reject(erro);
            }

        });

        /*
         * Esse evento é executado caso aconteça algum 
         * problema durante a leitura da requisição.
         */

        req.on("error", erro => {

            reject(erro);

        });

    });

}
    




