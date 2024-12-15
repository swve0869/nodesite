// require('dotenv').config()
import 'dotenv/config'
import crypto from 'crypto'
import hash from 'hash-it'

console.log(process.env.DB_ACCESS_KEY)

const config = {
    region:'us-west-2',
    credentials: {
        accessKeyId: process.env.DB_ACCESS_KEY,
        secretAccessKey: process.env.DB_SECRET_ACCESS_KEY
    }

}
  

import { DynamoDBClient,PutItemCommand,QueryCommand,ScanCommand } from "@aws-sdk/client-dynamodb"; // ES6 import
import { PutCommand } from '@aws-sdk/lib-dynamodb';

// Bare-bones DynamoDB Client
export const dynamodb_client = new DynamoDBClient(config);



export async function addUser(dynamodb_client,username,password) {

    var user_id = hash(username)

    if (await checkUnique(dynamodb_client,user_id) == false){
      return false;
    }
    
    const input = {
        "TableName": "users",
        "Item": {
          "user_id": {
            "N": user_id.toString()
          },
          "password": {
            "S": password
          },
          "username": {
            "S": username
          }
        },
        "ReturnConsumedCapacity": "TOTAL",

      };
      //console.log(input)
      const command = new PutItemCommand(input);
      const response = await dynamodb_client.send(command);
      
      if(response.$metadata.httpStatusCode == 200){
        console.log(username + " successfully added");
      }
    
}

// function to check if he generated user id is unique in the data base
export async function checkUnique(dynamodb_client,query_user_id) {
  const input = {
    "TableName": "users", // Replace with your DynamoDB table name
    "KeyConditionExpression": 'user_id = :partitionKey', // Replace 'id' with your partition key name
    "ExpressionAttributeValues": {
        ":partitionKey":{
          "N":query_user_id.toString() // Value to query by
        }
    }
  };

/*   const input2 = {
    TableName: "users", // Replace with your DynamoDB table name
    KeyConditionExpression: 'username = :Username', // Replace 'id' with your partition key name
    ExpressionAttributeValues: {
        ":Username":{
          "S":username // Value to query by
        }
    }
  }; */


  const command = new QueryCommand(input);
  const response  = await dynamodb_client.send(command);

  // console.log("res",response)

 /*  const command2 = new QueryCommand(input2);
  const response2 = await dynamodb_client.send(command2);
  console.log("res2", response2) */
0
  if (!response.Items || response.Items.length === 0 ) {
    return true
  } 
  return false;
}

