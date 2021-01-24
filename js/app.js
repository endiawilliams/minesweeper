// NOTE TO SELF: the numCells and/or emptyCells array is not
// populating properly, since their lengths are not adding up to 216

// generate the grid
const gridContainer = document.querySelector('.minesweeper_grid')

const boardWidth = 16
const boardHeight = 16

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
            let cellID = (j * 16) + i

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

    while (count < 40) {
        // returns a random number from 0 to 255
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

function createNums () {
    for (let i = 0; i < 40; i++) {
        let bombCell = bombCells[i]

        let cellAbove = bombCell - 16
        let cellBelow = bombCell + 16
        let cellRight = bombCell + 1
        let cellLeft = bombCell - 1
        let cellTopRight = bombCell - 15
        let cellTopLeft = bombCell - 17
        let cellBottomRight = bombCell + 17
        let cellBottomLeft = bombCell + 15

        // If the index of the cell is less than or equal to 15, it's in the
        // top row, so we don't want to check the cell above it.
        if (bombCell <= 15 === false) {
            // If there is no bomb and no number in the cell, add 'n' for number
            if (bombCells.includes(cellAbove) === false && numCells.includes(cellAbove) === false) {
                numCells.push(cellAbove)
                document.getElementById(`cell${cellAbove}`).innerHTML = 'n'
            }
        }

        // If the index of the cell is greater than or equal to 240, it's in the
        // bottom row, so we don't want to check the cell below it.
        if (bombCell >= 240 === false) {
            if (bombCells.includes(cellBelow) === false && numCells.includes(cellBelow) === false) {
                numCells.push(cellBelow)
                document.getElementById(`cell${cellBelow}`).innerHTML = 'n'
            }
        }

        // If the index of the cell is in the right column, don't check the
        // cell to the right.
        if (rightCol.includes(bombCell) === false) {
            if (bombCells.includes(cellRight) === false && numCells.includes(cellRight) === false) {
                numCells.push(cellRight)
                document.getElementById(`cell${cellRight}`).innerHTML = 'n'
            }
        }

        // If the index of the cell is in the left column, don't check the
        // cell to the left. 
        if (leftCol.includes(bombCell) === false) {
            if (bombCells.includes(cellLeft) === false && numCells.includes(cellLeft) === false) {
                numCells.push(cellLeft)
                document.getElementById(`cell${cellLeft}`).innerHTML = 'n'
            }
        }

        // If the index of the cell is NOT in the right column and NOT
        // in the top row, then we want to check the cell above and to the right.
        if (rightCol.includes(bombCell) === false && bombCell <= 15 === false) {
            if (bombCells.includes(cellTopRight) === false && numCells.includes(cellTopRight) === false) {
                numCells.push(cellTopRight)
                document.getElementById(`cell${cellTopRight}`).innerHTML = 'n'
            }
        }

        // If the index of the cell is NOT in the left column and NOT
        // in the top row, then we want to check the cell above and to the left.
        if (leftCol.includes(bombCell) === false && bombCell <= 15 === false) {
            if (bombCells.includes(cellTopLeft) === false && numCells.includes(cellTopLeft) === false) {
                numCells.push(cellTopLeft)
                document.getElementById(`cell${cellTopLeft}`).innerHTML = 'n'
            }
        }

        // If the index of the cell is NOT in the right column and NOT
        // in the bottom row, then we want to check the cell below and to the right.
        if (rightCol.includes(bombCell) === false && bombCell >= 240 === false) {
            if (bombCells.includes(cellBottomRight) === false && numCells.includes(cellBottomRight) === false) {
                numCells.push(cellBottomRight)
                document.getElementById(`cell${cellBottomRight}`).innerHTML = 'n'
            }
        }

        // If the index of the cell is NOT in the left column and NOT
        // in the bottom row, then we want to check the cell below and to the left.
        if (leftCol.includes(bombCell) === false && bombCell >= 240 === false) {
            if (bombCells.includes(cellBottomLeft) === false && numCells.includes(cellBottomLeft) === false) {
                numCells.push(cellBottomLeft)
                document.getElementById(`cell${cellBottomLeft}`).innerHTML = 'n'
            }
        }
    }
}

createNums()

function calculateNums () {
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

function findEmptyCells () {
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

const getCoordinates = (currentIndex) => {
    return [
        currentIndex % boardWidth,
        Math.floor(currentIndex / boardWidth)
    ]
}

const getIndex = (x, y) => {
    return (y * boardWidth) + x
}

const offsets = [[0, -1], [0, 1], [1, 0], [-1, 0], [1, -1], [-1, -1], [1, 1], [-1, 1]]

const revealAdjEmpties = (currentIndex) => {
    let [x, y] = getCoordinates(currentIndex)

    for ([offsetX, offsetY] of offsets) {
        offsetIndex = getIndex((x + offsetX), (y + offsetY))
        let outOfBounds = ((x + offsetX) < 0 || (x + offsetX) >= boardWidth || (y + offsetY) < 0 || (y + offsetY) >= boardWidth)

        if (!outOfBounds && !visibleCells.includes(offsetIndex) && (emptyCells.includes(offsetIndex) || numCells.includes(offsetIndex))) {
            let elem = document.getElementById(`cell${offsetIndex}`)
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
        modalContent.innerHTML = 
        '<p>You win! Play again?</p><br /><img src="images/refreshbutton.png" alt="refresh button" class="refresh_button">'
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
        modalContent.innerHTML = 
        '<p>You lose. :( Play again?</p><br /><img src="images/refreshbutton.png" alt="refresh button" class="refresh_button">'
    }
}

// I know there is a better way to do this than adding an event listener
// every cell but I did not have time to figure it out

let cellDiv = document.querySelectorAll('.cell')
let gameBoard = document.querySelector('.minesweeper_grid')

// Regular click:

gameBoard.addEventListener('mousedown', e => {
    const x = e.clientX
    const y = e.clientY
    let elem = document.elementFromPoint(x, y)
    let currentIndex

    // This is the code that will run when the right-click functionality is restored, as the value 2 indicates that the secondary button has been clicked (usually the right button) and this will add/remove cupcake flags, so this needs to be refactored in the future.
    if (e.button === 2) {
        return
    }

    if (elem.classList.contains('cupcake_img') || elem.classList.contains('visible_cell')) {
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

// Right click flagging:

// Note that this is currently buggy if clicking on a cupcake image, 
// but I think I'll be able to debug it if I just add some checks to see 
// if e.target.tagName = 'IMG' or not so I can target the parent if needed

// It still works if clicking on the containing div.

const addFlagListener = (e) => {
    e.preventDefault()

    if (e.target.classList.contains('visible_cell')) {
        return
    }
    
    let cellID

    if (e.target.classList.contains('cupcake_img')) {
        cellID = e.target.parentNode.id
    } else {
        cellID = e.target.id
    }

    let currentIndex

    if (cellID.length === 5) {
        currentIndex = parseInt(cellID.slice(-1))
    } else if (cellID.length === 6) {
        currentIndex = parseInt(cellID.slice(-2))
    } else if (cellID.length === 7) {
        currentIndex = parseInt(cellID.slice(-3))
    }

    // If the div is already flagged and it is a bomb square
    // remove flagged class from the div and generate new balloon in the DOM
    if (e.currentTarget.classList.contains('flagged') && bombCells.includes(currentIndex)) {
        // console.log('We are in the first condition')
        e.target.classList.remove('flagged')

        let randomBalloon = Math.floor(Math.random() * 6)
        document.getElementById(`cell${currentIndex}`).innerHTML = `<img src="images/balloon${randomBalloon}.png" alt="balloon" class="balloon">`
    // If the div is already flagged and it is a numbered square
    // remove flagged class from the div and recalculate the numbers
    // to re-add the number to the DOM 
    } else if (e.currentTarget.classList.contains('flagged') && numCells.includes(currentIndex)) {
        // console.log('We are in the second condition')
        e.target.classList.remove('flagged')
        
        calculateNums()
    // If the target is flagged and is not in 
    // the bombs array or the numbers array, it was empty and
    // needs to be reset to empty
    } else if (e.currentTarget.classList.contains('flagged')) {
        // console.log('We are in the third condition')
        document.getElementById(`cell${currentIndex}`).innerHTML = ''
        e.target.classList.remove('flagged')
    // If the target was not flagged, add class flagged and
    // set innerHTML to add cupcake to the DOM, replacing number or bomb
    } else {
        // console.log('We are in the last condition')
        e.target.classList.add('flagged')
        e.target.innerHTML = '<img src="images/cup-cake.png" alt="cupcake" class="cupcake_img">'
    }
}

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

const refreshButton = document.querySelector('.refresh_button')

refreshButton.addEventListener('click', () => {
    resetBoard()
    modal.style.display = 'none'
})