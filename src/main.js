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
let started = false
let memory = ''
let langSelected = 'ita'
let modeSelected = 'standard'
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
    'rima',
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
    'classica',
    'difficile',
    'hot',
    'creativa',
    'coppa',
    'personalizzata',
]

let players = []

//!
types = ['sorsa', 'categoria', 'rima']
players = ['leo', 'emme']

let cards = {
    ita: {
        sorsa: {
            name: 'sorsa',
            list: [
                `{giocatore1} beve due sorse`,
                'tutte le ragazze bevono'
            ]
        },
        
        voto: {
            name: 'voto',
            list: []
        },
        
        scelta: {
            name: 'scelta',
            list: []
        },
        
        regola: {
            name: 'regola',
            list: []
        },
        
        haimai: {
            name: 'hai mai',
            list: []
        },
        
        categoria: {
            name: 'categoria',
            list: [
                'posti in cui non sarebbe carino tirare fuori il cazzo'
            ]
        },
        
        ruolo: {
            name: 'ruolo',
            list: []
        },
        
        rima: {
            name: 'rima',
            list: []
        },
        
        gioco: {
            name: 'gioco',
            list: []
        },
        
        specchio: {
            name: 'specchio',
            list: []
        },
        
        sfida: {
            name: 'sfida',
            list: []
        },
        
        linguaggio: {
            name: 'linguaggio',
            list: []
        },
        
        duello: {
            name: 'duello',
            list: []
        },
        
        storia: {
            name: 'storia',
            list: []
        },
        
        quantotelarischi: {
            name: 'quanto te la rischi',
            list: []
        },
        
        obbligo: {
            name: 'obbligo',
            list: []
        },
        
        verita: {
            name: 'verità',
            list: []
        },
        
        coppa: {
            name: 'coppa',
            list: []
        },
        
        variabili: {
            voto: [],
            
            scelta: [],
            
            haimai: [],
            
            categoria: [],
            
            rima: [],
            
            quantotelarischi: []
        }
    },
    
    eng: {
        sorsa: {
            name: 'sip',
            list: [
                `{giocatore1} has to drink two sips`,
                'every girl has to drink'
            ]
        },
        
        voto: {
            name: 'vote',
            list: []
        },
        
        scelta: {
            name: 'choice',
            list: []
        },
        
        regola: {
            name: 'rule',
            list: []
        },
        
        haimai: {
            name: 'never have I ever',
            list: []
        },
        
        categoria: {
            name: 'category',
            list: [
                "places where it wouldn't be nice to show your dick"
            ]
        },
        
        ruolo: {
            name: 'role',
            list: []
        },
        
        rima: {
            name: 'rhyme',
            list: []
        },
        
        gioco: {
            name: 'game',
            list: []
        },
        
        specchio: {
            name: 'mirror',
            list: []
        },
        
        sfida: {
            name: 'challenge',
            list: []
        },
        
        linguaggio: {
            name: 'language',
            list: []
        },
        
        duello: {
            name: 'duel',
            list: []
        },
        
        storia: {
            name: 'story',
            list: []
        },
        
        quantotelarischi: {
            name: 'how much you risk it',
            list: []
        },
        
        obbligo: {
            name: 'dare',
            list: []
        },
        
        verita: {
            name: 'truth',
            list: []
        },
        
        coppa: {
            name: 'cup',
            list: []
        },
        
        variabili: {
            voto: [],
            
            scelta: [],
            
            haimai: [],
            
            categoria: [],
            
            rima: [],
            
            quantotelarischi: []
        }
    },
    
    spa: {
        sorsa: {
            name: 'sorbo',
            list: [
                `{giocatore1} bebe dos sorbos`,
                'todas las chicas beben'
            ]
        },
        
        voto: {
            name: 'voto',
            list: []
        },
        
        scelta: {
            name: 'elección',
            list: []
        },
        
        regola: {
            name: 'regla',
            list: []
        },
        
        haimai: {
            name: 'yo nunca',
            list: []
        },
        
        categoria: {
            name: 'categoría',
            list: [
                'lugares donde no sería agradable mostrar tu pene'
            ]
        },
        
        ruolo: {
            name: 'rol',
            list: []
        },
        
        rima: {
            name: 'rima',
            list: []
        },
        
        gioco: {
            name: 'juego',
            list: []
        },
        
        specchio: {
            name: 'espejo',
            list: []
        },
        
        sfida: {
            name: 'desafío',
            list: []
        },
        
        linguaggio: {
            name: 'lenguaje',
            list: []
        },
        
        duello: {
            name: 'duelo',
            list: []
        },
        
        storia: {
            name: 'historia',
            list: []
        },
        
        quantotelarischi: {
            name: 'cuánto te arriesgas',
            list: []
        },
        
        obbligo: {
            name: 'obligación',
            list: []
        },
        
        verita: {
            name: 'verdad',
            list: []
        },
        
        coppa: {
            name: 'copa',
            list: []
        },
        
        variabili: {
            voto: [],
            
            scelta: [],
            
            haimai: [],
            
            categoria: [],
            
            rima: [],
            
            quantotelarischi: []
        }
    },
    
    rom: {
        sorsa: {
            name: 'sorso',
            list: [
                `{giocatore1} beve due sorsi`,
                'tutte le ragazze bevono'
            ]
        },
        
        voto: {
            name: 'voto',
            list: []
        },
        
        scelta: {
            name: 'scelta',
            list: []
        },
        
        regola: {
            name: 'regola',
            list: []
        },
        
        haimai: {
            name: 'mai fatto',
            list: []
        },
        
        categoria: {
            name: 'categoria',
            list: [
                'posti dove nun sarebbe carino tirà fori er cazzo'
            ]
        },
        
        ruolo: {
            name: 'ruolo',
            list: []
        },
        
        rima: {
            name: 'rima',
            list: []
        },
        
        gioco: {
            name: 'gioco',
            list: []
        },
        
        specchio: {
            name: 'specchio',
            list: []
        },
        
        sfida: {
            name: 'sfida',
            list: []
        },
        
        linguaggio: {
            name: 'linguaggio',
            list: []
        },
        
        duello: {
            name: 'duello',
            list: []
        },
        
        storia: {
            name: 'storia',
            list: []
        },
        
        quantotelarischi: {
            name: 'quanto te la rischi',
            list: []
        },
        
        obbligo: {
            name: 'obbligo',
            list: []
        },
        
        verita: {
            name: 'verità',
            list: []
        },
        
        coppa: {
            name: 'coppa',
            list: []
        },
        
        variabili: {
            voto: [],
            
            scelta: [],
            
            haimai: [],
            
            categoria: [],
            
            rima: [],
            
            quantotelarischi: []
        }
    },
    
    nap: {
        sorsa: {
            name: 'sorsa',
            list: [
                `{giocatore1} se beve doie sorsi`,
                'tutte e femmene bevono'
            ]
        },
        
        voto: {
            name: 'voto',
            list: []
        },
        
        scelta: {
            name: 'scelta',
            list: []
        },
        
        regola: {
            name: 'regola',
            list: []
        },
        
        haimai: {
            name: 'mmai fatto',
            list: []
        },
        
        categoria: {
            name: 'categoria',
            list: [
                'posti addó nun sarebbe bello fa vedè o cazzo'
            ]
        },
        
        ruolo: {
            name: 'ruolo',
            list: []
        },
        
        rima: {
            name: 'rima',
            list: []
        },
        
        gioco: {
            name: 'gioco',
            list: []
        },
        
        specchio: {
            name: 'specchio',
            list: []
        },
        
        sfida: {
            name: 'sfida',
            list: []
        },
        
        linguaggio: {
            name: 'linguaggio',
            list: []
        },
        
        duello: {
            name: 'duello',
            list: []
        },
        
        storia: {
            name: 'storia',
            list: []
        },
        
        quantotelarischi: {
            name: 'quanto te la rischi',
            list: []
        },
        
        obbligo: {
            name: 'obbligo',
            list: []
        },
        
        verita: {
            name: 'verità',
            list: []
        },
        
        coppa: {
            name: 'coppa',
            list: []
        },
        
        variabili: {
            voto: [],
            
            scelta: [],
            
            haimai: [],
            
            categoria: [],
            
            rima: [],
            
            quantotelarischi: []
        }
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

let goTypeSelector = () => {
    mode.classList.add('hidden')
    typeSelector.classList.remove('hidden')
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
                'hai mai',
                'categoria',
                'ruolo',
                'gioco di parole',
                'gioco',
                'specchio',
                'sfida',
                'linguaggio',
                'duello',
            ]
        break
        case 'difficile':
            types = [
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
            ]
        break
        case 'hot':
            types = [
                'voto',
                'scelta',
                'regola',
                'hai mai',
                'ruolo',
                'gioco',
                'specchio',
                'sfida',
                'duello',
                'quanto te la rischi',
                'obbligo',
                'verità',
            ]
        break
        case 'creativa':
            types = [
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
            ]
            
        break
        case 'coppa':
            types = [
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
                'coppa',
            ]

        break
        case 'personalizzata':
            types = []
            goTypeSelector()
        break
    }

}

let setGame = () => {
    
    if (started === false) {
        // nascondiamo la home
        document.body.classList.add('gameStarted')
    } else {
        placeHolder.innerHTML=''
        numMazzi.classList.add('hidden')
        buttons.classList.add('hidden')
    }
    
    // mostriamo la schermata dei giocatori
    menu.classList.remove('hidden')
}

let setExtraction = () => {
    // estraiamo una tipologia di carta
    let type = getRandomType()

    let cardType = cards[langSelected][type]['name']
    let cardText = cards[langSelected][type]['list'][getRandomCard(type)]

    cardText = replaceWords(cardText);
    return cardText

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

function replaceWords(cardText) {
    // giocatore
    if (cardText.includes('{player1}')) {
        let player1 = getRandomPlayer()
        cardText = cardText.replace('{player1}', player1);

        if (cardText.includes('{player2}')) {
            let player2 = getRandomPlayer(player1)
            cardText = cardText.replace('{player2}', player2);
        }
    }

    // rima
    if (cardText.includes('{rima}')) {
        let rhyme = getRandomWord('rima')

        cardText = cardText.replace('{rima}', rhyme);
    }

    // categoria

    // obbligo

    // verità

    return cardText;
}

let showExtraction = (card, description, ind) => {
    // svuotiamo il placeholder
    placeHolder.innerHTML = null

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

    return type
}

let getRandomCard = (type) => {
    // estraiamo un numero a caso
    let index = Math.floor(Math.random() * cards[langSelected][type]['list'].length)

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

modeElements.forEach( (modeElement) => {
    modeElement.addEventListener('click', () => {
        let modeText = modeElement.innerText
        modeSelected = modeText.toLowerCase()
        setMode(modeSelected)

        gameStared = true
    })
})

playAgain.addEventListener('click', reGame)


// todo descrizioni lingue
// todo edit
// todo quando finiscono le rime