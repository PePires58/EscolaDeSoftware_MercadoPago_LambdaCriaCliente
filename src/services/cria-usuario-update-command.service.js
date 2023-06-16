exports.criaComandoUpdate = function (email, mercadoPagoId) {
    return {
        Key: {
            "email": {
                S: email
            }
        },
        ExpressionAttributeValues: {
            ":mercado_pago_id": { S: mercadoPagoId }
        },
        UpdateExpression: "SET mercado_pago_id = :mercado_pago_id",
        ConditionExpression: "attribute_exists(email) AND email = :email"
    };
}