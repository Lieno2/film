 /* 
Data structure for a film:
 {
    title,
    duration,
    watch_date,
    cinema,
}
*/

let films = [];


// TODO: Implement the following functions
function addFilm() {}
function removeFilm() {}
function clearFilms() {}

function displayFilms() {}
function getTotalWatchTime() {}
function getFilmsWatchedInCinema() {}

function saveFilmsToLocalStorage() {}
function loadFilmsFromLocalStorage() {}

async function getAiRecommendedFilms() {

    const MODEL = "gemini-2.5-flash";
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;


    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            contents: [
            {
                parts: [
                { text: "Leggi i seguenti dati in JSON: " + JSON.stringify(films) + " Rispondi esclusivamente in JSON (no backtick, no markdown) suggerendomi 3 nuovi film che potrei vedere in base ai dati che ti ho fornito. Il JSON che devi fornire deve avere un campo listaSuggerimenti che contiene un array di 3 oggetti dove ogni oggetto ha 2 campi: nome che contiene il nome del film e descrizione che contiene una brevissima descrizione sul perchè quel film è stata proposto"
 }
                ]
            }
            ]
        })
    });

    const data = await response.json();
    const result = data.candidates[0].content.parts[0].text;
    

}