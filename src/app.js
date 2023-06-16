const criaClienteService = require('./services/cria-cliente');
const buscaSegredoService = require('./services/busca-secret.service');
const criaObjetoClienteService = require('./services/cria-objeto-cliente');

exports.lambdaHandler = async (event, context) => {

    const body = JSON.parse(event.Records[0].body);

    const objetoCliente = criaObjetoClienteService.criarObjetoCliente(body);
    const segredo = await buscaSegredoService.buscaSecret();

    await criaClienteService.criarCliente(segredo.Parameter.Value, objetoCliente)
        .then(async (response) => {
            if (response.ok) {
                console.log(await response.json());
            }
        })
        .then((data) => {
            console.log('data');
            console.log(data);
        })
        .catch((error) => {
            console.log('error');
            console.log(error);
        })
}
