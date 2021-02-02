# Creditor-API

This is an API designed and implemented using NodeJS to retrieve, add, and update data on creditors. Technologies used: Express and Sequelize for RESTful routing; PostgreSQL for data storage and retrieval.

# Video link: 

https://youtu.be/AV3RE42Zh5I 

# Routes implemented:

1. `/api/creditors` 
  * GET
    * fetches creditor data with total balance and average minimum pay percentage
    * parameter `name`: specific creditor name to include data for; if not present, includes data for all creditors 
  * POST
    * adds a new creditor entry.
2. `/api/creditors/:creditorId`
  * PUT
    * updates an existing creditor entry (partially or fully).
3. `/api/credit_analysis`
  * GET
    * fetches only creditor data where the balance is over 2000.00 and the minimum pay percentage is less than 2.99. 

# Instructions:

1. `npm install` to install all node modules.
2. Create a new database in your PostgreSQL database app called `creditor-api`.
3. There is a small seed file included under the `script` folder. Type `npm run seed` to populate the database.
4. `npm run start-server` to start the app.
5. Head over to `localhost:8080` to begin using the routes.
