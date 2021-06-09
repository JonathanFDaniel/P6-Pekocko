# piquante #

This is the back end server for Project 6 of the Junior Web Developer path.

### Prerequisites ###

You will need to have Node and `npm` installed locally on your machine.

### Installation ###

Clone this repo. From within the project folder, run `npm install`. You 
can then run the server with `node server`. 
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.

Create a .env file at the root of the project
Add the following lines to your .env file :

    JWT_SECRET=<your secret> 
    DB_NAME=P6-piquante
    DB_PASSWORD=testocr
    USER_NAME=mentor_test