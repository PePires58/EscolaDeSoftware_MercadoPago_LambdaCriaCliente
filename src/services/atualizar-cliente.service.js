const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.atualizarCliente = async function (putItemCommand) {
    const params = {
        ExpressionAttributeValues: putItemCommand.ExpressionAttributeValues,
        Key: putItemCommand.Key,
        TableName: process.env.UserTableName,
        ReturnConsumedCapacity: "NONE",
        UpdateExpression: putItemCommand.UpdateExpression,
        ConditionExpression: putItemCommand.ConditionExpression
    };

    return await dynamodb.updateItem(params)
        .promise()
        .then((data) => {
            return data;
        });
}