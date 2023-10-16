/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.querySelector("#temples");
const templeList = [];

/* async displayTemples Function */
const displayTemples = (temples) => {
  templesElement.innerHTML = ''; 

  temples.forEach((temple) => {
    const article = document.createElement("article");
    const h3 = document.createElement("h3");
    h3.textContent = temple.templeName;
    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = temple.location;

    article.appendChild(h3);
    article.appendChild(img);
    templesElement.appendChild(article);
  });
};


/* async getTemples Function using fetch()*/
const getTemples = async () => {
  try {
    const response = await fetch("https://byui-cse.github.io/cse121b-ww-course/resources/temples.json");
    
    if (!response.ok) {
      throw new Error(`Unable to fetch data (${response.status}): ${response.statusText}`);
    }

    const data = await response.json();
    templeList.push(...data);

    displayTemples(templeList);
  } catch (error) {
    console.error("There is an error in fetching and processing the temple data:", error);
  }
};

getTemples();

/* reset Function */
const reset = () => {
  templesElement.innerHTML = ''; 
};

/* sortBy Function */
const sortBy = (temples) => {
  reset(); 

  const filter = document.querySelector("#sortBy").value;

  switch (filter) {
    case "utah":
      displayTemples(temples.filter(temple => temple.location.toLowerCase().includes("utah")));
      break;
    case "notutah":
      displayTemples(temples.filter(temple => !temple.location.toLowerCase().includes("utah")));
      break;
    case "older":
      displayTemples(temples.filter(temple => {
        const dedicationDate = new Date(temple.dedicated);
        return dedicationDate < new Date("1950-01-01");
      }));
      break;
    case "all":
    default:
      displayTemples(temples);
      break;
  }
};


/* Event Listener */
document.querySelector("#sortBy").addEventListener("change", () => {
  sortBy(templeList);
});