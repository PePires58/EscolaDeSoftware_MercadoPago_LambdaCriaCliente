exports.buscaSecret = async function (ssm) {
    const params = {
        Name: process.env.SecretMercadoPagoPath,
        WithDecryption: process.env.SecretMercadoPagoUseEncryption === 'true'
    };

    return await ssm.getParameter(params)
        .promise()
        .then((secret) => {
            return secret;
        });
}