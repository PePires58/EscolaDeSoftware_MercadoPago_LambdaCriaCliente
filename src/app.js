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

        let idClienteMercadoPago = '';
        await criaClienteService.criarCliente(segredo.Parameter.Value, objetoCliente)
            .then(async (response) => {
                if (response.ok) {
                    const clienteMercadoPago = await response.json();
                    idClienteMercadoPago = clienteMercadoPago.id.split('-')[0];
                }
                else {
                    const error = await response.json();
                    console.log(error);
                }
            })
            .catch((error) => {
                console.log(error);
            })

        if (idClienteMercadoPago) {
            const comandoPutItem = criaComandoService.criaComandoUpdate(body.email, idClienteMercadoPago);
            const resultUpdate = await atualizaClienteService.atualizarCliente(comandoPutItem);

            console.log(resultUpdate);
        }
    }
    catch (error) {
        console.log(error);
    }
}
