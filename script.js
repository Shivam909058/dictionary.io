const wordInput = document.querySelector('#wordInput');
const searchBtn = document.querySelector('#searchBtn');
const meaningDiv = document.querySelector('#meaning');
const exampleDiv = document.querySelector('#example');
const shortMeaningDiv = document.querySelector('#shortMeaning');
const detailedMeaningDiv = document.querySelector('#detailedMeaning');


document.querySelector('#wordForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const word = wordInput.value;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(url)
    .then(response => response.json())
    .then(json => {
        console.log(json); // Log the parsed response
        if (Array.isArray(json)) {
            const definition = json[0]?.meanings[0]?.definitions[0]?.definition || "No definition found";
            const example = json[0]?.meanings[0]?.definitions[0]?.example || "No example found";
            
            shortMeaningDiv.innerHTML = definition;  // Assuming short meaning is the main definition
            detailedMeaningDiv.innerHTML = example;  // Assuming detailed meaning is the example
        } else {
            shortMeaningDiv.innerHTML = "No results found";
            detailedMeaningDiv.innerHTML = "";
        }
    })
    .catch(err => {
        console.log(err);
        shortMeaningDiv.innerHTML = "Error occurred while fetching data";
        detailedMeaningDiv.innerHTML = "";
    });
});
