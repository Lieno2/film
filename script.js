const API_KEY = "YOUR-API-KEY";

let filmList = [];

loadFilmsFromLocalStorage();
displayFilms();

function addFilm() {
    const nome = document.getElementById("myName");
    const durata = document.getElementById("myDuration");
    const data = document.getElementById("myDate");
    const check = document.getElementById("myCheck");

    const titleVal = nome.value.trim();
    const durationVal = durata.value;
    const watch_dateVal = data.value;
    const cinemaVal = check.checked;

    if (!titleVal || !durationVal || !watch_dateVal) {
        alert("Tutti i campi sono obbligatori!");
        return;
    }

    filmList.forEach(element => {
        if(element.title.toLowerCase() == titleVal.toLowerCase()){
            alert("Film già inserito");
            return;
        }
    });

    filmList.push({
        title: titleVal,
        duration: Number(durationVal),
        watch_date: watch_dateVal,
        cinema: cinemaVal
    });

    nome.value = "";
    durata.value = "";
    data.value = "";
    check.checked = false;

    displayFilms();
}

function deleteFilm(index) {
    filmList.pop(index)
    displayFilms();
}

function clearFilms() {
    if (confirm("Vuoi davvero eliminare tutti i film?")) {
        filmList = [];
        displayFilms();
    }
}

function updateWatchTimeModal() {
    let totale = 0;
    for (let i = 0; i < filmList.length; i++) {
        totale = totale + Number(filmList[i].duration);
    }
    const ore = Math.floor(totale / 60);
    const minuti = totale % 60;
    document.getElementById("modalTotalTime").innerHTML = ore + "h " + minuti + "m (" + totale + " min)";
}

function updateCinemaFreqModal() {
    const cinemaList = document.getElementById("modalCinemaList");
    cinemaList.innerHTML = "";

    let tmp = 0;
    let listaHTML = "";

    filmList.forEach(film => {
        if (film.cinema) {
            tmp++;
            listaHTML = listaHTML + "<li class='list-group-item bg-transparent text-light border-secondary'>" + film.title + "</li>";
        }
    });

    document.getElementById("modalCinemaCount").innerHTML = tmp;

    if (tmp === 0) {
        cinemaList.innerHTML = "<li class='list-group-item bg-transparent text-muted border-0'>Nessun film visto al cinema</li>";
    } else {
        cinemaList.innerHTML = listaHTML;
    }
}




function saveFilmsToLocalStorage() {
    localStorage.setItem("films", JSON.stringify(filmList));
    alert("Dati salvati in locale con successo!");
}

function loadFilmsFromLocalStorage() {
    const datiSalvati = localStorage.getItem("films");
    if (datiSalvati) {
        filmList = JSON.parse(datiSalvati);
    }
}

async function chiediConsigliGemini() {
    const risultatiDiv = document.getElementById("aiResults");

    // Validazioni preliminari
    if (filmList.length === 0) {
        alert("Aggiungi almeno un film prima di chiedere consigli!");
        return;
    }

    if (API_KEY === "YOUR-API-KEY" || API_KEY === "") {
        alert("Inserisci la tua API Key Gemini all'interno del file script.js!");
        return;
    }

    risultatiDiv.innerHTML = "<p class='text-center text-muted'>Gemini sta elaborando i consigli...</p>";

    const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + API_KEY;

    const oggettoRichiesta = {
        "contents": [
            {
                "parts": [{ "text": "" }]
            }
        ]
    };

    const filmListJSON = JSON.stringify(filmList);
    const promptText = "Leggi i seguenti dati in JSON: " + filmListJSON +
        " Rispondi esclusivamente in JSON (no backtick, no markdown) suggerendomi 3 nuovi film che potrei vedere in base ai dati che ti ho fornito." +
        " Il JSON deve avere un campo listaSuggerimenti che contiene un array di 3 oggetti," +
        " dove ogni oggetto ha 2 campi: nome (nome del film) e descrizione (brevissima spiegazione del perché è stato proposto).";

    oggettoRichiesta.contents[0].parts[0].text = promptText;

    try {
        const risposta = await fetch(ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(oggettoRichiesta) 
        });

        const dati = await risposta.json();
        let testo = dati.candidates[0].content.parts[0].text;

        testo = testo.replace("```json", "").replace("```", "").trim();

        const oggetto = JSON.parse(testo);
        const suggerimenti = oggetto.listaSuggerimenti;

        let html = "";


        suggerimenti.forEach(element => {

            
            html += "<div class='card bg-dark text-light p-3 border-secondary'>" +
                "<h5 style='text-decoration: underline;'>" + element.nome + "</h5>" +
                "<p class='text-muted mb-0' style='text-align: justify; color: white'>" + element.descrizione + "</p>" +
                "</div>";
        });

        risultatiDiv.innerHTML = html;

    } catch (errore) {
        console.error(errore);
        risultatiDiv.innerHTML = "<div class='alert alert-danger'>Si è verificato un errore: " + errore.message + "</div>";
    }
}

function displayFilms() {
    const tableBody = document.getElementById("filmTableBody");
    const filmCount = document.getElementById("filmCount");

    tableBody.innerHTML = "";
    filmCount.innerHTML = filmList.length;

    const emptyMessage = document.getElementById("emptyMessage");
    if (filmList.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    for(let i = 0; i < filmList.length; i++){
        const film = filmList[i];
        const riga = document.createElement("tr");

        riga.innerHTML = `
            <td>${film.title}</td>
            <td>${film.duration} min</td>
            <td>${film.watch_date.split("-").reverse().join("/")}</td>
            <td>${film.cinema ? "Sì" : "No"}</td>
            <td class="text-end">
                <button class="btn btn-outline-light btn-sm" onclick="deleteFilm(${i})">Elimina</button>
            </td>
        `;
        tableBody.appendChild(riga);
    };
}
