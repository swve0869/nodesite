import http from "http";
import { addUser,checkIDUnique, dynamodb_client } from "./dynamodb_client.js";
import cors from 'cors'


// normal server using http module
/* const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});
 */


// server using express
//const express = require("express");
import express from "express"
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
   console.log(req.body)
   res.json({ message: "gooby woobi" });
   console.log("request received")
 });


app.post("/newuser", (req, res) => {
  //console.log(req.body)
  const { username, password} = req.body;
  console.log("new USER request for", username,password)


  addUser(dynamodb_client,username,password);

  res.status(201).json({ message: 'User created successfully!', username, password }); 
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});



/* console.log(await checkIDUnique(dynamodb_client,23401))

if(await checkIDUnique(dynamodb_client,23401) == true){
  console.log("GOOOB")
} */
//checkIDUnique(dynamodb_client,2)

