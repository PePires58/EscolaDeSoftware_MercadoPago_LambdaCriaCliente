exports.criarCliente = async function (secret, cliente) {
    const urlCriaCliente = `${process.env.BaseUrlMercadoPago}/v1/customers`;

    return fetch(urlCriaCliente, {
        method: 'POST',
        body: cliente,
        headers: {
            'Authorization': `Bearer ${secret}`,
            'Content-Type': 'application/json'
        }
    })
}