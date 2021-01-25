// generate the grid
const gridContainer = document.querySelector('.minesweeper_grid')

let boardWidth = 16
let boardHeight = 16
let totalBombs = 40
const offsets = [[0, -1], [0, 1], [1, 0], [-1, 0], [1, -1], [-1, -1], [1, 1], [-1, 1]]

const createColumns = () => {
    for (let i = 0; i < boardWidth; i++) {
        let div = document.createElement('div')

        if (i % 2 === 0) {
            div.classList.add('col', 'evencol')
        } else {
            div.classList.add('col', 'oddcol')
        }

        div.setAttribute('id', `col${i}`)
        gridContainer.appendChild(div)
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

            if (j % 2 === 0) {
                div.classList.add('cell', 'evencell')
            } else {
                div.classList.add('cell', 'oddcell')
            }

            colDiv.appendChild(div)
            div.setAttribute('id', `cell${cellID}`)
        }
    }
}

createCells()

let bombCells = []
let numCells = []
let emptyCells = []
let visibleCells = []

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

const topRow = [
    0, 1, 2, 3, 4, 5, 6, 7, 
    8, 9, 10, 11, 12, 13, 14, 15
]

const bottomRow = [
    240, 241, 242, 243, 244, 245, 246, 247,
    248, 249, 250, 251, 252, 253, 254, 255
]

const rightCol = [
    15, 31, 47, 63, 79, 95, 111, 127, 
    143, 159, 175, 191, 207, 223, 239, 255
]

const leftCol = [
    0, 16, 32, 48, 64, 80, 96, 112, 
    128, 144, 160, 176, 192, 208, 224, 240
]

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

const createNums = () => {
    for (let i = 0; i < totalBombs; i++) {
        let [bombX, bombY] = getCoordinates(bombCells[i])
        
        for ([offsetX, offsetY] of offsets) {
            let outOfBounds = getOutOfBounds(bombX, offsetX, bombY, offsetY)
            let currentIndex = getIndex((bombX + offsetX), (bombY + offsetY))

            if (!outOfBounds && !bombCells.includes(currentIndex) && !numCells.includes(currentIndex)) {
                numCells.push(currentIndex)
                document.getElementById(`cell${currentIndex}`).innerHTML = 'n'
            }
        }
    }
}

createNums()

const calculateNums = () => {
    for (let i = 0; i < numCells.length; i++) {
        let numCell = numCells[i]

        let adjacentBombCount = 0

        let cellAbove = numCell - 16
        let cellBelow = numCell + 16
        let cellRight = numCell + 1
        let cellLeft = numCell - 1
        let cellTopRight = numCell - 15
        let cellTopLeft = numCell - 17
        let cellBottomRight = numCell + 17
        let cellBottomLeft = numCell + 15

        if (numCell <= 15 === false) {
            // Check if there is a bomb in the cell above by checking to see
            // if the index number exists in the bombCells array
            if (bombCells.includes(cellAbove)) {
                adjacentBombCount += 1
            }
        }

        if (numCell >= 240 === false) {
            if (bombCells.includes(cellBelow)) {
                adjacentBombCount += 1
            }
        }

        // If the numbered cell is in the right column, we do not want to 
        // check a cell to the right (which does not exist). Therefore, we
        // only want to run this code if rightCol does not include the index
        // number of the numbered cell we are checking. 
        if (rightCol.includes(numCell) === false) {
            // If the bombCells array includes the cell to the right of the 
            // numbered cell, then run the code
            if (bombCells.includes(cellRight)) {
                adjacentBombCount += 1
            }
        }

        if (leftCol.includes(numCell) === false) {
            if (bombCells.includes(cellLeft)) {
                adjacentBombCount += 1
            }
        }

        // If the index of the cell is NOT in the right column and NOT
        // in the top row, then we want to check the cell above and to the right.
        if (rightCol.includes(numCell) === false && numCell <= 15 === false) {
            if (bombCells.includes(cellTopRight)) {
                adjacentBombCount += 1
            }
        }

        if (leftCol.includes(numCell) === false && numCell <= 15 === false) {
            if (bombCells.includes(cellTopLeft)) {
                adjacentBombCount += 1
            }
        }

        if (rightCol.includes(numCell) === false && numCell >= 240 === false) {
            if (bombCells.includes(cellBottomRight)) {
                adjacentBombCount += 1
            }
        }

        if (leftCol.includes(numCell) === false && numCell >= 240 === false) {
            if (bombCells.includes(cellBottomLeft)) {
                adjacentBombCount += 1
            }
        }

        document.getElementById(`cell${numCell}`).innerHTML = adjacentBombCount
    }
}

calculateNums()

const findEmptyCells = () => {
    for (let i = 0; i < 256; i++) {
        if (!bombCells.includes(i) && !numCells.includes(i)) {
            emptyCells.push(i)
        }
    }
}

findEmptyCells()

const displayCell = (elem) => {
    elem.classList.remove('evencell', 'oddcell')
    elem.classList.add('visible_cell')
}

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
}

const popSound = document.getElementById('pop_sound')
const balloon = document.querySelector('.balloon')
const modal = document.getElementById('win_lose_modal')
const nonBombCells = numCells.length + emptyCells.length
const modalContent = document.getElementById('modal_content')

const winCheck = () => {
    if (visibleCells.length === nonBombCells) {
        modal.style.display = "flex";
        document.querySelector('.win_lose_msg').innerText = 'You win! Play again?'
    }
}

const loseCheck = (elem, currentIndex) => {
    if (bombCells.includes(currentIndex)) {
        popSound.play()

        for (let i = 0; i < bombCells.length; i++) {
            let bombCell = bombCells[i]
            let bombDiv = document.getElementById(`cell${bombCell}`)

            bombDiv.click()

            if (!bombDiv.classList.contains('flagged')) {
                bombDiv.classList.add('visible_cell')
                bombDiv.classList.remove('evencell', 'oddcell')
            }
        }

        modal.style.display = 'flex';
        document.querySelector('.win_lose_msg').innerText = 'You lose. :( Play again?'
    }
}

const cellDiv = document.querySelectorAll('.cell')
const gameBoard = document.querySelector('.minesweeper_grid')

const removeFlag = (currentIndex, elem) => {
    elem.classList.remove('flagged')
            
    if (bombCells.includes(currentIndex)) {
        let randomBalloon = Math.floor(Math.random() * 6)
        elem.innerHTML = `<img src="images/balloon${randomBalloon}.png" alt="balloon" class="balloon">`
    }

    if (numCells.includes(currentIndex)) {
        calculateNums()
    }

    if (emptyCells.includes(currentIndex)) {
        elem.innerHTML = ''
    }
}

gameBoard.addEventListener('mousedown', e => {
    const x = e.clientX
    const y = e.clientY
    let elem = document.elementFromPoint(x, y)
    let currentIndex

    if (e.button === 2) {
        if (e.target.classList.contains('visible_cell')) {
            return
        } else if (e.target.classList.contains('flagged')) {
            removeFlag(currentIndex, elem)
        } else {
            e.target.classList.add('flagged')
            e.target.innerHTML = '<img src="images/cup-cake.png" alt="cupcake" class="cupcake_img">'
        }
        return
    }

    if (elem.classList.contains('flagged') || elem.classList.contains('visible_cell')) {
        return
    } else if (elem.classList.contains('balloon')) {
        elem = document.elementFromPoint(x, y).parentNode
        currentIndex = parseInt(elem.id.slice(4))
    } else if (elem.classList.contains('cell')) {
        currentIndex = parseInt(elem.id.slice(4))
        visibleCells.push(currentIndex)
        displayCell(elem)

        if (emptyCells.includes(currentIndex)) {
            revealAdjEmpties(currentIndex)
        }

        winCheck()
    }

    loseCheck(elem, currentIndex)
})

gameBoard.addEventListener('contextmenu', e => {
    e.preventDefault()
})

const resetBoard = () => {
    document.querySelectorAll('.col').forEach(e => e.remove())

    createColumns()
    createCells()

    bombCells = []
    numCells = []
    emptyCells = []
    visibleCells = []

    createBombs()
    createNums()
    calculateNums()
    findEmptyCells()
}

const refreshButtons = document.querySelectorAll('.refresh_button')

refreshButtons.forEach(button => {
    button.addEventListener('click', () => {
        resetBoard()
        modal.style.display = 'none'
    })
})