#!/bin/bash
#curl -k -v -X POST http://localhost:3001/newuser/?username=b
set -x
curl -k -v 'http://localhost:3001/newuser' \
  -H 'Accept: */*' \
  -H 'Content-Type: application/json' \
  --data-raw '{"username":"bb","password":"b"}'
