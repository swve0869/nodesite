// require('dotenv').config()
import 'dotenv/config'
import crypto from 'crypto'
import hash from 'hash-it'


const config = {
    region:'us-west-2',
    credentials: {
        accessKeyId: process.env.DB_ACCESS_KEY,
        secretAccessKey: process.env.DB_SECRET_ACCESS_KEY
    }

}
  

import { DynamoDBClient,PutItemCommand,QueryCommand,ScanCommand } from "@aws-sdk/client-dynamodb"; // ES6 import
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import e from 'cors';

// Bare-bones DynamoDB Client
export const dynamodb_client = new DynamoDBClient(config);


export async function addUser(dynamodb_client,username,password,email) {

    
    var saltedpassword = hash(password+process.env.SALT);
    var user_id = hash(username+saltedpassword);
    if (await userQuery(dynamodb_client,user_id).Count == 1){
      return false;
    }
    
    const input = {
      "TableName": "users",
      "Item": {
        "user_id": { "N": user_id.toString() },
        "password": { "S": saltedpassword.toString() },
        "username": { "S": username },
        "email": { "S": email }
      },
      "ReturnConsumedCapacity": "TOTAL"
    };
      //console.log(input)
      const command = new PutItemCommand(input);
      const response = await dynamodb_client.send(command);
      
      if(response.$metadata.httpStatusCode == 200){
        console.log(username + " successfully added");
      }
    
}


export async function userQuery(dynamodb_client,query_user_id) {
  const input = {
    "TableName": "users", // Replace with your DynamoDB table name
    "KeyConditionExpression": 'user_id = :partitionKey', // Replace 'id' with your partition key name
    "ExpressionAttributeValues": {
        ":partitionKey":{
          "N": query_user_id.toString() 
        }
    }
  }; 

  const command = new QueryCommand(input);
  const response  = await dynamodb_client.send(command);

  //console.log(response);

  if(response.Count == 1){
    return response;

  }else{
    return false;
  }
}

