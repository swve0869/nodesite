#!/bin/bash
#curl -k -v -X POST http://localhost:3001/newuser/?username=b
set -x
data='{username: "test", password : "test"}'
curl -k -v -d "$data" -X POST http://localhost:3001/newuser
