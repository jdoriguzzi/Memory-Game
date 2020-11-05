const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let i = 0;
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add("down");    // mark it as initially facedown
    newDiv.setAttribute("id", i++);  // give it a unique ID

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if ((event.target).classList[1] == "matched")
    return; // if its a completed match, ignore the click

  (event.target).classList.remove("down"); // turn it face up
  (event.target).classList.add("clicked"); // mark it as clicked

  let divs = document.getElementsByTagName("div");
  let num = 0; // number of active clicked cards, one or two 
  let j = 0;   // to store the ID of the first clicked card found
  for (i=0; i<divs.length; i++) {
    if (divs[i].classList.contains("clicked")) {
      num++;
      if (num == 2) {  
        if (!(divs[i].classList[0] === divs[j].classList[0])) {
          setTimeout(function (i, j) {
            divs[i].classList.remove("clicked");
            divs[i].classList.add("down");
            divs[j].classList.remove("clicked");
            divs[j].classList.add("down");
          }, 1000, i, j);
        } else {  // if the match, make them  inactive 
            divs[i].classList.remove("clicked");
            divs[i].classList.add("matched");  
            divs[j].classList.remove("clicked");
            divs[j].classList.add("matched");
            console.log("match!");
        }
      } else {
          j = i;  // save the ID of the first clicked card found
      }
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
