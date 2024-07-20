/**========================================================================
 **                            ELEMENTI
 *========================================================================**/
const loading = document.querySelector(".loading")
const card = document.querySelector(".card")
const placeHolder = document.querySelector("#placeHolder")
const extractionTemplate = document.querySelector(".extractionTemplate")
const gameFinishedTemplate = document.querySelector(".gameFinishedTemplate")
const startButton = document.querySelector(".startButton")
const addButton = document.querySelector(".add")
const confirmButton = document.querySelector(".confirm")
const errorMessage = document.querySelector(".errorMessage")
const menu = document.querySelector(".menu")

const buttons = document.querySelector(".buttons")
const unoButton = document.querySelector(".unoButton")
const dueButton = document.querySelector(".dueButton")
const list = document.querySelector(".list")


// lingue
const italiano = document.querySelector(".italiano")
const inglese = document.querySelector(".inglese")
const spagnolo = document.querySelector(".spagnolo")
const romano = document.querySelector(".romano")
const napoletano = document.querySelector(".napoletano")

const questionMark = document.querySelector(".questionMark")


let langSelected = "italiano"
const langStorage = localStorage.getItem('language')
if (langStorage) langSelected = JSON.parse(langStorage)
const lastLanguageElement = document.querySelector('#' + langSelected)




/**========================================================================
 **                            VARIABILI
 *========================================================================**/
let conteggioK = 4
let index = 1
let started = false
let memory = ""

let type = [
    "sorsa",
    "voto",
    "scelta",
    "regola",
    "hai mai",
    "categoria",
    "ruolo",
    "gioco di parole",
    "gioco",
    "specchio",
    "sfida",
    "linguaggio",
    "duello",
    "storia",
    "quanto te la rischi",
    "obbligo",
    "verità",
    "coppa",
]

let mode = [
    "classic",
    "hard",
    "free",
    "hot",
    "cup",
    "custom",
]
    
let playersList = []



/**========================================================================
 **                            EVENTI
 *========================================================================**/
startButton.addEventListener("click", function(){
    setGame()
})


addButton.addEventListener("click", function(){
    let player = document.querySelector(".player")

    if(player.value != ""){
        playersList.push(player.value)
        list.innerHTML+=`<div class="listElement" id="a${index}">${player.value}<div class="cross" data-num="${index}">✗</div></div>`
    }
    player.value = ""
    index += 1

    const cross = document.querySelectorAll(".cross")
    cross.forEach(function(element){
        element.addEventListener("click", function(){
            play = playersList[element.dataset.num - 1]
            listElements = document.querySelectorAll(".listElement")
            el = document.getElementById(`a${element.dataset.num}`)
            el.remove()

            for(var i = 0; i < playersList.length; i++){ 
                if ( playersList[i] === playersList[element.dataset.num - 1]) {
                  playersList.splice(i, 1); 
                }
             }
        })   
    })
})
confirmButton.addEventListener("click", function(){
    // messaggio di errore
    let player = document.querySelector(".player")
    if(player.value != ""){
        setErrorMessage()
    }else{
        errorMessage.classList.add("hidden")

        console.log(playersList)
        // nascondiamo il menu
        menu.classList.add("hidden")

        // estraiamo un giocatore casuale
        ind = getRandomPlayer(playersList)
        firstPlayer = playersList[ind]

        if(started === false){
            if(numeroMazzi==2){
                mazzo = mazzo.concat(secondoMazzo)
                conteggio = 100
            }else{
                conteggio = 52
            }
        }

        // procediamo con la prima estrazione
        if(started === false){
            setExtraction()
        }else{
            console.log(memory)
            placeHolder.innerHTML = memory

            const memory = memory.cloneNode(true)
            
            // apertura guida
            const questionMark = memory.querySelector(".questionMark")
            const contK = memory.querySelector(".conteggioK")
            
            questionMark.addEventListener("click", function(){
                const guide = document.querySelector(".guide")

                guide.classList.remove("hidden")
                questionMark.classList.add("hidden")
                edit.classList.add("hidden")
                contK.classList.add("hidden")

                // chiusura guida
                const exit = document.querySelector(".exit")
                exit.addEventListener("click", function(){
                    guide.classList.add("hidden")
                    questionMark.classList.remove("hidden")
                    edit.classList.remove("hidden")
                    contK.classList.remove("hidden")
                })
            })

            // apertura edit
            const edit = memory.querySelector(".edit")
            edit.addEventListener("click", function(){
                setGame()
            })
        }

        started = true
    }
})
italiano.addEventListener("click", function(){
    langSelected = "italiano"

    italiano.classList.add("selected")
    inglese.classList.remove("selected")
    spagnolo.classList.remove("selected")
    romano.classList.remove("selected")
    napoletano.classList.remove("selected")
})
inglese.addEventListener("click", function(){
    langSelected = "inglese"

    inglese.classList.add("selected")
    italiano.classList.remove("selected")
    spagnolo.classList.remove("selected")
    romano.classList.remove("selected")
    napoletano.classList.remove("selected")
})
spagnolo.addEventListener("click", function(){
    langSelected = "spagnolo"

    spagnolo.classList.add("selected")
    inglese.classList.remove("selected")
    italiano.classList.remove("selected")
    romano.classList.remove("selected")
    napoletano.classList.remove("selected")
})
romano.addEventListener("click", function(){
    langSelected = "romano"

    romano.classList.add("selected")
    inglese.classList.remove("selected")
    spagnolo.classList.remove("selected")
    italiano.classList.remove("selected")
    napoletano.classList.remove("selected")
})
napoletano.addEventListener("click", function(){
    langSelected = "napoletano"

    napoletano.classList.add("selected")
    inglese.classList.remove("selected")
    spagnolo.classList.remove("selected")
    romano.classList.remove("selected")
    italiano.classList.remove("selected")
})



/**========================================================================
 **                            FUNZIONI
 *========================================================================**/
function setGame(){
    
    if(started === false){
        // nascondiamo la home
        document.body.classList.add("gameStarted")
    }else{
        placeHolder.innerHTML=""
        numMazzi.classList.add("hidden")
        buttons.classList.add("hidden")
    }
    
    // mostriamo la schermata dei giocatori
    menu.classList.remove("hidden")
}

function setExtraction(){
    // svuotiamo il placeholder
    placeHolder.innerHTML = null

    // mostriamo il loader
    loading.classList.remove("hidden")

    // estraiamo una carta
    let card = getRandomCard()
    let description = setExtractionResponse(card)

    if(playersList.length != 0){
        if(ind == playersList.length - 1){
            ind = 0
        }else{
            ind += 1
        }
    }else{
        playersList = [""]
    }

    if(conteggioK == 0){
        // mostriamo la schermata finale
        setGameFinished(card)
    }else{
        // mostriamo la carta
        setTimeout(function(){
            showExtraction(card, description, ind)
        },500)
    }
}

function showExtraction(card, description, ind){
    // cloniamo il template
    const extractionElement = extractionTemplate.content.cloneNode(true)

    //
    console.log(card)

    // lo compiliamo
    extractionElement.querySelector(".conteggioKText").innerHTML = `${conteggioK}K`
    

    extractionElement.querySelector(".cardImage").innerHTML = image
    extractionElement.querySelector(".extractionText").innerText = description
    extractionElement.querySelector(".playerName").innerText = playersList[ind]



    // apertura guida
    const questionMark = extractionElement.querySelector(".questionMark")
    const contK = extractionElement.querySelector(".conteggioK")
    
    questionMark.addEventListener("click", function(){
        const guide = document.querySelector(".guide")

        guide.classList.remove("hidden")
        questionMark.classList.add("hidden")
        edit.classList.add("hidden")
        contK.classList.add("hidden")

        // chiusura guida
        const exit = document.querySelector(".exit")
        exit.addEventListener("click", function(){
            guide.classList.add("hidden")
            questionMark.classList.remove("hidden")
            edit.classList.remove("hidden")
            contK.classList.remove("hidden")
        })
    })

    // apertura edit
    const edit = extractionElement.querySelector(".edit")
    const editPage = document.querySelector(".editPage")
    edit.addEventListener("click", function(){
        editPage.classList.remove("hidden")
        questionMark.classList.add("hidden")
        edit.classList.add("hidden")
        contK.classList.add("hidden")

        // chiusura edit
        const exitEdit = document.querySelector(".exitEdit")
        exitEdit.addEventListener("click", function(){
            editPage.classList.add("hidden")
            questionMark.classList.remove("hidden")
            edit.classList.remove("hidden")
            contK.classList.remove("hidden")
        })
    })

    // nascondiamo il loader
    loading.classList.add("hidden")

    // mostriamo il template
    placeHolder.appendChild(extractionElement)

    // copiamo il placeHolder
    memory = placeHolder.innerHTML

    // mostriamo il pulsante next
    const nextButton = document.querySelector(".next")

    nextButton.addEventListener("click", function(){
        setExtraction()
    })

    setConteggio()
}

function setExtractionResponse(card){

    // carta
    if(langSelected=="italiano"){
        if(card.includes("asso")){
            response = "catena"
        }else if(card.includes("due")){
            response = "distribuisci due penalità"
        }else if(card.includes("tre")){
            response = "bevi due penalità"
        }else if(card.includes("quattro")){
            response = "distribuisci due penalità e bevine due"
        }else if(card.includes("cinque")){
            response = "bevono tutti i ragazzi"
        }else if(card.includes("sei")){
            response = "bevono tutte le ragazze"
        }else if(card.includes("sette")){
            response = "re dei pollici"
        }else if(card.includes("otto")){
            response = "SPECCHIO"
        }else if(card.includes("nove")){
            response = "rima"
        }else if(card.includes("dieci")){
            response = "bevono tutti"
        }else if(card.includes("jack")){
            response = "regola"
        }else if(card.includes("regina")){
            response = "categoria"
        }else if(card.includes("re")){
            conteggioK -= 1
            response = "versa il bicchiere nella coppa"
        }

        // compilo la guida
        const guideBox = document.querySelector(".guideBox")
        guideBox.innerHTML=`
        <span class="cardGuide">Catena: quando il giocatore che pesca l'asso comincia a bere, quello alla sua sinistra comincia e così via; viceversa, quando il primo giocatore smette di bere, quello alla sinistra fa lo stesso e così via.</span>
        <span class="cardGuide">Re dei pollici: il giocatore che ha pescato la carta diventa il re dei pollici: ogni volta che metterà il pollice sul tavolo, gli altri dovranno fare lo stesso; l'ultimo a farlo beve.</span>
        <span class="cardGuide">Specchio: il giocatore che pesca la carta deve sceglierne un altro per il resto della partita, in modo tale che quando uno beve l'altro farà lo stesso e viceversa.</span>
        <span class="cardGuide">Rima: chi pesca la carta deve dire una parola, a turno ognuno dirà una parola che fa rima con la prima nominata, chi non la trova o ne ripete una già detta beve.</span>
        <span class="cardGuide">Regola: chi pesca la carta deve inventare una regola, ogni volta che qualcuno la infrangerà, dovrà bere.</span>
        <span class="cardGuide">Categoria: chi pesca la carta deve scegliere una categoria, a turno ognuno dirà una parola che rientra nella categoria scelta, chi non la trova o ne ripete una già detta beve.</span>
        `
    }

    return response
}



function setErrorMessage(){
    errorMessage.classList.remove("hidden")
}



//* Random functions
function getRandomPlayer(playersList){
    // estraiamo un numero a caso
    randomIndex = Math.floor(Math.random() * playersList.length)

    // estraiamo il giocatore corrispondente
    return randomIndex
}

function getRandomCard(){
    // estraiamo un numero a caso
    randomIndex = Math.floor(Math.random() * mazzo.length)

    // estraiamo la carta corrispondente
    const randomCard = mazzo[randomIndex]

    // rimuoviamo la carta dal mazzo
    mazzo.splice(randomIndex, 1)
    return randomCard
}



//* End game
function setGameFinished(){
    // cloniamo il template
    const gameFinishedElement = gameFinishedTemplate.content.cloneNode(true)

    gameFinishedElement.querySelector(".title").innerText = response

    // nascondiamo il loader
    loading.classList.add("hidden")

    // rimpiazziamo il placeHolder
    placeHolder.innerHTML = null
    placeHolder.appendChild(gameFinishedElement)

    // rigioca
    const rigioca = document.querySelector(".rigioca")
    rigioca.addEventListener("click", function(){
        reGame()
    })
}

function reGame(){
    window.location.reload()
}


//! gestione lingue
languages.forEach( (lang) => {
    lang.addEventListener('click', () => {
        let name = lang.id

        languages.forEach( (lang) => {
            lang.classList.remove('selected')
        })

        langSelected = name
        lang.classList.add('selected')
        localStorage.setItem('language', JSON.stringify(langSelected))
    })
})

let selectLanguage = () => {
    let lowerItem = item.toLowerCase()
    
    mainSections.forEach( (section) => {
        section.classList.add('hidden')
    })

    setLastSection(item)

    const section = document.querySelector(`#${lowerItem}`)
    section.classList.remove('hidden')
}








// todo descrizioni lingue
// todo edit