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
let btn1 = document.getElementById("myBtn1");
let btn2 = document.getElementById("myBtn2");

let elencoFilm = [];

btn1.addEventListener("click", removeFilm);
btn2.addEventListener("click", clearFilms);

// TODO: Implement the following functions
function addFilm() {
    alert("hi");

    let titleVal = nome.value;
    let durationVal = durata.value;
    let watch_dateVal = data.value;
    let cinemaVal = check.value;

    let film = {
        title: titleVal,
        duration: durationVal,
        watch_date: watch_dateVal,
        cinema: cinemaVal
    };

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