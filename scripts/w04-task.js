    /* LESSON 3 - Programming Tasks */

    /* Profile Object  */
    let myProfile= {
        name: "JV Rabang",
        photo: "images/jv.png",
        favoriteFoods: ['Shrimp', 'Ramen', 'Kimchi', 'Avocado Ice Cream'],
        hobbies: ['jogging','hiking','reading','travelling'],
        placesLived: []
    };

    /* Populate Profile Object with placesLive objects */
    myProfile.placesLived.push(
        {
            place: "Vigan City, Philippines",
            length: "5 years"
        }
    );

    myProfile.placesLived.push(
        {
            place: "Makati City, Philippines",
            length: "3 years"
        }
    );

    myProfile.placesLived.push(
        {
            place: "Brigham City, Utah, USA",
            length: "8 months"
        }
    );

    myProfile.placesLived.push(
        {
            place: "Kuala Lumpur, Malaysia",
            length: "5 months"
        }
    );

    /* DOM Manipulation - Output */

    /* Name */
    document.querySelector("#name").textContent = myProfile.name;

    /* Photo with attributes */
    let photoElement = document.getElementById('photo');
    photoElement.setAttribute('src', myProfile.photo);
    photoElement.setAttribute('alt', myProfile.name);


/* Favorite Foods List*/
myProfile.favoriteFoods.forEach (food => {
    let li = document.createElement('li');
    li.textContent = food;
    document.querySelector('#favorite-foods').append(li);
});

/* Hobbies List */
myProfile.hobbies.forEach (hobbies => {
    let li = document.createElement('li');
    li.textContent = hobbies;
    document.querySelector('#hobbies').append(li);
});

/* Places Lived DataList */
myProfile.placesLived.forEach (placesLived => {
    let dl = document.createElement('dl');
    let dt = document.createElement('dt');
    let dd = document.createElement('dd');

    dt.innerHTML = `🏠<strong>${placesLived.place}</strong>`;
    dd.innerHTML = `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${placesLived.length}<br><br>`;

    dl.appendChild(dt)
    dl.appendChild(dd)

    document.querySelector('#places-lived').append(dl);
});


