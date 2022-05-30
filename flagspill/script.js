

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDprYkYwC07WmryT4ieXv4_kZ8LOArUhLg",
    authDomain: "no-suprises.firebaseapp.com",
    projectId: "no-suprises",
    storageBucket: "no-suprises.appspot.com",
    messagingSenderId: "696948589006",
    appId: "1:696948589006:web:06633b1d94a313f36b6b9f",
    measurementId: "G-EK9SV8SE7E"
};




let land = ["Afghanistan", "Albania", "Algerie", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belize", "Belgium", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Cocos (Keeling) Islands", "Colombia", "Costa Rica", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "DR Congo", "Ecuador", "Egypt", "El Salvador", "Eritrea", "Estonia", "Ethiopia", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kiribati", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Micronesia", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "North Korea", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Rebublic of the Congo", "Reunion", "Romania", "Russia", "Rwanda", "Saint Barthélemy", "Samoa", "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "South Africa", "South Korea", "Spain", "Sri Lanka", "Saint Kitts and Nevis", "St Vincent", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "USA", "Uzbekistan", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];


let boardEl = document.querySelector("#board") //deklarerer elementer jeg skal bruke
let btnEl = document.querySelector("#start")
let flagEl = document.querySelector(".t")
let imgEl = document.querySelector("img")
let scoreEl = document.querySelector("#score")
let bodyEl = document.querySelector("body")


let alt1El = document.querySelector("#one")
let alt2El = document.querySelector("#two")
let alt3El = document.querySelector("#three")
let alt4El = document.querySelector("#four")



btnEl.addEventListener("click", newFlag)




if (!localStorage.score) {
    localStorage.score = 0
}


let rndm = Math.floor(Math.random() * land.length - 1)
let rndm1 = Math.floor(Math.random() * land.length - 1)
let rndm2 = Math.floor(Math.random() * land.length - 1)
let rndm3 = Math.floor(Math.random() * land.length - 1)

let randomalts = [rndm, rndm1, rndm2, rndm3]

//option+shift+a for å kommentere flere linjer

function newFlag() {
    flagEl.innerHTML = `<img src="./flag/${land[rndm]}.png">`


    let shuffledArray2 = randomalts.sort((a, b, c, d) => 0.5 - Math.random());
    alt1El.innerText = `${land[randomalts[0]]}`
    alt2El.innerText = `${land[randomalts[1]]}`
    alt3El.innerText = `${land[randomalts[2]]}`
    alt4El.innerText = `${land[randomalts[3]]}`

    scoreEl.innerHTML = `<div id="score">
                                <h2> Score: ${localStorage.score} </h2>
                            </div>`

}



alt1El.addEventListener("click", checkAnswer1)
alt2El.addEventListener("click", checkAnswer2)
alt3El.addEventListener("click", checkAnswer3)
alt4El.addEventListener("click", checkAnswer4)

function changeFlag(e) {

    alt1El.addEventListener("click", checkAnswer1) //fjerner lytteret i hver "checkanswer" så må legge de til igjen
    alt2El.addEventListener("click", checkAnswer2) 
    alt3El.addEventListener("click", checkAnswer3)
    alt4El.addEventListener("click", checkAnswer4)

    land.splice(rndm, 1)
    let shuffledArray1 = land.sort((a, b, c, d) => 0.5 - Math.random());
    let shuffledArray2 = randomalts.sort((a, b, c, d) => 0.5 - Math.random()); //shuffler arrayet med svaralternativer så riktig alternativ kommer på forskjellige plasser hver gang

    flagEl.innerHTML = `<img src="./flag/${land[rndm]}.png">`

    alt1El.innerText = `${land[randomalts[0]]}` //fasitsvaret kommer på tilfeldig plass hver gang 
    alt2El.innerText = `${land[randomalts[1]]}`
    alt3El.innerText = `${land[randomalts[2]]}`
    alt4El.innerText = `${land[randomalts[3]]}`

    alt1El.style.backgroundColor = "#fff" //e= hendelseobjekt, e.target sier at det du trykker på, så skal style-> backgroundColor endres 
    alt2El.style.backgroundColor = "#fff"
    alt3El.style.backgroundColor = "#fff"
    alt4El.style.backgroundColor = "#fff"

    rounds += 1

    if (rounds > 24) {
        flagEl.innerHTML = `<p id="p1">Du fikk ${localStorage.score}/25 flagg riktig! </p>`


        scoreEl.innerHTML = `<div id="nyrunde"> Spille igjen? </div>`
        scoreEl.addEventListener("click", newFlag)
        scoreEl.style.backgroundColor = "#CC9C75"

        localStorage.score = 0 //sier at score og runder spilt skal nullstilles etter 25 runder aka et "game" er ferdig
        rounds = 0

    }

}


let rounds = 0

function checkAnswer1(e) {

    alt1El.removeEventListener("click", checkAnswer1)
    alt2El.removeEventListener("click", checkAnswer2)
    alt3El.removeEventListener("click", checkAnswer3)
    alt4El.removeEventListener("click", checkAnswer4)


    if (land[randomalts[0]] == land[rndm]) {

        console.log("yes")
        e.target.style.backgroundColor = "#00ff00" //e= hendelseobjekt, e.target sier at det du trykker på, så skal style-> backgroundColor endres
        localStorage.score = Number(localStorage.score) + 1
        scoreEl.innerHTML = `<div id="score">
                                <h2>Score: ${localStorage.score}/25 </h2>
                            </div>`

    }
    else {
        console.log("no")
        e.target.style.backgroundColor = "#ff0000"


    }
    let nesteEL = document.querySelector("#next")
    nesteEL.addEventListener("click", changeFlag)




}



function checkAnswer2(e) {

    alt1El.removeEventListener("click", checkAnswer1)
    alt2El.removeEventListener("click", checkAnswer2)
    alt3El.removeEventListener("click", checkAnswer3)
    alt4El.removeEventListener("click", checkAnswer4)

    if (land[randomalts[1]] == land[rndm]) {

        console.log("yes")
        e.target.style.backgroundColor = "#00ff00"
        localStorage.score = Number(localStorage.score) + 1
        scoreEl.innerHTML = `<div id="score">
                                <h2>Score: ${localStorage.score}/25 </h2>
                            </div>`



    }
    else {
        console.log("no")
        e.target.style.backgroundColor = "#ff0000"
    }

    let nesteEL = document.querySelector("#next")
    nesteEL.addEventListener("click", changeFlag)



}
function checkAnswer3(e) {

    alt1El.removeEventListener("click", checkAnswer1)
    alt2El.removeEventListener("click", checkAnswer2)
    alt3El.removeEventListener("click", checkAnswer3)
    alt4El.removeEventListener("click", checkAnswer4)

    if (land[randomalts[2]] == land[rndm] && localStorage.score < 25) {

        console.log("yes")
        e.target.style.backgroundColor = "#00ff00"
        localStorage.score = Number(localStorage.score) + 1
        scoreEl.innerHTML = `<div id="score">
                                <h2>Score: ${localStorage.score}/25 </h2>
                            </div>`


    }
    else {
        console.log("no")
        e.target.style.backgroundColor = "#ff0000"
    }

    let nesteEL = document.querySelector("#next")
    nesteEL.addEventListener("click", changeFlag)


}
function checkAnswer4(e) {

    alt1El.removeEventListener("click", checkAnswer1)
    alt2El.removeEventListener("click", checkAnswer2)
    alt3El.removeEventListener("click", checkAnswer3)
    alt4El.removeEventListener("click", checkAnswer4)
    
    if (land[randomalts[3]] == land[rndm]) {

        console.log("yes")
        e.target.style.backgroundColor = "#00ff00"
        localStorage.score = Number(localStorage.score) + 1
        scoreEl.innerHTML = `<div id="score">
                                <h2>Score: ${localStorage.score}/25 </h2>
                            </div>`

    }
    else {
        console.log("no")
        e.target.style.backgroundColor = "#ff0000"
    }

    let nesteEL = document.querySelector("#next")
    nesteEL.addEventListener("click", changeFlag)

}



//Firebase--------------------------------------------------------------------------------------------------------



let hovedEl = document.querySelector("#hoved")
let fornavnEl = document.querySelector("#fornavn")
let etternavnEl = document.querySelector("#etternavn") //etternavn = score
let epostEl = document.querySelector("#epost")

let registrerBtn = document.querySelector("#button")

registrerBtn.addEventListener("click", addUser)



function addUser() {

    db.collection(collectionName).add({
        fornavn: fornavnEl.value,
        etternavn: etternavnEl.value,

    })

    console.log("brukere ble lagt til i databsen")

    //tømmer inputfeltene
    fornavnEl.value = ""
    etternavnEl.value = "" 
    

    getUser()
}

function deleteUser(e) {
    let id = e.target.getAttribute("data-id")
    console.log(e.target)
    console.log(id)

    db.collection(collectionName).doc(id).delete()

    console.log("Brukeren ble sletta")

    // Henter brukeren på nytt
    getUser()
}




let collectionName = "brukere"

// Initialize Firebase
firebase.initializeApp(firebaseConfig); //skal være med hver gang

// Lager en referanse til databasen
let db = firebase.firestore();


//Ny bruker
function getUser() {
    // Henter data. Når dataene er ferdig hentet, starter "then"-biten
    db.collection(collectionName).orderBy("fornavn").get().then((snapshot) => { 
        // Henter ut dokumentene
        let dokumenter = snapshot.docs;

        // Skriver dokumentene til konsollen
        console.log(dokumenter);

        //Tømmer diven
        hovedEl.innerHTML = ""

        for (let i = 0; i < dokumenter.length; i++) {
            let data = dokumenter[i].data()

            // Henter id til dokumentet
            let id = dokumenter[i].id

            hovedEl.innerHTML += `<p> <h2> Bruker ${i + 1} </h2> </p>`
            hovedEl.innerHTML += `<p>Navn: ${data.fornavn} </p>`
            hovedEl.innerHTML += `<p>Score: ${data.etternavn}/25 </p>`



            //Knapp som sletter brukere
            hovedEl.innerHTML += `<button data-id="${id}" class="slett"> Slett bruker </button>`
            hovedEl.innerHTML += `<p> <br> </p>`
        }
        // Henter slettknappen fra DOM 
        let slettBtns = document.querySelectorAll(".slett")

        // Legger til lytter tul hver slett-knapp
        for (let i = 0; i < slettBtns.length; i++) {
            slettBtns[i].addEventListener("click", deleteUser)
        }
    });

}

//Kaller funkjsonen som henter brukerne fra databasen

getUser()




