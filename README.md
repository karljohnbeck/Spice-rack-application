# Project Name: Spice-rack Solo project

## Description

_Duration: 2 weeks_

This project was to create a mobile first application that could allow a user to keep a record of all the spices they have at home while they are out shopping at the grocery store. after logging in to the app a user could record all the spices they have and sort them into categories they created. The application also keeps track of expiration dates and has a page where you can see if you have any spices that are going to or are expired. Recipes can also be looked up for a specific spice as well if a user want to use up a spice they have in their records. 

## Screen Shot

_Below is an image of the register page._

![sample register page](/sample/register.png)

_Below is an image of the home page._

![sample home page](/sample/home.png)

_Below is an view of the categories page._

![sample categories page](/sample/categories.png)

_Below is an image of the expiring view._

![sample expire page](/sample/expire.png)

_Below is an image one of the recipe page for garlic powder._

![sample recipe page](/sample/recipes.png)





## Usage

work in progress. 

- To open the app:

1. Create a database using the command lines in the database.sql file (I used postico to talk with PostgreSQL).
2. Turn on the server with 'npm run server' in the terminal.
3. In a new terminal window, turn on the client with 'npm run client'.
4. Go to localhost:3000 in your browser.

- App use: 

-- Register -- 
1. If not already on the registration page, click register below the login form. 
2. Enter in a user name and a password, the username needs to be unique form all other users.
3. after registering you will be brought to the sites home page.

-- Nav bar -- 
The top of the page has a nav bar with the app name that when clicked on Will return the user to the home page and a hamburger menu to bring the user to different views. 

-- Main page -- 
1. After registering, a user will need to add cateogiries and spices to the app.
2. Once spices are added, cards will appear on the main page what when clicked will have 4 buttons available to interact with: Delete, Edit, Recipe, Back.
3. Recipe brings the user to the recipe view (see Recipe view below)
4. Edit brings up a Dialog where you can change auto populated inputs and either click "save" to save the changes or "cancel" to keep old information the same.
5. Delete will open a conformation dialog what you can either click "delete" to delete the spice or "cancel" to not delete.
6. Back will flip the card back to its original view. 

-- Add/Edit/Delete a Category -- 
1. click to the hamburger menu on the top right of the app 
2. click the "Categories" option where you are redirected to the categories view
3. On the top of the page you can add a Category to the app by filling in the input and clicking "add category".
4. To edit a category, click the edit icon (pencil), an input will be displayed and when you update and click "Save" the category will be updated. to cancel the edit click "Cancel".
5. to delete a category, click the delete icon (trashcan), and a dialog will appear. click "delete" to confirm the delete, or click "cancel" to cancel the delete.

-- Adding a spice -- 
1. Click the "add a spice" button on the add spice card on the center of the page.
2. Fill out all the fields on the page and select any Categories you would like to add to that spice.
3. When finished, click the "Save" button, this will save the Spice and open a dialog.
4. On the Dialog you can either click "Add More" to stay on the page to add more spices to your account, or "return home" to head back to the main page.

-- Expiration view -- 
1. click to the hamburger menu on the top right of the app 
2. click the "Expiration" option where you are redirected to the Expiration view
3. Here Spices that are 30 days from expiring and expired spices are seen. If none are close to expiring and none are expired, nothing will display 
4. a user can edit the spice and delete the spice from this page. 

-- Recipe view -- 

1. After clicking the "recipe" button on the back side of the card the user is brought to a recipe page.
2. On the page 10 recipes are displayed that contain the spice of the card you originally flipped from the main page. 
3. Clicking the "go to recipe" button will open the recipe up in a new tab in your internet browser.

-- logging out -- 
1. When done with the app click to the hamburger menu on the top right of the app.
2. Click the "log out" button. 

## Built With

- JavaScript
- Bootstrap
- React
- CSS
- PostgreSQL
- Axios
- Pg
- Redux
- Sagas
- Material-UI
- Edamam API



## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality.

## Support
If you have suggestions or issues, please email me at karljohnbeck@gmail.com


<!-- This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

We **STRONGLY** recommend following these instructions carefully. It's a lot, and will take some time to set up, but your life will be much easier this way in the long run.

## Use the Template for This Repository (Don't Clone) 

- Don't Fork or Clone. Instead, click the `Use this Template` button, and make a copy to your personal account.


## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `prime_app` and create a `user` table:

```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
```

If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)

## Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum.

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Start the server - `npm run server`
2. [Import the sample routes JSON file](./PostmanPrimeSoloRoutes.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
   1. `POST /api/user/register` registers a new user, see body to change username/password
   2. `POST /api/user/login` will login a user, see body to change username/password
   3. `GET /api/user` will get user information, by default it's not very much

After running the login route above, you can try any other route you've created that requires a logged in user!

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`

## Lay of the Land

There are a few videos linked below that show a walkthrough the client and sever setup to help acclimatize to the boilerplate. Please take some time to watch the videos in order to get a better understanding of what the boilerplate is like.

- [Initial Set](https://vimeo.com/453297271)
- [Server Walkthrough](https://vimeo.com/453297212)
- [Client Walkthrough](https://vimeo.com/453297124)

Directory Structure:

- `src/` contains the React application
- `public/` contains static assets for the client-side
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App

This code is also heavily commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes. If you're wondering where to start, consider reading through component file comments in the following order:

- src/components
  - App/App
  - Footer/Footer
  - Nav/Nav
  - AboutPage/AboutPage
  - InfoPage/InfoPage
  - UserPage/UserPage
  - LoginPage/LoginPage
  - RegisterPage/RegisterPage
  - LogOutButton/LogOutButton
  - ProtectedRoute/ProtectedRoute

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Update Documentation

Customize this ReadMe and the code comments in this project to read less like a starter repo and more like a project. Here is an example: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2 -->
