'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.updatedata = (event, context, callback) => {
  const timestamp = new Date().getTime(); 
  const info = JSON.parse(event.body);
  console.log(`enter the function ${event.body}`); //do comments like this
  console.log(`bench:   ${info.benchPress}`); //do comments like this

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      "user_id": event.pathParameters.id,
    },
    UpdateExpression: "SET benchPress=list_append(benchPress, :bp), barbellRow=list_append(barbellRow, :br), overheadPress=list_append(overheadPress, :op), deadlift=list_append(deadlift, :dl), squat=list_append(squat, :sq), dataUpdate=:dts",
      ExpressionAttributeValues:{
        ":bp":info.benchPress,
        ":br":info.barbellRow,
        ":op":info.overheadPress,
        ":dl":info.deadlift,
        ":sq": info.squat,
        ":dts": timestamp, 

      },
    ReturnValues: 'UPDATED_NEW',
  };

  //update the todo in the database
  dynamoDb.update(params, (error, result) => {
      console.log(`paramas: ${params.ExpressionAttributeValues}`);
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Unable to update user data. \n',
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