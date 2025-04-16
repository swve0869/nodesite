#!/bin/bash

# Script to update a value in a .env file
# Usage: ./update_env.sh KEY "NEW_VALUE"

# Check if correct number of arguments provided
if [ $# -ne 3 ]; then
    echo "Usage: $0 KEY \"NEW_VALUE\""
    echo "Example: $0 DATABASE_URL \"mongodb://localhost:27017/mydb\""
    exit 1
fi

# Get arguments

ENV_FILE=$1
KEY=$2
NEW_VALUE=$3


# Check if .env file exists
if [ ! -f "$ENV_FILE" ]; then
    echo "Error: $ENV_FILE file not found"
    exit 1
fi

# Check if the key exists in the file
if grep -q "^${KEY}=" "$ENV_FILE"; then
    # Key exists, update its value
    # Create a temporary file
    TMP_FILE=$(mktemp)
    
    # Replace the line containing the key
    sed "s|^${KEY}=.*|${KEY}=${NEW_VALUE}|" "$ENV_FILE" > "$TMP_FILE"
    
    # Move the temporary file to the original file
    mv "$TMP_FILE" "$ENV_FILE"
    
    echo "Updated $KEY in $ENV_FILE"
else
    # Key doesn't exist, append it
    echo "${KEY}=${NEW_VALUE}" >> "$ENV_FILE"
    echo "Added $KEY to $ENV_FILE"
fi