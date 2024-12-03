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

// Bare-bones DynamoDB Client
export const dynamodb_client = new DynamoDBClient(config);





export async function addUser(dynamodb_client,user_id,username,password) {

    
    var n = crypto.randomInt(0, 1000000);
    while(!checkIDUnique(dynamodb_client,n)){

    }

    const input = {
        "Item": {
          "user_id": {
            "N": user_id.toString()
          },
          "password": {
            "S": password.toString()
          },
          "username": {
            "S": username.toString()
          }
        },
        "ReturnConsumedCapacity": "TOTAL",
        "TableName": "users"
      };
      const command = new PutItemCommand(input);
      const response = await dynamodb_client.send(command);
      
      if(response.$metadata.httpStatusCode == 200){
        console.log(username + " successfully added");
      }
    
}

export async function checkIDUnique(dynamodb_client,query_user_id) {
  const   input = {
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
    console.log("EMPTY")
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