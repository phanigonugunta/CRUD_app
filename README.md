# CRUD_app

Welcome to the CRUD application using mongodb, expressJS, and Nodejs!

This application allows users to create, read, update, and delete data stored in a MongoDB database. It is built using the expressJS framework for routing and Nodejs for the server-side logic.

To get started, you will need to install the required dependencies:

MongoDB
expressJS
Nodejs
Once these are installed, you can start the server by running the following command in your terminal:

node index.js

You can then access the application by going to http://localhost:3000 in your web browser.

To create a new piece of data, you will need to send a POST request to the "/create" route with the data you want to store. You can do this using a tool such as Postman or by sending a POST request from the front-end of your application.

To retrieve data, you can send a GET request to the "/read" route. You can specify which data you want to retrieve by passing in parameters such as the data's ID or any other relevant criteria.

To update data, you will need to send a PUT request to the "/update" route with the updated data and the ID of the data you want to update.

To delete data, you can send a DELETE request to the "/delete" route with the ID of the data you want to delete.

We hope you enjoy using this CRUD application! If you have any questions or feedback, please don't hesitate to reach out.
