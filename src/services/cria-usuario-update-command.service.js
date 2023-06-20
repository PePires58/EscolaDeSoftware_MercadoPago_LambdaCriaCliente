exports.criaComandoUpdate = function (email, clienteMercadoPago) {
    return {
        Key: {
            "email": {
                S: email
            }
        },
        ExpressionAttributeValues: {
            ":mercadopag_id_cliente": { S: clienteMercadoPago.id },
            ":mercadopag_id_pagador": { S: clienteMercadoPago.id.split('-')[0] },
            ":email": { S: email }
        },
        UpdateExpression: "SET mercadopag_id_cliente = :mercadopag_id_cliente, mercadopag_id_pagador = :mercadopag_id_pagador",
        ConditionExpression: "attribute_exists(email) AND email = :email"
    };
}