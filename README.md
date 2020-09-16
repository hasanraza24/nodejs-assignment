# Node.js Assignment
### Assignment: Backend

You are building the API for a **pizza-delivery company**.

1. **New users** can be created, their information can be edited, and they can be deleted. We should store their *name*, *email address*, and *street address*.
2. Users can **log in** and **log out** by creating or destroying a JWT token.
3. When a user is logged in, they should be able to **GET all the possible menu items** (these items should be come from the Mongo Database). 
4. A logged-in user should be able to **fill a shopping cart with menu items**
5. When an order is placed, you should **email the user a receipt**. You should integrate with the sandbox of [Mailgun.com](https://www.mailgun.com/) for this. _Note:_ Every Mailgun account comes with a sandbox email account domain (whatever@sandbox123.mailgun.org) that you can send from by default. So, there's no need to setup any DNS for your domain for this task. [Read more here](https://documentation.mailgun.com/en/latest/faqs.html#how-do-i-pick-a-domain-name-for-my-mailgun-account).
6. An API endpoint for the report of all orders.
7. Validation of all the request methods.
8. Image upload of every menu item.
(Postman will be used for testing APIs, so make the postman collection and add it in the project folder then submit project to git).



### Solution

To start project first create .env file and copy content from .env.example to .env
and add the details in .env file


Then run the command

### `npm install`

then run

### `npm start`

and application would be running on porn that you provided in .env

All APIs are in Assignment.postman_collection.json you can import this into postman