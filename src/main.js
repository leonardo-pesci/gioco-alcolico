//^========================================================================
//^                            ELEMENTI
//^========================================================================

// * Sections
const header = document.querySelector('#header')
const home = document.querySelector('#home')
const settings = document.querySelector('#settings')
const mode = document.querySelector('#mode')
const typeSelector = document.querySelector('#typeSelector')
const placeHolder = document.querySelector('#placeHolder')
const extractionTemplate = document.querySelector('#extractionTemplate')
const gameFinishedTemplate = document.querySelector('#gameFinished')

// * Buttons
const startBtn = document.querySelector('#startBtn')
const addBtn = document.querySelector('#add')
const confirmBtn = document.querySelector('#confirm')
const playAgainBtn = document.querySelector('#playAgainBtn')
const modeElements = document.querySelectorAll('.modeElement')

let playerInput = document.querySelector('#playerInput')
const card = document.querySelector('.card')
const playersDisplay = document.querySelector('.playersDisplay')
const languages = document.querySelectorAll('.language')



//^========================================================================
//^                            VARIABILI
//^========================================================================
let conteggioK = 4
let started = false
let memory = ''
let langSelected = 'ita'
let modeSelected = 'standard'
const langStorage = localStorage.getItem('language')
if (langStorage) langSelected = JSON.parse(langStorage)
const lastLanguageElement = document.querySelector('#' + langSelected)
let gameStarted = false
let index = 0
let history = []
let historyLength = 6 //!

let types = [
    'sorsa',
    'voto',
    'scelta',
    'regola',
    'haimai',
    'categoria',
    'ruolo',
    'rima',
    'gioco',
    'mimo',
    'specchio',
    'sfida',
    'linguaggio',
    'duello',
    'storia',
    'quantotelarischi',
    'obbligo',
    'verità',
    'coppa',
    'missionesegreta',
]

let modes = [
    'classica',
    'difficile',
    'hot',
    'creativa',
    'coppa',
    'personalizzata',
]

let players = []

let cards = {
    ita: {
        sorsa: {
            name: 'sorsa',
            description: '',
            list: [
                '{player1} beve due sorse',
                'Tutte le ragazze bevono',
                'Tutti i ragazzi bevono',
                'Tutti bevono',
            ],
        },
        
        voto: {
            name: 'voto',
            description: '',
            list: [
                'Votate {voto}, riceverà 3 sorse'
            ],
        },
        
        scelta: {
            name: 'scelta',
            description: '',
            list: [
                'Preferireste {scelta}? Votate insieme, il gruppo in minoranza beve 2 sorse',
                ''
            ],
        },
        
        regola: {
            name: 'regola',
            description: '',
            list: [
                "Inventa una regola",
                "D'ora in poi, gli altri dovranno riferirsi a voi con il nome della persona alla vostra destra"
            ],
        },
        
        haimai: {
            name: 'hai mai',
            description: '',
            list: [
                "Hai mai... inventa tu, chi l'ha fatto beve due sorse",
                'Due sorse per tutti quelli che hanno chiamato la maestra "mamma"',
                'Bevi una sorsa se hai avuto esperienze con persone del tuo stesso sesso',
            ],
        },
        
        categoria: {
            name: 'categoria',
            description: '',
            list: [
                'Inventa una categoria',
                'Posti in cui non sarebbe carino tirare fuori il cazzo',
            ],
        },
        
        ruolo: {
            name: 'ruolo',
            description: '',
            list: [
                'Inventa un nuovo ruolo',
                "{player1}, sei il re dei pollici: tutte le volte che vorrai, potrai mettere il pollice sul tavolo e gli altri dovranno seguirti. L'ultimo che lo farà, dovrà bere un sorso"
            ],
        },
        
        rima: {
            name: 'rima',
            description: '',
            list: [
                'Rima con... (scegli tu la parola)',
                'Rima con {rima}',
            ],
        },
        
        gioco: {
            name: 'gioco',
            description: '',
            list: [
                "A turno, ogni giocatore dice una parola; quello dopo la ripete e ne aggiunge un'altra e così per ogni giocatore. Chi sbaglia beve 3 sorse. Inizia {player1}"
            ],
        },
        
        mimo: {
            name: 'mimo',
            description: '',
            list: [
                "{player1}, mima qualcosa",
            ],
        },
        
        specchio: {
            name: 'specchio',
            description: '',
            list: [
                '{player1}, scegli una persona con cui specchiarti',
                '{player1}, sei specchiato con {player2}',
            ],
        },
        
        sfida: {
            name: 'sfida',
            description: '',
            list: [
                '{player1}, {sfida}',
            ],
        },
        
        linguaggio: {
            name: 'linguaggio',
            description: '',
            list: [
                'Siete in Russia'
            ],
        },
        
        duello: {
            name: 'duello',
            description: '',
            list: [
                'Duello tra {player1} e {player2}: {duello}',
            ],
        },
        
        storia: {
            name: 'storia',
            description: '',
            list: [
                '{player1}, racconta una storia, vera o inventata: alla fine gli altri giocatori daranno un giudizio positivo o negativo, bevi un sorso per ogni giudizio negativo',
            ],
        },
        
        quantotelarischi: {
            name: 'quanto te la rischi',
            description: '',
            list: [
                'Quanto te la rischi da 1 a 20 di {quantotelarischi}'
            ],
        },
        
        obbligo: {
            name: 'obbligo',
            description: '',
            list: [
                '{player1}, bacia {player2}'
            ],
        },
        
        verità: {
            name: 'verità',
            description: '',
            list: [
                '{player1}, {verità}'
            ],
        },
        
        coppa: {
            name: 'coppa',
            description: '',
            list: [
                '{player1}, versa il contenuto del tuo bicchiere nella coppa',
                '{player1}, versa il contenuto del tuo bicchiere nella coppa',
                '{player1}, versa il contenuto del tuo bicchiere nella coppa',
                '{player1}, bevi tutto il contenuto della coppa'
            ],
        },

        missionesegreta: {
            name: 'missionesegreta',
            description: '',
            list: [
                'NON LEGGERE AD ALTA VOCE: la tua missione segreta è {missionesegreta}. Se ci riesci, hai diritto a scegliere un giocatore che deve farsi il bicchiere a goccia'
            ],
        },

        variabili: {
            voto: [
                'il più bello',
                'chi verrà arrestato più probabilmente',
            ],
            
            scelta: [
                'essere invisibili o teletrasportarvi',
            ],
            
            rima: [
                'palazzo',
                'bronzo',
                'biga',
                'tana',
            ],

            sfida: [
                'fai 20 piegamenti o bevi 5 sorse'
            ],
            
            quantotelarischi: [
                'bere il bicchiere a goccia'
            ],

            verità: [
                'chi ti faresti dei presenti?',
            ],

            missionesegreta: [
                'versare lo stesso alcolico in tutti i bicchieri del tavolo'
            ]
        },
    },
    
    eng: {
        sorsa: {
            name: 'sip',
            description: '',
            list: [
                '{player1} has to drink two sips',
                'every girl has to drink',
            ],
        },
        
        voto: {
            name: 'vote',
            description: '',
            list: [],
        },
        
        scelta: {
            name: 'choice',
            description: '',
            list: [],
        },
        
        regola: {
            name: 'rule',
            description: '',
            list: [],
        },
        
        haimai: {
            name: 'never have I ever',
            description: '',
            list: [],
        },
        
        categoria: {
            name: 'category',
            description: '',
            list: [
                "places where it wouldn't be nice to show your dick",
            ],
        },
        
        ruolo: {
            name: 'role',
            description: '',
            list: [],
        },
        
        rima: {
            name: 'rhyme',
            description: '',
            list: [
                'ball',
                'call',
                'stall',
                'mall',
            ],
        },
        
        gioco: {
            name: 'game',
            description: '',
            list: [],
        },
        
        specchio: {
            name: 'mirror',
            description: '',
            list: [],
        },
        
        sfida: {
            name: 'challenge',
            description: '',
            list: [],
        },
        
        linguaggio: {
            name: 'language',
            description: '',
            list: [],
        },
        
        duello: {
            name: 'duel',
            description: '',
            list: [],
        },
        
        storia: {
            name: 'story',
            description: '',
            list: [],
        },
        
        quantotelarischi: {
            name: 'how much you risk it',
            description: '',
            list: [],
        },
        
        obbligo: {
            name: 'dare',
            description: '',
            list: [],
        },
        
        verità: {
            name: 'truth',
            description: '',
            list: [],
        },
        
        coppa: {
            name: 'cup',
            description: '',
            list: [],
        },
        
        variabili: {
            voto: [],
            
            scelta: [],
            
            haimai: [],
            
            categoria: [],
            
            rima: [
                'ball',
                'call',
                'stall',
                'mall',
            ],
            
            quantotelarischi: [],
        },
    },
    
    spa: {
        sorsa: {
            name: 'sorbo',
            description: '',
            list: [
                '{player1} bebe dos sorbos',
                'todas las chicas beben',
            ],
        },
        
        voto: {
            name: 'voto',
            description: '',
            list: [],
        },
        
        scelta: {
            name: 'elección',
            description: '',
            list: [],
        },
        
        regola: {
            name: 'regla',
            description: '',
            list: [],
        },
        
        haimai: {
            name: 'yo nunca',
            description: '',
            list: [],
        },
        
        categoria: {
            name: 'categoría',
            description: '',
            list: [
                'lugares donde no sería agradable mostrar tu pene',
            ],
        },
        
        ruolo: {
            name: 'rol',
            description: '',
            list: [],
        },
        
        rima: {
            name: 'rima',
            description: '',
            list: [
                'bola',
                'cola',
                'olla',
                'silla',
            ],
        },
        
        gioco: {
            name: 'juego',
            description: '',
            list: [],
        },
        
        specchio: {
            name: 'espejo',
            description: '',
            list: [],
        },
        
        sfida: {
            name: 'desafío',
            description: '',
            list: [],
        },
        
        linguaggio: {
            name: 'lenguaje',
            description: '',
            list: [],
        },
        
        duello: {
            name: 'duelo',
            description: '',
            list: [],
        },
        
        storia: {
            name: 'historia',
            description: '',
            list: [],
        },
        
        quantotelarischi: {
            name: 'cuánto te arriesgas',
            description: '',
            list: [],
        },
        
        obbligo: {
            name: 'obligación',
            description: '',
            list: [],
        },
        
        verità: {
            name: 'verdad',
            description: '',
            list: [],
        },
        
        coppa: {
            name: 'copa',
            description: '',
            list: [],
        },
        
        variabili: {
            voto: [],
            
            scelta: [],
            
            haimai: [],
            
            categoria: [],
            
            rima: [
                'bola',
                'cola',
                'olla',
                'silla',
            ],
            
            quantotelarischi: [],
        },
    },
    
    rom: {
        sorsa: {
            name: 'sorso',
            description: '',
            list: [
                '{player1} beve due sorsi',
                'tutte le ragazze bevono',
            ],
        },
        
        voto: {
            name: 'voto',
            description: '',
            list: [],
        },
        
        scelta: {
            name: 'scelta',
            description: '',
            list: [],
        },
        
        regola: {
            name: 'regola',
            description: '',
            list: [],
        },
        
        haimai: {
            name: 'mai fatto',
            description: '',
            list: [],
        },
        
        categoria: {
            name: 'categoria',
            description: '',
            list: [
                'posti dove nun sarebbe carino tirà fori er cazzo',
            ],
        },
        
        ruolo: {
            name: 'ruolo',
            description: '',
            list: [],
        },
        
        rima: {
            name: 'rima',
            description: '',
            list: [
                'palla',
                'gallo',
                'ballo',
                'stallo',
            ],
        },
        
        gioco: {
            name: 'gioco',
            description: '',
            list: [],
        },
        
        specchio: {
            name: 'specchio',
            description: '',
            list: [],
        },
        
        sfida: {
            name: 'sfida',
            description: '',
            list: [],
        },
        
        linguaggio: {
            name: 'linguaggio',
            description: '',
            list: [],
        },
        
        duello: {
            name: 'duello',
            description: '',
            list: [],
        },
        
        storia: {
            name: 'storia',
            description: '',
            list: [],
        },
        
        quantotelarischi: {
            name: 'quanto te rischi',
            description: '',
            list: [],
        },
        
        obbligo: {
            name: 'obbligo',
            description: '',
            list: [],
        },
        
        verità: {
            name: 'verità',
            description: '',
            list: [],
        },
        
        coppa: {
            name: 'coppa',
            description: '',
            list: [],
        },
        
        variabili: {
            voto: [],
            
            scelta: [],
            
            haimai: [],
            
            categoria: [],
            
            rima: [
                'palla',
                'gallo',
                'ballo',
                'stallo',
            ],
            
            quantotelarischi: [],
        },
    },
    
    nap: {
        sorsa: {
            name: 'sorsa',
            description: '',
            list: [
                '{player1} beve doje sorsi',
                'tutte e’ femmene bevono',
            ],
        },
        
        voto: {
            name: 'voto',
            description: '',
            list: [],
        },
        
        scelta: {
            name: 'scelta',
            description: '',
            list: [],
        },
        
        regola: {
            name: 'regola',
            description: '',
            list: [],
        },
        
        haimai: {
            name: 'mai fatto',
            description: '',
            list: [],
        },
        
        categoria: {
            name: 'categoria',
            description: '',
            list: [
                'posti addò nun sarebbe buono tirà fora o cazzo',
            ],
        },
        
        ruolo: {
            name: 'ruolo',
            description: '',
            list: [],
        },
        
        rima: {
            name: 'rima',
            description: '',
            list: [
                'palla',
                'gallo',
                'ballo',
                'stallo',
            ],
        },
        
        gioco: {
            name: 'gioco',
            description: '',
            list: [],
        },
        
        specchio: {
            name: 'specchio',
            description: '',
            list: [],
        },
        
        sfida: {
            name: 'sfida',
            description: '',
            list: [],
        },
        
        linguaggio: {
            name: 'linguaggio',
            description: '',
            list: [],
        },
        
        duello: {
            name: 'duello',
            description: '',
            list: [],
        },
        
        storia: {
            name: 'storia',
            description: '',
            list: [],
        },
        
        quantotelarischi: {
            name: 'quanto te rischi',
            description: '',
            list: [],
        },
        
        obbligo: {
            name: 'obbligo',
            description: '',
            list: [],
        },
        
        verità: {
            name: 'verità',
            description: '',
            list: [],
        },
        
        coppa: {
            name: 'coppa',
            description: '',
            list: [],
        },
        
        variabili: {
            voto: [],
            
            scelta: [],
            
            haimai: [],
            
            categoria: [],
            
            rima: [
                'palla',
                'gallo',
                'ballo',
                'stallo',
            ],
            
            quantotelarischi: [],
        },
    }
};





//^========================================================================
//^                            FUNZIONI
//^========================================================================

//* Funzioni evento
let goSettings = () => {
    home.classList.add('hidden')
    header.classList.remove('hidden')
    settings.classList.remove('hidden')
    playerInput.focus()

    document.addEventListener('keydown', onEnterPressed)

} // ? mostra la schermata impostazioni

let addBtnEvent = () => {
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

    playerInput.focus()
}

let confirmBtnEvent = () => {
    // completa la lista
    const listElements = document.querySelectorAll('.listElementText')
    
    players = []
    listElements.forEach ( (player) => {
        players.push(player.innerText)
    })
    
    if (playerInput.value != '') players.push(playerInput.value)

    settings.classList.add('hidden')
    if (!gameStarted) goMode()

    document.removeEventListener('keydown', onEnterPressed)
}

let onEnterPressed = (event) => {
    if (event.key === 'Enter') {
        addBtnEvent();
    }
}

let goMode = () => {
    // cambia sezione
    mode.classList.remove('hidden')
}

let goTypeSelector = () => {
    mode.classList.add('hidden')
    typeSelector.classList.remove('hidden')
}

let startGame = () => {
    gameStarted = true
    mode.classList.add('hidden')
    typeSelector.classList.add('hidden')

    setExtraction()
}

let openGuide = (guide) => {
    // apre la guida
    guide.classList.remove('hidden')
        
    const exit = document.querySelector('#guideExit')

    // chiude la guida
    exit.addEventListener('click', () => {
        guide.classList.add('hidden')
    })

    guide.addEventListener('click', (event) => {
        if (!guideBox.contains(event.target)) guide.classList.add('hidden')
    })
}

let reGame = () => {
    window.location.reload()
}



//* Funzioni principali
let setMode = (mode) => {
    switch (mode) {
        case 'classica':
            types = [
                'sorsa',
                'voto',
                'scelta',
                'regola',
                'haimai',
                'categoria',
                'ruolo',
                'rima',
                'gioco',
                'mimo',
                'specchio',
                'sfida',
                'linguaggio',
                'duello',
                'quantotelarischi',
                'missionesegreta',
            ]
            startGame()
            break

        case 'difficile':
            types = [
                'sorsa',
                'voto',
                'scelta',
                'regola',
                'haimai',
                'categoria',
                'ruolo',
                'rima',
                'gioco',
                'specchio',
                'sfida',
                'linguaggio',
                'duello',
                'storia',
                'quantotelarischi',
                'missionesegreta',
            ]
            startGame()
            break

        case 'hot':
            types = [
                'voto',
                'haimai',
                'gioco',
                'specchio',
                'sfida',
                'storia',
                'quantotelarischi',
                'obbligo',
                'verità',
                'missionesegreta',
            ]
            startGame()
            break

        case 'creativa':
            types = [
                'sorsa',
                'voto',
                'scelta',
                'regola',
                'haimai',
                'categoria',
                'ruolo',
                'rima',
                'gioco',
                'specchio',
                'sfida',
                'linguaggio',
                'duello',
                'storia',
                'quantotelarischi',
            ]
            startGame()
            break

        case 'coppa':
            types = [
                'sorsa',
                'voto',
                'scelta',
                'regola',
                'haimai',
                'categoria',
                'ruolo',
                'rima',
                'gioco',
                'specchio',
                'sfida',
                'linguaggio',
                'duello',
                'storia',
                'coppa',
            ]
            startGame()
            break
        case 'personalizzata':
            types = []
            goTypeSelector()
        break
    }
}

let setExtraction = () => {

    // estrae una tipologia di carta
    let type = getRandomType()
    let object = cards[langSelected][type]

    let cardType = object['name']
    let cardText = object['list'][getRandomCard(type)]
    let cardDescription = object['description']

    cardText = replaceWords(cardText);

    showExtraction(cardType, cardText, cardDescription);
    /*
    if(conteggioK == 0){
        // mostriamo la schermata finale
        setGameFinished(card)
    }else{
        // mostriamo la carta
        showExtraction(card, description, ind)
    }
    */
}

let updateHistory = (cardText) => {
    if (history.length === historyLength) history.pop()
    history.unshift(cardText)
}

let replaceWords = (cardText) => {

    // giocatore
    if (cardText.includes('{player1}')) {
        let player1 = getRandomPlayer()
        cardText = cardText.replace('{player1}', player1);

        if (cardText.includes('{player2}')) {
            let player2 = getRandomPlayer(player1)
            cardText = cardText.replace('{player2}', player2);
        }
    }

    // voto
    if (cardText.includes('{voto}')) {
        let voto = getRandomWord('voto')

        cardText = cardText.replace('{voto}', voto);
    }

    // scelta
    if (cardText.includes('{scelta}')) {
        let scelta = getRandomWord('scelta')

        cardText = cardText.replace('{scelta}', scelta);
    }

    // categoria
    if (cardText.includes('{categoria}')) {
        let categoria = getRandomWord('categoria')

        cardText = cardText.replace('{categoria}', categoria);
    }

    // rima
    if (cardText.includes('{rima}')) {
        let rima = getRandomWord('rima')

        cardText = cardText.replace('{rima}', rima);
    }

    // quantotelarischi
    if (cardText.includes('{quantotelarischi}')) {
        let quantotelarischi = getRandomWord('quantotelarischi')

        cardText = cardText.replace('{quantotelarischi}', quantotelarischi);
    }

    return cardText
}

let showExtraction = (type, text, description) => {

    // svuota il placeholder
    placeHolder.innerHTML = null

    // copia il template e lo compila
    const template = extractionTemplate.content.cloneNode(true)

    // template.querySelector('.conteggioKText').innerHTML = `${conteggioK}K`

    // inserisce tipo, testo ed immagine
    let gameBox = template.querySelector('#gameBox')
    let cardInfo = template.querySelector('#cardInfo')
    gameBox.style = `background-color: #eeeeee`
    template.querySelector('#cardType').innerHTML = `<span id="">${type}</span>`
    template.querySelector('#cardText').innerHTML = `<span id="">${text}</span>`

    // aggiunge l'evento per estrarre la prossima carta
    gameBox.addEventListener('click', (event) => {

        if (!(guideBtn.contains(event.target) || editBtn.contains(event.target))) setExtraction()
    })
    
    const guideBtn = template.querySelector('#guideBtn')
    const editBtn = template.querySelector('#editBtn')
    const guide = template.querySelector('#guide')

    // guida
    guideBtn.addEventListener('click', () => openGuide(guide))
    
    // edit
    editBtn.addEventListener('click', goSettings)
    
    // mostra il template
    placeHolder.appendChild(template)
}



//* Funzioni random
let getRandomPlayer = (prevPlayer = null) => {
    let index = Math.floor(Math.random() * players.length)
    let player = players[index]

    // se viene riestratto lo stesso giocatore, ripete la funzione
    if (player === prevPlayer) {
        return getRandomPlayer(prevPlayer)
    } else {
        return player
    }
}

let getRandomWord = (variable) => {
    let list = cards[langSelected]['variabili'][variable]
    let index = Math.floor(Math.random() * list.length)

    let word = list[index]
    for(let i = 0; i < list.length; i++){ 
        if ( list[i] === word) {
          list.splice(i, 1); 
        }
    }

    return word
}

let getRandomType = () => {
    let index = Math.floor(Math.random() * types.length)
    let type = types[index]

    if (history.includes(type)) return getRandomType()
    //! updateHistory(type)

    return type
}

let getRandomCard = (type) => {
    let index
    if (modeSelected = 'creativa' && [].includes(type)) { //! aggiungi le tipologie che hanno valori standard
        index = 0
    } else if (Object.keys(cards[langSelected]['variabili']).includes(type)) {
        let variables = cards[langSelected]['variabili'][type]
        if (variables.length === 0) index = 0
    } else {
        index = Math.floor(Math.random() * cards[langSelected][type]['list'].length)
    }

    return index
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



//^========================================================================
//^                              EVENTI
//^========================================================================
startBtn.addEventListener('click', goSettings)
goSettings() //!
confirmBtnEvent() //!
players = ['emme', 'leo']
goMode() //!
startGame() //!


addBtn.addEventListener('click', addBtnEvent)

confirmBtn.addEventListener('click', confirmBtnEvent)

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

modeElements.forEach( (modeElement) => {
    modeElement.addEventListener('click', () => {
        let modeText = modeElement.innerText
        modeSelected = modeText.toLowerCase()
        setMode(modeSelected)
    })
})

playAgainBtn.addEventListener('click', reGame)


// todo quando finiscono le rime
// todo aggiungi mimo e missione segreta a tutte le lingue
// todo modifica le variabili all'interno della funzione replaceWord(variable)
// todo gestisci le diverse modalità
// todo aggiungi grafiche emme
// todo aggiungi i crediti
// todo rimuovi effetto di determinate carte tipo regole che durano tot turni
// todo gestisci le probabilità di uscita di diverse tipologie
// todo carte standard per modalità creativa
// todo crea pagina typeselector
// todo sistema icone romano e napoletano
// todo salva l'ultima lingua usata e opacizza la bandiera corrispondente
// todo chiedere ad emme se la guida deve sovrastare anche l'header
// todo inserisci numero limite di giocatori
// todo trasforma il template creando tutti gli elementi tramite funzioni js ???
// todo come stracazzo è possibile che la variabile guide funzioni anche se non l'ho definita?
// todo crea variabili all'interno di showExtraction
// todo modifica historyLength se le tipologie sono poche
// todo minimo giocatori due (messaggio di errore)
// todo aggiungi tipologie a getRandomCard()