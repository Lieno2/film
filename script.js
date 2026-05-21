 /* 
Data structure for a film:
 {
    title,
    duration,
    watch_date,
    cinema,
}
*/


let nome = document.getElementById("myName");
let durata = document.getElementById("myDuration");
let data = document.getElementById("myDate");
let check = document.getElementById("myCheck");

let elencoFilm = [];

// TODO: Implement the following functions
function addFilm() {
    alert("hi");

    let titleVal = nome.value;
    let durationVal = durata.value;
    let watch_dateVal = data.value;
    let cinemaVal = check.value;

    let film{
        title: titleVal,
        duration: durationVal,
        watch_date: watch_dateVal,
        cinema: cinemaVal
    }

    for(let i = 0; i < elencoFilm.length; i++){
        if(titleVal.toLowerCase() == elencoFilm[i].title){
            alert("film giè inserito");
        } else{
            elencoFilm.push(film);
        }
    }
}

function removeFilm() {
    for(let i = 0; i < elencoFilm.length; i++){
        if(titleVal.toLowerCase() == elencoFilm[i].title){
            elencoFilm.pop(i);
        }
    }
}

function clearFilms() {
    elencoFilm = [];
}

function displayFilms() {}
function getTotalWatchTime() {}
function getFilmsWatchedInCinema() {}

function saveFilmsToLocalStorage() {}
function loadFilmsFromLocalStorage() {}

function getAiRecommendedFilms() {}