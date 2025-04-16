#!/bin/bash

# bash script to check for npm dependencies and install accordingly
# also to run the server in development or in deployment mode

if [ $# -eq 0 ]; then
    echo "No arguments provided. Showing all information."
    echo ""
    ALL=true
fi

HTTP_TYPE=http://
REACT_PORT=3000
REACT_DOMAIN=localhost
NODE_PORT=3001
NODE_DOMAIN=localhost

# Process arguments
while [ $# -gt 0 ]; do
    case "$1" in
        -d|--deploy)
            DEPLOY=true
            ;;
        -l|--local)
            DEPLOY=false
            ;;
        -np|--node-port)
            if [ -n "$2" ]; then
                NODE_PORT="$2"
                echo "running node server from $NODE_PORT"
                shift  # Consume the name parameter
            else
                echo "Error: --node-port requires a port parameter."
                show_help
                exit 1
            fi
            ;;
        -rp|--react-port)
            if [ -n "$2" ]; then
                REACT_PORT="$2"
                echo "running react from port $REACT_PORT"
                shift  # Consume the name parameter
            else
                echo "Error: --node-port requires a port parameter."
                show_help
                exit 1
            fi
            ;;    
        *)
            echo "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
    shift
done


if [ $DEPLOY == "true" ]; then
    # build for deployment
    echo "Bould for deployment"
    cp env/.server.deploy.env server/.env
    cp env/.react.deploy.env  reactsite/.env

    cd server 
    npm start &
    cd ../reactsite
    npm start &

else
    # build for local
    echo "Building for local" 
    
    # update domains and ports in server/.env and reactsite/.env for local hosting
    cp env/.server.local.env server/.env
    cp env/.react.local.env  reactsite/.env

    cd server 
    npm start &
    cd ../reactsite
    npm start &


    
  fi