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
const endGame = document.querySelector('#endGame')

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
const endGameTitle = document.querySelector('#endGameTitle')



//^========================================================================
//^                            VARIABILI
//^========================================================================
let kCounter = 4
let started = false
let langSelected = 'ita'
let modeSelected = 'standard'
const langStorage = localStorage.getItem('language')
if (langStorage) langSelected = JSON.parse(langStorage)
const lastLanguageElement = document.querySelector('#' + langSelected)
let gameStarted = false
let index = 0
let history = []
let historyLength

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
                '{player1} distribuisci due sorse',
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
            ],
        },
        
        regola: {
            name: 'regola',
            description: '',
            list: [
                "Inventa una regola",
                "Inventa una regola",
                "Inventa una regola",
                "Inventa una regola",
                "Inventa una regola",
                "D'ora in poi, gli altri dovranno riferirsi a voi con il nome della persona alla vostra destra"
            ],
        },
        
        haimai: {
            name: 'hai mai',
            description: '',
            list: [
                "Hai mai... inventa tu, chi l'ha fatto beve due sorse",
                "Hai mai... inventa tu, chi l'ha fatto beve due sorse",
                "Hai mai... inventa tu, chi l'ha fatto beve due sorse",
                "Hai mai... inventa tu, chi l'ha fatto beve due sorse",
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
                'Inventa una categoria',
                'Inventa una categoria',
                'Inventa una categoria',
                'Inventa una categoria',
                'Posti in cui non sarebbe carino tirare fuori il cazzo',
            ],
        },
        
        ruolo: {
            name: 'ruolo',
            description: '',
            list: [
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
                "{player1}, mima {mimo}",
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
                'Inventate una storia, {player1} comincia dicendo una frase, a turno, ogni giocatore aggiunge una frase, fino a terminare il giro'
            ],
        },
        
        quantotelarischi: {
            name: 'quanto te la rischi',
            description: '',
            list: [
                '{player1} quanto te la rischi da 1 a 10? {player2} sceglie la sfida'
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

            mimo: [
                'un animale',
                'un attore',
                'un film',
                'un mestiere',
                'una città',
            ],

            sfida: [
                'fai 20 piegamenti o bevi 5 sorse',
                'bevi il bicchiere a goccia',
            ],
            
            duello: [
                'braccio di ferro',
                'guerra dei pollici',
            ],

            verità: [
                'chi ti faresti dei presenti?',
            ],

            missionesegreta: [
                'versare lo stesso alcolico in tutti i bicchieri del tavolo'
            ],
        },

        traduzioni: {
            modes: [
                'classica',
                'difficile',
                'hot',
                'creativa',
                'coppa',
                'personalizzata',
            ],

            endGame: {
                title: 'bevi tutta la coppa!',
                button: 'rigioca'
            },
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

        traduzioni: {
            modes: [
                'classic',
                'hard',
                'hot',
                'creative',
                'cup',
                'custom',
            ],

            endGame: {
                title: 'drink the whole cup!',
                button: 'play again'
            },
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

        traduzioni: {
            modes: [
                'clásica',
                'difícil',
                'caliente',
                'creativa',
                'copa',
                'personalizada',
            ],

            endGame: {
                title: '¡bive toda la copa!',
                button: 'juega de nuevo'
            },
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

        traduzioni: {
            modes: [
                'a solita',
                'intoppata',
                'zozza',
                'creativa',
                'coppona',
                'come te pare',
            ],

            endGame: {
                title: 'e mo so cazzi tua!',
                button: 'riggioca'
            },
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

        traduzioni: {
            modes: [
                "classica",
                "complicat",
                "focosa",
                "creativa",
                "'a coppa",
                "fattiel' tu",
            ],

            endGame: {
                title: "biv tutt' cos!",
                button: 'rigioca'
            },
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

    // lingue
    let langItem = document.querySelector(`#${langSelected}`)
    updateLanguage(langItem)

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

let updateLanguage = (lang) => {
    let name = lang.id

    languages.forEach( (lang) => {
        lang.classList.remove('selected')
    })

    langSelected = name
    lang.classList.add('selected')
    localStorage.setItem('language', JSON.stringify(langSelected))
}

let goMode = () => {
    // cambia sezione
    mode.classList.remove('hidden')
    fillModeSections()
}

let goTypeSelector = () => {
    mode.classList.add('hidden')
    typeSelector.classList.remove('hidden')
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

let fillModeSections = () => {
    
    modeElements.forEach( (modeElement, index) => {
        modeElement.innerText = cards[langSelected]['traduzioni']['modes'][index]
    });

}


//* Funzioni principali
let startGame = () => {
    historyLength = Math.floor(types.length / 2)

    gameStarted = true
    mode.classList.add('hidden')
    typeSelector.classList.add('hidden')

    setExtraction()
}

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

    if (type === 'coppa') {
        kCounter--;
        if (kCounter === 0) {
            setGameFinished()
            return
        }
    }
    
    let typeObject = cards[langSelected][type]

    let cardType = typeObject['name']
    let cardText = typeObject['list'][getRandomCard(type)]
    let cardDescription = typeObject['description']

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

let updateHistory = (cardType) => {
    if (history.length === historyLength) history.pop()
    history.unshift(cardType)
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

    // variabili
    let list = ['voto', 'scelta', 'rima', 'mimo', 'sfida', 'duello', 'verita', 'missionesegreta']

    list.forEach( (variable) => {
        let placeholder = '{' + variable + '}'
        if (cardText.includes(placeholder)) {
            let newWord = getRandomWord(variable)
    
            cardText = cardText.replace(placeholder, newWord);
        }
    })

    return cardText
}

let showExtraction = (type, text, description) => {
    placeHolder.innerHTML = null
    const template = extractionTemplate.content.cloneNode(true)

    // estraggo tutti gli elementi del template
    const gameBox = template.querySelector('#gameBox')
    const cardInfo = template.querySelector('#cardInfo')
    const cardType = template.querySelector('#cardType')
    const cardText = template.querySelector('#cardText')
    const guideBtn = template.querySelector('#guideBtn')
    const editBtn = template.querySelector('#editBtn')
    const guide = template.querySelector('#guide')
    const guideTitle = template.querySelector('#guideTitle')
    const guideText = template.querySelector('#guideText')

    // inserisce tipo, testo ed immagine
    gameBox.style = `background-color: #eeeeee`
    cardType.innerHTML = `<span id="">${type}</span>`
    cardText.innerHTML = `<span id="">${text}</span>`

    // inserisce il conteggio dei K
    if (types.includes('coppa')) {
        const kCounterDisplay = template.querySelector('#kCounterText')
        kCounterDisplay.innerHTML = `${kCounter}K`

        const kCounterBox = template.querySelector('#kCounterBox')
        kCounterBox.classList.remove('hidden')
    }

    // compila la guida
    guideTitle.innerText = type
    guideText.innerText = description

    // aggiunge l'evento per estrarre la prossima carta
    gameBox.addEventListener('click', setExtraction)
    cardInfo.addEventListener('click', setExtraction)

    // guida ed edit
    guideBtn.addEventListener('click', () => openGuide(guide))
    editBtn.addEventListener('click', goSettings)
    
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
    // estrae la parola
    let list = cards[langSelected]['variabili'][variable]
    let index = Math.floor(Math.random() * list.length)
    let word = list[index]

    // rimuove la parola dalla lista di variabili
    for (let i = 0; i < list.length; i++){ 
        if ( list[i] === word) {
          list.splice(i, 1); 
        }
    }
    
    // rimuove la tipologia se le variabili sono finite
    if (list.length === 0 && variable !== 'rima') {
        for (let i = 0; i < types.length; i++){ 
            if ( types[i] === variable) {
              types.splice(i, 1); 
            }
        }
    }

    return word
}

let getRandomType = () => {
    let index = Math.floor(Math.random() * types.length)
    let type = types[index]

    if (history.includes(type)) return getRandomType()
    updateHistory(type)

    return type
}

let getRandomCard = (type) => {
    let index

    let condition1 = (modeSelected = 'creativa' && ['regola', 'haimai', 'categoria', 'specchio', 'rima'].includes(type)) // se la modalità è creativa e servono le carte libere
    let condition2 = (type === 'rima' && cards[langSelected]['variabili']['rima'].length === 0) // se sono finite le rime
    let condition3 = (['coppa', 'quantotelarischi'].includes(type)) // se la lista contiene una sola carta

    // estrae la prima carta
    if (condition1 || condition2 || condition3) return 0

    // estrae una carta a caso dalla lista
    index = Math.floor(Math.random() * cards[langSelected][type]['list'].length)

    return index
}



//* End game
let setGameFinished = () => {
    endGame.classList.remove('hidden')
    let endGameObject = cards[langSelected]['traduzioni']['endGame']
    
    endGameTitle.innerText = endGameObject['title']
    playAgainBtn.innerText = endGameObject['button']
}



//^========================================================================
//^                              EVENTI
//^========================================================================
startBtn.addEventListener('click', goSettings)
goSettings() //!
// confirmBtnEvent() //!
players = ['emme', 'leo']
// startGame() //!

addBtn.addEventListener('click', addBtnEvent)

confirmBtn.addEventListener('click', confirmBtnEvent)

languages.forEach( (lang) => {
    lang.addEventListener('click', () => updateLanguage(lang))
})

modeElements.forEach( (modeElement) => {
    modeElement.addEventListener('click', () => {
        let modeText = modeElement.innerText
        modeSelected = modeText.toLowerCase()
        setMode(modeSelected)
    })
})

playAgainBtn.addEventListener('click', reGame)



// todo aggiungi mimo e missione segreta a tutte le lingue
// todo gestisci la modalità difficile
// todo aggiungi grafiche emme
// todo aggiungi i crediti
// todo rimuovi effetto di determinate carte tipo regole che durano tot turni
// todo crea pagina typeselector
// todo sistema icone romano e napoletano
// todo minimo giocatori due (messaggio di errore)
// todo se i giocatori sono troppi, scroll visivo