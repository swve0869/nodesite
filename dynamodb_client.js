// require('dotenv').config()
import 'dotenv/config'
import crypto from 'crypto'

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
    
    var user_id = crypto.randomInt(0, 10000000);
    while(true){
      user_id = crypto.randomInt(0, 10000000);
      if (await checkIDUnique(dynamodb_client,user_id) == true){
        break; 
      }
    }

    console.log("newID:" ,user_id, username,password)

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
      console.log(input)
      const command = new PutItemCommand(input);
      const response = await dynamodb_client.send(command);
      
      if(response.$metadata.httpStatusCode == 200){
        console.log(username + " successfully added");
      }
    
}

// function to check if he generated user id is unique in the data base
export async function checkIDUnique(dynamodb_client,query_user_id) {
  const input = {
    "TableName": "users", // Replace with your DynamoDB table name
    "KeyConditionExpression": 'user_id = :partitionKey', // Replace 'id' with your partition key name
    "ExpressionAttributeValues": {
        ":partitionKey":{
          "N":query_user_id.toString() // Value to query by
        }
    }
  };
  
  const command = new QueryCommand(input);
  const response = await dynamodb_client.send(command);

  console.log(response)

  if (!response.Items || response.Items.length === 0) {
    return true;
  } 

  return false;
}



/*


import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"; // ES6 import
// const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb"); // CommonJS import

// Bare-bones document client
const ddbDocClient = DynamoDBDocumentClient.from(client); // client is DynamoDB client

// add to table?
await ddbDocClient.send(
    new PutCommand({
      users,
      Item: {
        user_id: "1",
        content: "content from DynamoDBDocumentClient",
      },
    })
  );

*/