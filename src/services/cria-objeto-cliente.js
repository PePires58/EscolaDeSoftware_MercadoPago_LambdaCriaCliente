exports.criarObjetoCliente = function (data) {
    return {
        email: data.email,
        first_name: data.nome,
        last_name: data.last_name,
        identification: {
            type: data.identification.type,
            number: data.identification.number
        },
        Description: `Usuário da escola de software - ${data.email}`
    };
}