let elencoFilm = [];

loadFilmsFromLocalStorage();

const nome = document.getElementById("myName");
const durata = document.getElementById("myDuration");
const data = document.getElementById("myDate");
const check = document.getElementById("myCheck");
const btn1 = document.getElementById("myBtn1");
const btn2 = document.getElementById("myBtn2");

if (btn1) btn1.addEventListener("click", removeFilm);
if (btn2) btn2.addEventListener("click", clearFilms);

displayFilms();

function addFilm() {
    
    loadFilmsFromLocalStorage();

    const titleVal = nome.value.trim();
    const durationVal = durata.value;
    const watch_dateVal = data.value;
    const cinemaVal = check.checked;

    const giaPresente = elencoFilm.some(
        f => f.title.toLowerCase() === titleVal.toLowerCase()
    );

    if (giaPresente) {
        alert("Film già inserito");
        return;
    }

    elencoFilm.push({
        title: titleVal,
        duration: durationVal,
        watch_date: watch_dateVal,
        cinema: cinemaVal
    });

    saveFilmsToLocalStorage();
    displayFilms();
}

function removeFilm() {
    const titleVal = document.getElementById("myFilm").value.trim();
    elencoFilm = elencoFilm.filter(
        f => f.title.toLowerCase() !== titleVal.toLowerCase()
    );
    saveFilmsToLocalStorage();
    displayFilms();
}

function clearFilms() {
    elencoFilm = [];
    saveFilmsToLocalStorage();
    displayFilms();
}

function displayFilms() {
    const cardContainer = document.getElementById("cardContainer");
    if (!cardContainer) return; 

    cardContainer.innerHTML = "";
    elencoFilm.forEach(film => {
        const card = document.createElement("div");
        card.className = "card mb-3";
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${film.title}</h5>
                <p class="card-text">Durata: ${film.duration} min</p>
                <p class="card-text">Data visione: ${film.watch_date}</p>
                <p class="card-text">Cinema: ${film.cinema ? "Sì" : "No"}</p>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}

function getTotalWatchTime() {
    return elencoFilm.reduce((acc, f) => acc + Number(f.duration), 0);
}

function getFilmsWatchedInCinema() {
    return elencoFilm.filter(f => f.cinema);
}

function saveFilmsToLocalStorage() {
    localStorage.setItem("films", JSON.stringify(elencoFilm));
}

function loadFilmsFromLocalStorage() {
    const filmsJSON = localStorage.getItem("films");
    if (filmsJSON) {
        elencoFilm = JSON.parse(filmsJSON);
    }
}

async function getAiRecommendedFilms() {
    const MODEL = "gemini-2.5-flash";
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

    const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text:
                        "Leggi i seguenti dati in JSON: " + JSON.stringify(elencoFilm) +
                        " Rispondi esclusivamente in JSON (no backtick, no markdown) suggerendomi 3 nuovi film che potrei vedere in base ai dati che ti ho fornito." +
                        " Il JSON che devi fornire deve avere un campo listaSuggerimenti che contiene un array di 3 oggetti dove ogni oggetto ha 2 campi:" +
                        " nome che contiene il nome del film e descrizione che contiene una brevissima descrizione sul perché quel film è stato proposto."
                }]
            }]
        })
    });

    const result = await response.json();
    const text = result.candidates[0].content.parts[0].text;
    return JSON.parse(text);
}