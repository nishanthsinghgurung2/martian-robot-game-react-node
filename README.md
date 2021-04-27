# martian-robot-game

This web application has both the client and server setup to play the martian robot game that calcuate the final coordinates of the robots based on the upper coordinates, robot current position and instruction.

The server side of the app is written in nodejs that takes in the upper coordinates of the martian rectangular area and robot positions to calcuate the final robot coordinates. 

Follow the steps given below to start the server first:

* cd to the server directory `cd server`

* Run `yarn` command to install dependencies

* Run `yarn start` to start the server on port 3001.(Please make sure to have the server running when when making requests from the client web application on browser)

* Run `yarn test` to run the unit tests


The client side of the app is written using React.

Follow the steps given below to start the client:

* cd to the client director `cd client`

* Run `yarn` command to install dependencies

* Run `yarn start` to run the react app.

* Open `localhost:3000` on the browser window to see the webapp.(Please make sure to have the server running when making requests from the client web application on browser)

* Run `yarn test` to run the unit tests.



