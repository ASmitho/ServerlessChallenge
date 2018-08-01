'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient(); 

module.exports.createGym = (event, context, callback) => {
    const data = JSON.parse(event.body);
    if (typeof data.user_id !== 'string') {
        console.error('Incorrect data type');
        callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain'},
            body: 'Unable to create user due to data format.',
        });
        return; 
    }

    const params ={
        TableName: process.env.DYNAMODB_TABLE2,
        Item: {
            Gym: data.Gym, 
            user_id: data.user_id,
        },
    };

    dynamoDb.put(params, (error) => {

        //handle potential err
        if(error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: {'Content-Type': 'text/plain'},
                body: 'Unable to create user.',
            });
            return;
        }

        //response
        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              }, 
            body: JSON.stringify(params.Item),
        };
        callback(null, response);
    });
};