const AWS = require('aws-sdk');
const ssm = new AWS.SSM({ apiVersion: '2014-11-06' });

const criaClienteService = require('./services/cria-cliente');
const buscaSegredoService = require('./services/busca-secret.service');
const criaObjetoClienteService = require('./services/cria-objeto-cliente');

exports.lambdaHandler = async (event, context) => {

    const body = JSON.parse(event.Records[0].body);

    const objetoCliente = criaObjetoClienteService.criarObjetoCliente(body);
    const segredo = await buscaSegredoService.buscaSecret(ssm);

    await criaClienteService.criarCliente(segredo, objetoCliente)
        .then((response) => {
            console.log('response');
            console.log(response);
            if (response.ok) {
                response.json()
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
