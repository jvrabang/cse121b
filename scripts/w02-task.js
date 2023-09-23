/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */
let fullname = "John Vincent Rabang";
<<<<<<< HEAD
let currentYear = new Date().getFullYear();
=======
let currentYear = 2023;
>>>>>>> 2557b2827946a00ddab748e8add4abd7c163c69e
let profilePicture = "images/jv.png";

/* Step 3 - Element Variables */
const nameElement = document.getElementById('name');
const foodElement = document.getElementById('food');
const yearElement = document.querySelector('#year');
var imageElement = document.querySelector('main#home picture img');

/* Step 4 - Adding Content */
nameElement.innerHTML = `<strong>${fullname}</strong>`;
yearElement.textContent = currentYear;
imageElement.setAttribute('src', profilePicture);
imageElement.setAttribute('alt', `Profile image of ${fullname}`);

/* Step 5 - Array */
let favoriteFood = ['Shrimp', 'Ramen', 'Kimchi', 'Avocado Ice Cream'];
foodElement.textContent = `${favoriteFood}`;
let newfavoriteFood = 'Mango';
favoriteFood.push(newfavoriteFood);
foodElement.innerHTML += `<br>${favoriteFood}`;
favoriteFood.shift();
foodElement.innerHTML += `<br>${favoriteFood}`;
favoriteFood.pop();
foodElement.innerHTML += `<br>${favoriteFood}`;
