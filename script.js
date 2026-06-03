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
        if(element.toLowerCase() == titleVal.toLowerCase()){
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