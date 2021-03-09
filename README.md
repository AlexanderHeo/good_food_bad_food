# GOOD FOOD vs BAD FOOD
Food tracker for people who need to watch their diet.

There are many folks who need to track their food intake, whether because of a diet, or illness. This app helps track each meal you have, and track the result on a scale of 1 - 5. GOOD vs BAD lists can be pulled up quickly to make sure you don't eat something outside of your diet, or something that can cause a flair up of your disease.

All animation has been created by developer using CSS keyframes.

## Technologies Used
* React JS - React Router, Styled Components
* Node JS
* Express JS
* HTML5
* CSS3
* Babel
* webpack
* PostgreSQL
* AWS EC2

## System Requirements
* Node JS 10 or higher
* npm 6 or higher
* PostgreSQL 10.15 or higher

## Getting Started
1. Close the repository
```
git clone https://github.com/AlexanderHeo/good_food_bad_food.git
cd good_food_bad_food
```
2. Install dependencies with npm
```
npm i
```
3. Import the database
```
npm run db:import
```
4. Build the app
```
npm run build
```
5. Open the app the in your browser
```
[Open the website](http://localhost:3000/)

```


#### Features List
* Users can create an account with a unique username and password
* Users can set a home location while creating their account
* Users can login to their account, using their password<br/><br/>
* Users can see a daily display for each mealtime, plus snacks
* Users can see a weekly display
* The weekly display has icons for each mealtime, plus snacks, and is color coded to quickly see if a mealtime has been entered, or rated
* The weekly display shows the average rating for each day
* Users can see meals entered for previous days
* Users can change the weekly display to show previous weeks
* Users can enter the name of a meal for each mealtime
* Users can rate the meal on a scale of 1 - 5
* Users can edit the name of an already entered meal
* Users can edit the rating of an already rated meal
* Users can delete a meal entry<br/><br/>
* Users can open a Lists component, that displays the best or worst rated foods, separated by mealtimes<br/><br/>
* Users can open a Settings component
* Users can see FDA food recall warnings in their home location
* Users can search for FDA food recall warnings for different areas
* Users can change their home location
* Users can read about the app and the developer, and see contact information for the developer
* Users can reset their password
* Users can sign out of the app

## Future Features
* Color Theme chooser, including Dark Mode
* Monthly Display option, instead of Weekly
* Mealtime initial display in Weekly Display will be color coded to match rating
* Better algorithm and more filters for the GOOD vs BAD Lists
* Better responsiveness
* Desktop layout
* Change password
