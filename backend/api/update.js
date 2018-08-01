'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const info = JSON.parse(event.body);

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      "user_id": event.pathParameters.id,
    },
    UpdateExpression: "SET fullname=:name, age=:age, height_in=:height, weight_lb=:weight, updated=:updated",
      ExpressionAttributeValues:{
        ":name":info.fullname,
        ":age":info.age,
        ":height":info.height,
        ":weight":info.weight,
        ":updated":timestamp,
      },
    ReturnValues: 'UPDATED_NEW',
  };

  //update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Unable to update user information. \n',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: "Successfully changed: " + JSON.stringify(result.Attributes) + "\n",
    };
    callback(null, response);
  });
};