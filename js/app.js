let gameStarted = false
let wonGame = false

const timer = document.getElementById('timer')

const createTimer = () => {
    timer.innerText = '00:00'
}

createTimer()

let minutes = 0
let seconds = 0

let gameLength

let boardWidth = 16
let boardHeight = 16
let totalBombs = 40

let bombCells = []
let numCells = []
let emptyCells = []
let visibleCells = []

const offsets = [[0, -1], [0, 1], [1, 0], [-1, 0], [1, -1], [-1, -1], [1, 1], [-1, 1]]

const getOutOfBounds = (x, offsetX, y, offsetY) => {
    return ((x + offsetX) < 0 || (x + offsetX) >= boardWidth || (y + offsetY) < 0 || (y + offsetY) >= boardHeight)
}

const getCoordinates = (currentIndex) => {
    return [
        currentIndex % boardWidth,
        Math.floor(currentIndex / boardWidth)
    ]
}

const getIndex = (x, y) => {
    return (y * boardWidth) + x
}

const displayCell = (elem) => {
    elem.classList.remove('hidden_cell')
    elem.classList.add('visible_cell')
}

const createNum = (currentIndex) => {
    let [numX, numY] = getCoordinates(currentIndex)
    let adjacentBombCount = 0

    for ([offsetX, offsetY] of offsets) {
        let outOfBounds = getOutOfBounds(numX, offsetX, numY, offsetY)
        let currentIndex = getIndex((numX + offsetX), (numY + offsetY))

        if (!outOfBounds && bombCells.includes(currentIndex)) {
            adjacentBombCount += 1
        }
    }

    document.getElementById(`cell${currentIndex}`).innerHTML = adjacentBombCount
}

const gameBoard = document.querySelector('.minesweeper_grid')
const popSound = document.getElementById('pop_sound')
const balloon = document.querySelector('.balloon')
const cupcake = document.querySelector('.cupcake_img')
const modal = document.getElementById('win_lose_modal')
const modalContent = document.getElementById('modal_content')

const createColumns = () => {
    for (let i = 0; i < boardWidth; i++) {
        let div = document.createElement('div')

        div.classList.add('col')

        div.setAttribute('id', `col${i}`)
        gameBoard.appendChild(div)
    }
}

createColumns()

const createCells = () => {
    for (let i = 0; i < boardWidth; i++) {
        for (let j = 0; j < boardHeight; j++) {
            let div = document.createElement('div')
            let colDiv = document.querySelector(`#col${i}`)
            // multiply cell number by 16 then add column number to 
            // create cell ID so that the cells are calculated as +1 
            // to the right in every row
            let cellID = (j * boardWidth) + i

            div.classList.add('cell', 'hidden_cell')

            colDiv.appendChild(div)
            div.setAttribute('id', `cell${cellID}`)
        }
    }
}

createCells()

const placeBomb = (randomCell) => {
    let randomBomb = Math.floor(Math.random() * 6)
    document.getElementById(`cell${randomCell}`).innerHTML = `<img src="images/balloon${randomBomb}.png" alt="balloon" class="balloon">`
}

const createBombs = () => {
    let count = 0

    while (count < totalBombs) {
        let randomCell = Math.floor(Math.random() * 256)

        if (!bombCells.includes(randomCell)) {
            bombCells.push(randomCell)
            count += 1
            placeBomb(randomCell)
        }
    }
}

createBombs()

const findNums = () => {
    for (let i = 0; i < totalBombs; i++) {
        let [bombX, bombY] = getCoordinates(bombCells[i])
        
        for ([offsetX, offsetY] of offsets) {
            let outOfBounds = getOutOfBounds(bombX, offsetX, bombY, offsetY)
            let currentIndex = getIndex((bombX + offsetX), (bombY + offsetY))

            if (!outOfBounds && !bombCells.includes(currentIndex) && !numCells.includes(currentIndex)) {
                numCells.push(currentIndex)
            }
        }
    }
}

findNums()

const calculateAllNums = () => {
    for (let i = 0; i < numCells.length; i++) {
        createNum(numCells[i])
    }
}

calculateAllNums()

const findEmptyCells = () => {
    for (let i = 0; i < 256; i++) {
        if (!bombCells.includes(i) && !numCells.includes(i)) {
            emptyCells.push(i)
        }
    }
}

findEmptyCells()

const revealAdjEmpties = (currentIndex) => {
    let [x, y] = getCoordinates(currentIndex)

    for ([offsetX, offsetY] of offsets) {
        offsetIndex = getIndex((x + offsetX), (y + offsetY))
        let outOfBounds = getOutOfBounds(x, offsetX, y, offsetY)

        if (!outOfBounds && !visibleCells.includes(offsetIndex) && (emptyCells.includes(offsetIndex) || numCells.includes(offsetIndex))) {
            let elem = document.getElementById(`cell${offsetIndex}`)

            if (elem.classList.contains('flagged')) {
                removeFlag(currentIndex, elem)
            }

            displayCell(elem)
            visibleCells.push(offsetIndex)

            if (emptyCells.includes(offsetIndex)) {
                revealAdjEmpties(offsetIndex)
            }
        }
    }

    winCheck()
}

const nonBombCells = numCells.length + emptyCells.length

const confettiSettings = {target: 'confetti_canvas'}
const confetti = new ConfettiGenerator(confettiSettings)

const winCheck = () => {
    if (visibleCells.length === nonBombCells) {
        wonGame = true

        clearInterval(gameLength)
        
        confetti.render()
        
        modal.style.display = "flex";
        document.querySelector('.win_lose_msg').innerText = 'You win! Play again?'
    }
}

const loseCheck = (currentIndex) => {
    if (bombCells.includes(currentIndex)) {
        clearInterval(gameLength)
        popSound.play()

        for (let i = 0; i < bombCells.length; i++) {
            let bombCell = bombCells[i]
            let bombDiv = document.getElementById(`cell${bombCell}`)

            bombDiv.click()

            if (!bombDiv.classList.contains('flagged')) {
                bombDiv.classList.add('visible_cell')
                bombDiv.classList.remove('hidden_cell')
            }
        }

        modal.style.display = 'flex';
        document.querySelector('.win_lose_msg').innerText = 'You lose. :( Play again?'
    }
}

const removeFlag = (currentIndex, elem) => {
    elem.classList.remove('flagged')
    
    while (elem.hasChildNodes()) {
        elem.removeChild(elem.lastChild)
    }

    if (bombCells.includes(currentIndex)) {
        let randomColor = Math.floor(Math.random() * 6)
        let newImg = document.createElement('img')
        let newBalloon = elem.appendChild(newImg)
        newBalloon.setAttribute('src', `images/balloon${randomColor}.png`)
        newBalloon.setAttribute('class', 'balloon')
        newBalloon.setAttribute('alt', 'balloon')
    } else if (numCells.includes(currentIndex)) {
        createNum(currentIndex)
    } else {
        return
    }
}

const addFlag = (elem) => {
    elem.classList.add('flagged')
    
    while (elem.hasChildNodes()) {
        elem.removeChild(elem.lastChild)
    }

    let newImg = document.createElement('img')
    let flag = elem.appendChild(newImg)

    flag.setAttribute('src', 'images/cup-cake.png')
    flag.setAttribute('alt', 'cupcake')
    flag.setAttribute('class', 'cupcake_img')
}

gameBoard.addEventListener('mousedown', e => {
    if (!gameStarted) {
        gameLength = setInterval(() => {
            if (seconds < 59) {
                seconds++
            } else {
                seconds = 0
                minutes++
            }

            timer.innerText = `${minutes.toLocaleString('en-US', {minimumIntegerDigits: 2})}:${seconds.toLocaleString('en-US', {minimumIntegerDigits: 2})}`
        }, 1000)
        gameStarted = true
    }

    const x = e.clientX
    const y = e.clientY
    
    let elem = document.elementFromPoint(x, y)
    let parentDiv = elem.parentElement
    let targetCell

    if (elem.classList.contains('cell')) {
        targetCell = elem
    } else if (parentDiv.classList.contains('cell')) {
        targetCell = parentDiv
    } else {
        return
    }

    let currentIndex = parseInt(targetCell.id.slice(4))
    let isFlagged = targetCell.classList.contains('flagged')
    let isVisible = targetCell.classList.contains('visible_cell')

    // Auxiliary/right click
    if (e.button === 2) {
        if (isVisible) {
            return
        } else if (isFlagged) {
            removeFlag(currentIndex, targetCell)
        } else {
            addFlag(targetCell)
        }
    // Primary/left click
    } else if (e.button === 0) {
        if (isFlagged || isVisible) {
            return
        } else {
            displayCell(elem)
            visibleCells.push(currentIndex)

            if (bombCells.includes(currentIndex)) {
                loseCheck(currentIndex)
                return
            } else {
                if (emptyCells.includes(currentIndex)) {
                    revealAdjEmpties(currentIndex)
                    return
                }
                winCheck()
            }
        }
    } else {
        return
    }
})

gameBoard.addEventListener('contextmenu', e => {
    e.preventDefault()
})

const resetBoard = () => {
    if (wonGame) confetti.clear()
    
    gameStarted = false

    clearInterval(gameLength)
    createTimer()

    seconds = 0
    minutes = 0

    document.querySelectorAll('.col').forEach(e => e.remove())

    createColumns()
    createCells()

    bombCells = []
    numCells = []
    emptyCells = []
    visibleCells = []

    createBombs()
    findNums()
    calculateAllNums()
    findEmptyCells()
}

const refreshButtons = document.querySelectorAll('.refresh_button')

refreshButtons.forEach(button => {
    button.addEventListener('click', () => {
        resetBoard()
        clearInterval(gameLength)
        modal.style.display = 'none'
    })
})