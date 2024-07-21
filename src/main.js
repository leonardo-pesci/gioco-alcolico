//^========================================================================
//^                            ELEMENTI
//^========================================================================

// * Sections
const header = document.querySelector('#header')
const home = document.querySelector('#home')
const settings = document.querySelector('#settings')
const mode = document.querySelector('#mode')
const typeSelector = document.querySelector('#typeSelector')
const guide = document.querySelector('#guide')
const placeHolder = document.querySelector('#placeHolder')
const extractionTemplate = document.querySelector('#extractionTemplate')
const gameFinishedTemplate = document.querySelector('#gameFinished')

// * Buttons
const startButton = document.querySelector('#startButton')
const addButton = document.querySelector('#add')
const confirmButton = document.querySelector('#confirm')
const guideBtn = document.querySelector('#guideBtn')
const editBtn = document.querySelector('#editBtn')
const playAgain = document.querySelector('#playAgain')
const modeElements = document.querySelectorAll('.modeElement')

let playerInput = document.querySelector('#playerInput')
const card = document.querySelector('.card')
const playersDisplay = document.querySelector('.playersDisplay')
const languages = document.querySelectorAll('.language')





//^========================================================================
//^                            VARIABILI
//^========================================================================
let conteggioK = 4
let index = 1
let started = false
let memory = ''
let langSelected = 'italiano'
const langStorage = localStorage.getItem('language')
if (langStorage) langSelected = JSON.parse(langStorage)
const lastLanguageElement = document.querySelector('#' + langSelected)
let gameStared = false

let types = [
    'sorsa',
    'voto',
    'scelta',
    'regola',
    'hai mai',
    'categoria',
    'ruolo',
    'gioco di parole',
    'gioco',
    'specchio',
    'sfida',
    'linguaggio',
    'duello',
    'storia',
    'quanto te la rischi',
    'obbligo',
    'verità',
    'coppa',
]

let modes = [
    'classic',
    'hard',
    'free',
    'hot',
    'cup',
    'custom',
]

let players = []

let cards = {

    'ita': {
        standard : {
            '001': 'il giocatore X beve due sorse',
            '002': 'tutte le ragazze bevono',
        },
        categoria: {
            '001': 'posti in cui non sarebbe carino tirare fuori il cazzo'
        }
    },
    
    'eng': {
        standard : {
            '001': 'player X has to drink two sips',
            '002': 'every girl has to drink',
        },
        category: {
            '001': "places where it wuoldn't be nice to show your dick"
        }
    }
}



//^========================================================================
//^                            FUNZIONI
//^========================================================================

//* Funzioni evento
let goSettings = () => {
    home.classList.add('hidden')
    header.classList.remove('hidden')
    settings.classList.remove('hidden')
}

let goMode = () => {
    // completa la lista
    const listElements = document.querySelectorAll('.listElementText')
    
    listElements.forEach( (player) => {
        players.push(player.innerText)
    })
    
    if(playerInput.value != '') players.push(playerInput.value)

    // cambia sezione
    settings.classList.add('hidden')
    mode.classList.remove('hidden')
}

let reGame = () => {
    window.location.reload()
}

let setGame = () => {
    
    if(started === false){
        // nascondiamo la home
        document.body.classList.add('gameStarted')
    }else{
        placeHolder.innerHTML=''
        numMazzi.classList.add('hidden')
        buttons.classList.add('hidden')
    }
    
    // mostriamo la schermata dei giocatori
    menu.classList.remove('hidden')
}

let setExtraction = () => {
    // svuotiamo il placeholder
    placeHolder.innerHTML = null

    // mostriamo il loader
    loading.classList.remove('hidden')

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
        playersList = ['']
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

let showExtraction = (card, description, ind) => {
    // cloniamo il template
    const extractionElement = extractionTemplate.content.cloneNode(true)

    //
    console.log(card)

    // lo compiliamo
    extractionElement.querySelector('.conteggioKText').innerHTML = `${conteggioK}K`
    

    extractionElement.querySelector('.cardImage').innerHTML = image
    extractionElement.querySelector('.extractionText').innerText = description
    extractionElement.querySelector('.playerName').innerText = playersList[ind]



    // apertura guida
    const questionMark = extractionElement.querySelector('.questionMark')
    const contK = extractionElement.querySelector('.conteggioK')
    
    questionMark.addEventListener('click', function(){
        const guide = document.querySelector('.guide')

        guide.classList.remove('hidden')
        questionMark.classList.add('hidden')
        edit.classList.add('hidden')
        contK.classList.add('hidden')

        // chiusura guida
        const exit = document.querySelector('.exit')
        exit.addEventListener('click', function(){
            guide.classList.add('hidden')
            questionMark.classList.remove('hidden')
            edit.classList.remove('hidden')
            contK.classList.remove('hidden')
        })
    })

    // apertura edit
    const edit = extractionElement.querySelector('.edit')
    const editPage = document.querySelector('.editPage')
    edit.addEventListener('click', function(){
        editPage.classList.remove('hidden')
        questionMark.classList.add('hidden')
        edit.classList.add('hidden')
        contK.classList.add('hidden')

        // chiusura edit
        const exitEdit = document.querySelector('.exitEdit')
        exitEdit.addEventListener('click', function(){
            editPage.classList.add('hidden')
            questionMark.classList.remove('hidden')
            edit.classList.remove('hidden')
            contK.classList.remove('hidden')
        })
    })

    // nascondiamo il loader
    loading.classList.add('hidden')

    // mostriamo il template
    placeHolder.appendChild(extractionElement)

    // copiamo il placeHolder
    memory = placeHolder.innerHTML

    // mostriamo il pulsante next
    const nextButton = document.querySelector('.next')

    nextButton.addEventListener('click', function(){
        setExtraction()
    })

    setConteggio()
}

let showCard = () => {
    response = selectedLanguage.selectedCategory.selectedId

    return response
}

//* Random functions
let getRandomPlayer = (playersList) => {
    // estraiamo un numero a caso
    randomIndex = Math.floor(Math.random() * playersList.length)

    // estraiamo il giocatore corrispondente
    return randomIndex
}

let getRandomCard = () => {
    // estraiamo un numero a caso
    randomIndex = Math.floor(Math.random() * mazzo.length)

    // estraiamo la carta corrispondente
    const randomCard = mazzo[randomIndex]

    // rimuoviamo la carta dal mazzo
    mazzo.splice(randomIndex, 1)
    return randomCard
}



//* End game
let setGameFinished = () => {
    // cloniamo il template
    const gameFinishedElement = gameFinishedTemplate.content.cloneNode(true)

    gameFinishedElement.querySelector('.title').innerText = response

    // nascondiamo il loader
    loading.classList.add('hidden')

    // rimpiazziamo il placeHolder
    placeHolder.innerHTML = null
    placeHolder.appendChild(gameFinishedElement)
}


/*
// estraiamo un giocatore casuale
    ind = getRandomPlayer(playersList)
    firstPlayer = players[ind]

    if(started === false){
        if(numeroMazzi==2){
            mazzo = mazzo.concat(secondoMazzo)
            conteggio = 100
        }else{
            conteggio = 52
        }

        // procediamo con la prima estrazione
        if(started === false){
            setExtraction()
        }else{
            console.log(memory)
            placeHolder.innerHTML = memory

            const memory = memory.cloneNode(true)
            
            // apertura guida
            const questionMark = memory.querySelector('.questionMark')
            const contK = memory.querySelector('.conteggioK')
            
            questionMark.addEventListener('click', () => {
                const guide = document.querySelector('.guide')

                guide.classList.remove('hidden')
                questionMark.classList.add('hidden')
                edit.classList.add('hidden')
                contK.classList.add('hidden')

                // chiusura guida
                const exit = document.querySelector('.exit')
                exit.addEventListener('click', function(){
                    guide.classList.add('hidden')
                    questionMark.classList.remove('hidden')
                    edit.classList.remove('hidden')
                    contK.classList.remove('hidden')
                })
            })

            // apertura edit
            const edit = memory.querySelector('.edit')
            edit.addEventListener('click', function(){
                setGame()
            })
        }
        */



//^========================================================================
//^                              EVENTI
//^========================================================================
startButton.addEventListener('click', goSettings)
goSettings() //!
goMode() //!


addButton.addEventListener('click', () => {

    if(playerInput.value != ''){
        playersDisplay.innerHTML+=`<div class='listElement' id='a${index}'><span class="listElementText">${playerInput.value}</span><div class='cross' data-num='${index}'>✗</div></div>`
    }
    playerInput.value = ''
    index += 1

    const cross = document.querySelectorAll('.cross')
    
    cross.forEach( (element) => {
        element.addEventListener('click', () => {

            let el = document.querySelector(`#a${element.dataset.num}`)
            el.remove()

        })   
    })
})


confirmButton.addEventListener('click', goMode)

languages.forEach( (lang) => {
    lang.addEventListener('click', () => {
        let name = lang.id
        console.log(name)

        languages.forEach( (lang) => {
            lang.classList.remove('selected')
        })

        langSelected = name
        lang.classList.add('selected')
        localStorage.setItem('language', JSON.stringify(langSelected))
    })
})

playAgain.addEventListener('click', reGame)


// todo descrizioni lingue
// todo edit