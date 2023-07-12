// Write your helper functions here!
//from link

function addDestinationInfo(  //function has 7 paraameters
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  let planetInfo = document.getElementById("missionTarget"); //retrieve id missionTarget and assign to planetInfo
  planetInfo.innerHTML = `    
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
                `; //use template string to display info about mission destination
}

function validateInput(testInput) {
  let numberInput = Number(testInput); //define input as a number
  if (testInput === "") {  //is it an empty string?
    return "Empty";
  } else if (isNaN(numberInput)) {  //is it not a number?
    return "Not a Number";
  } else if (isNaN(numberInput) === false) {  // it must be a number
    return "Is a Number";
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  let fuel = document.getElementById("fuelStatus");
  let cargo = document.getElementById("cargoStatus");
  let pilotStatus = document.getElementById("pilotStatus");
  let copilotStatus = document.getElementById("copilotStatus");

  if (
    validateInput(pilot) === "Empty" ||
    validateInput(copilot) === "Empty" ||
    validateInput(fuelLevel) === "Empty" ||
    validateInput(cargoLevel) === "Empty"
  ) {
    alert("All fields are required!");
  } else if (
    validateInput(pilot) === "Is a Number" ||
    validateInput(copilot) === "Is a Number" ||
    validateInput(fuelLevel) === "Not a Number" ||
    validateInput(cargoLevel) === "Not a Number"
  ) {
    alert("Make sure to enter valid information for each field!");
  } else {
    list.style.visibility = "visible"; //changes from hidden and error checks
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    let launchStatus = document.getElementById("launchStatus");
    if (fuelLevel < 10000 && cargoLevel <= 10000) {
      fuel.innerHTML = "Fuel level too low for launch";
      cargo.innerHTML = "Cargo mass low enough for launch";
      launchStatus.innerHTML = "Shuttle Not Ready for Launch";
      launchStatus.style.color = "#C7254E";
    } else if (fuelLevel >= 10000 && cargoLevel > 10000) {
      fuel.innerHTML = "Fuel level high enough for launch";
      cargo.innerHTML = "Cargo mass too heavy for launch";
      launchStatus.innerHTML = "Shuttle Not Ready for Launch";
      launchStatus.style.color = "#C7254E";
    } else if (fuelLevel < 10000 && cargoLevel > 10000) {
      fuel.innerHTML = "Fuel level too low for launch";
      cargo.innerHTML = "Cargo mass too heavy for launch";
      launchStatus.innerHTML = "Shuttle Not Ready for Launch";
      launchStatus.style.color = "#C7254E";
    } else {
      fuel.innerHTML = "Fuel level high enough for launch";
      cargo.innerHTML = "Cargo mass low enough for launch";
      launchStatus.innerHTML = "Shuttle is Ready for Launch";
      launchStatus.style.color = "#419F6A";
    }
  }
}

async function myFetch() {
  let planetsReturned; //variable to store the fetched JSON data
  //next fetch the json data about planets - use await and async keywords to pause execution of the function until fetch is complete
  planetsReturned = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  ).then(function (response) {
    if (response.status >= 400) {
      throw new Error("Bad response"); //checks to  ensure response is valid (status less than 400)
    } else {
      return response.json(); //handles the fetched JSON data and returns it
    }
  });

  return planetsReturned; //returns assigned data in this variable
}

function pickPlanet(planets) {
  let index = Math.floor(Math.random() * planets.length); //random generation of a number returned
  return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
