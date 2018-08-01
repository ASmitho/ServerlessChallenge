'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    if (typeof data.user_id !== 'string') {
        console.error('Incorrect data type');
        callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Unable to create user due to data format.',
        });
        return;
    }

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            user_id: data.user_id,
            password: data.password,
            fullname: data.fullname,
            age: data.age,
            height_in: data.height,
            weight_lb: data.weight,
            updated: timestamp,
            squat: [],
            deadlift: [],
            overheadPress: [],
            benchPress: [],
            barbellRow: [],
            dataUpdate: timestamp,
        },
    };

    dynamoDb.put(params, (error) => {

        //handle potential err
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
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