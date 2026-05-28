let films = [];


let nome = document.getElementById("myName");
let durata = document.getElementById("myDuration");
let data = document.getElementById("myDate");
let check = document.getElementById("myCheck");
let btn1 = document.getElementById("myBtn1");
let btn2 = document.getElementById("myBtn2");

let elencoFilm = [];

btn1.addEventListener("click", removeFilm);
btn2.addEventListener("click", clearFilms);

loadFilmsFromLocalStorage();

function addFilm() {
    let titleVal = nome.value.trim();
    let durationVal = durata.value;
    let watch_dateVal = data.value;
    let cinemaVal = check.checked; 

    let giaPresente = false;
    for (let i = 0; i < elencoFilm.length; i++) {
        if (titleVal.toLowerCase() == elencoFilm[i].title.toLowerCase()) {
            giaPresente = true;
            break;
        }
    }

    if (giaPresente) {
        alert("Film già inserito");
    } else {
        let film = {
            title: titleVal,
            duration: durationVal,
            watch_date: watch_dateVal,
            cinema: cinemaVal
        };
        elencoFilm.push(film); 
        saveFilmsToLocalStorage();
    }
}

function removeFilm() {
    for(let i = 0; i < elencoFilm.length; i++){
        if(titleVal.toLowerCase() == elencoFilm[i].title){
            elencoFilm.pop(i);
        }
    }
    saveFilmsToLocalStorage();
}

function clearFilms() {
    elencoFilm = [];
}

// TODO: Implement the following functions

function displayFilms() {
    let cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";
    
    elencoFilm.forEach(film => {
        let card = document.createElement("div");
        card.className = "card mb-3";
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title"> ${film.title} </h5>
                <p class="card-text"> Durata: ${film.duration} min </p>
                <p class="card-text"> Data visione: ${film.watch_date} </p>
                <p class="card-text"> Cinema: ${film.cinema} </p>
            </div>
        `;
        cardContainer.appendChild(card);
    });

}

function getTotalWatchTime() {}
function getFilmsWatchedInCinema() {}

function saveFilmsToLocalStorage() {
    let filmsJSON = JSON.stringify(elencoFilm);
    localStorage.setItem("films", filmsJSON);
}

function loadFilmsFromLocalStorage() {
    let filmsJSON = localStorage.getItem("films");
    if (filmsJSON) {
        elencoFilm = JSON.parse(filmsJSON);
    }
}
    
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
                { text: "Leggi i seguenti dati in JSON: " + JSON.stringify(elencoFilm) + " Rispondi esclusivamente in JSON (no backtick, no markdown) suggerendomi 3 nuovi film che potrei vedere in base ai dati che ti ho fornito. Il JSON che devi fornire deve avere un campo listaSuggerimenti che contiene un array di 3 oggetti dove ogni oggetto ha 2 campi: nome che contiene il nome del film e descrizione che contiene una brevissima descrizione sul perchè quel film è stata proposto"
 }
                ]
            }
            ]
        })
    });

    const data = await response.json();
    const result = data.candidates[0].content.parts[0].text;
    

}