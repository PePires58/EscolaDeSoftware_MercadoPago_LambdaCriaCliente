const criaClienteService = require('./services/cria-cliente');
const buscaSegredoService = require('./services/busca-secret.service');
const criaObjetoClienteService = require('./services/cria-objeto-cliente');
const criaComandoService = require('./services/cria-usuario-update-command.service');
const atualizaClienteService = require('./services/atualizar-cliente.service');

exports.lambdaHandler = async (event, context) => {

    try {
        const body = JSON.parse(event.Records[0].body);

        const objetoCliente = criaObjetoClienteService.criarObjetoCliente(body);
        const segredo = await buscaSegredoService.buscaSecret();

        await criaClienteService.criarCliente(segredo.Parameter.Value, objetoCliente)
            .then(async (response) => {
                if (response.ok) {
                    const clienteMercadoPago = await response.json();

                    if (clienteMercadoPago) {
                        const comandoPutItem = criaComandoService.criaComandoUpdate(body.email, clienteMercadoPago);
                        const resultUpdate = await atualizaClienteService.atualizarCliente(comandoPutItem);

                        console.log(resultUpdate);
                    }
                }
                else {
                    const error = await response.json();
                    console.log(error);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    catch (error) {
        console.log(error);
    }
}
