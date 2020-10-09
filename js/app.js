let allCells = []

function generateBombs () {
    let count = 0
    while (count < 40) {
        // returns a random number from 0 to 255
        let randomCell = Math.floor(Math.random() * 256)

        if (allCells.includes(randomCell) === false) {
            allCells.push(randomCell)
            count += 1

            let randomBalloon = Math.floor(Math.random() * 6)
            document.getElementById(`cell${randomCell}`).innerHTML = `<img src="images/balloon${randomBalloon}.png" alt="balloon" class="balloon">`
        }
    }
}

generateBombs()

let numCells = []

const rightCol = [
    15, 31, 47, 63, 79, 95, 111, 127, 
    143, 159, 175, 191, 207, 223, 239, 255
]

const leftCol = [
    0, 16, 32, 48, 64, 80, 96, 112, 
    128, 144, 160, 176, 192, 208, 224, 240
]

function generateNums () {
    for (let i = 0; i < 40; i++) {
        let bombCell = allCells[i]

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
            if (allCells.includes(cellAbove) === false && numCells.includes(cellAbove) === false) {
                numCells.push(cellAbove)
                document.getElementById(`cell${cellAbove}`).innerHTML = 'n'
            }
        }

        // If the index of the cell is greater than or equal to 240, it's in the
        // bottom row, so we don't want to check the cell below it.
        if (bombCell >= 240 === false) {
            if (allCells.includes(cellBelow) === false && numCells.includes(cellBelow) === false) {
                numCells.push(cellBelow)
                document.getElementById(`cell${cellBelow}`).innerHTML = 'n'
            }
        }

        // If the index of the cell is in the right column, don't check the
        // cell to the right.
        if (rightCol.includes(bombCell) === false) {
            if (allCells.includes(cellRight) === false && numCells.includes(cellRight) === false) {
                numCells.push(cellRight)
                document.getElementById(`cell${cellRight}`).innerHTML = 'n'
            }
        }

        // If the index of the cell is in the left column, don't check the
        // cell to the left. 
        if (leftCol.includes(bombCell) === false) {
            if (allCells.includes(cellLeft) === false && numCells.includes(cellLeft) === false) {
                numCells.push(cellLeft)
                document.getElementById(`cell${cellLeft}`).innerHTML = 'n'
            }
        }

        // If the index of the cell is NOT in the right column and NOT
        // in the top row, then we want to check the cell above and to the right.
        if (rightCol.includes(bombCell) === false && bombCell <= 15 === false) {
            if (allCells.includes(cellTopRight) === false && numCells.includes(cellTopRight) === false) {
                numCells.push(cellTopRight)
                document.getElementById(`cell${cellTopRight}`).innerHTML = 'n'
            }
        }

        // If the index of the cell is NOT in the left column and NOT
        // in the top row, then we want to check the cell above and to the left.
        if (leftCol.includes(bombCell) === false && bombCell <= 15 === false) {
            if (allCells.includes(cellTopLeft) === false && numCells.includes(cellTopLeft) === false) {
                numCells.push(cellTopLeft)
                document.getElementById(`cell${cellTopLeft}`).innerHTML = 'n'
            }
        }

        // If the index of the cell is NOT in the right column and NOT
        // in the bottom row, then we want to check the cell below and to the right.
        if (rightCol.includes(bombCell) === false && bombCell >= 240 === false) {
            if (allCells.includes(cellBottomRight) === false && numCells.includes(cellBottomRight) === false) {
                numCells.push(cellBottomRight)
                document.getElementById(`cell${cellBottomRight}`).innerHTML = 'n'
            }
        }

        // If the index of the cell is NOT in the left column and NOT
        // in the bottom row, then we want to check the cell below and to the left.
        if (leftCol.includes(bombCell) === false && bombCell >= 240 === false) {
            if (allCells.includes(cellBottomLeft) === false && numCells.includes(cellBottomLeft) === false) {
                numCells.push(cellBottomLeft)
                document.getElementById(`cell${cellBottomLeft}`).innerHTML = 'n'
            }
        }
    }
}

generateNums()

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
            // if the index number exists in the allCells array (which contains
            // coordinates of all bombs) 
            if (allCells.includes(cellAbove)) {
                adjacentBombCount += 1
            }
        }

        if (numCell >= 240 === false) {
            if (allCells.includes(cellBelow)) {
                adjacentBombCount += 1
            }
        }

        // If the numbered cell is in the right column, we do not want to 
        // check a cell to the right (which does not exist). Therefore, we
        // only want to run this code if rightCol does not include the index
        // number of the numbered cell we are checking. 
        if (rightCol.includes(numCell) === false) {
            // If the allCells array (which contains the coordinates of all
            // bombs) includes the cell to the right of the numbered cell,
            // then run the code
            if (allCells.includes(cellRight)) {
                adjacentBombCount += 1
            }
        }

        if (leftCol.includes(numCell) === false) {
            if (allCells.includes(cellLeft)) {
                adjacentBombCount += 1
            }
        }

        // If the index of the cell is NOT in the right column and NOT
        // in the top row, then we want to check the cell above and to the right.
        if (rightCol.includes(numCell) === false && numCell <= 15 === false) {
            if (allCells.includes(cellTopRight)) {
                adjacentBombCount += 1
            }
        }

        if (leftCol.includes(numCell) === false && numCell <= 15 === false) {
            if (allCells.includes(cellTopLeft)) {
                adjacentBombCount += 1
            }
        }

        if (rightCol.includes(numCell) === false && numCell >= 240 === false) {
            if (allCells.includes(cellBottomRight)) {
                adjacentBombCount += 1
            }
        }

        if (leftCol.includes(numCell) === false && numCell >= 240 === false) {
            if (allCells.includes(cellBottomLeft)) {
                adjacentBombCount += 1
            }
        }

        document.getElementById(`cell${numCell}`).innerHTML = adjacentBombCount
    }
}

calculateNums()

document.getElementById('refresh_button').addEventListener('click', () => {
    location.reload()
})

let emptyCells = []

function findEmptyCells () {
    for (let i = 0; i < 256; i++) {
        if (allCells.includes(i) === false && numCells.includes(i) === false) {
            emptyCells.push(i)
        }
    }
}

findEmptyCells()

function revealAdjEmpties (currentIndex) {
    let cellAbove = currentIndex - 16
    let cellBelow = currentIndex + 16
    let cellRight = currentIndex + 1
    let cellLeft = currentIndex - 1
    let cellTopRight = currentIndex - 15
    let cellTopLeft = currentIndex - 17
    let cellBottomRight = currentIndex + 17
    let cellBottomLeft = currentIndex + 15

    // If the index is not in the top row and the cell above it is 
    // included in the emptyCells array, make it display
    if (currentIndex <= 15 === false && (emptyCells.includes(cellAbove) || numCells.includes(cellAbove))) {
        document.getElementById(`cell${cellAbove}`).click()
    }

    if (currentIndex >= 240 === false && (emptyCells.includes(cellBelow) || numCells.includes(cellBelow))) {
        document.getElementById(`cell${cellBelow}`).click()
    }

    if (rightCol.includes(currentIndex) === false && (emptyCells.includes(cellRight) || numCells.includes(cellRight))) {
        document.getElementById(`cell${cellRight}`).click()
    }

    if (leftCol.includes(currentIndex) === false && (emptyCells.includes(cellLeft) || numCells.includes(cellLeft))) {
        document.getElementById(`cell${cellLeft}`).click()
    }
    
    if (rightCol.includes(currentIndex) === false && currentIndex <= 15 === false && (emptyCells.includes(cellTopRight) || numCells.includes(cellTopRight))) {
        document.getElementById(`cell${cellTopRight}`).click()
    }

    if (leftCol.includes(currentIndex) === false && currentIndex <= 15 === false && (emptyCells.includes(cellTopLeft) || numCells.includes(cellTopLeft))) {
        document.getElementById(`cell${cellTopLeft}`).click()
    }
    
    if (rightCol.includes(currentIndex) === false && currentIndex >= 240 === false && (emptyCells.includes(cellBottomRight) || numCells.includes(cellBottomRight))) {
        document.getElementById(`cell${cellBottomRight}`).click()
    }

    if (leftCol.includes(currentIndex) === false && currentIndex >= 240 === false && (emptyCells.includes(cellBottomLeft) || numCells.includes(cellBottomLeft))) {
        document.getElementById(`cell${cellBottomLeft}`).click()
    }
}

const popSound = document.getElementById('pop_sound')
const balloon = document.querySelector('.balloon')

// I know there is a better way to do this than adding an event listener
// every cell but I did not have time to figure it out

let cellDiv = document.querySelectorAll('.cell')

// Regular click:

cellDiv.forEach(hiddenCell => {
    hiddenCell.addEventListener('click', (e) => {
        let cellID = e.currentTarget.id

        if (e.target.innerHTML === '<img src="images/cup-cake.png" alt="cupcake" id="cupcake">') {
            return
        }

        if (e.target.classList.contains('visible_cell')) {
            return
        }

        let currentIndex

        if (cellID.length === 5) {
            // Extracts last character (e.g. index)
            // Note this is a string without parseInt()
            currentIndex = parseInt(cellID.slice(-1))

            if (emptyCells.includes(currentIndex)) {
                revealAdjEmpties(currentIndex)
            }
        } else if (cellID.length === 6) {
            // Extracts last 2 characters etc
            currentIndex = parseInt(cellID.slice(-2))
            
            if (emptyCells.includes(currentIndex)) {
                revealAdjEmpties(currentIndex)
            }
        } else if (cellID.length === 7) {
            currentIndex = parseInt(cellID.slice(-3))
            
            if (emptyCells.includes(currentIndex)) {
                revealAdjEmpties(currentIndex)
            }
        }

        if (allCells.includes(currentIndex)) {
            e.currentTarget.classList.remove('evencell', 'oddcell')
            e.currentTarget.classList.add('visible_cell')
            popSound.play()
            console.log('You lose! Refresh to play again')

            // looping over the array containing bombs
            // need to change array name but currently no time
            for (let i = 0; i < allCells.length; i++) {
                let bombCell = allCells[i]
                let bombDiv = document.querySelector(`div#cell${bombCell}`)
                bombDiv.click()
            }
        } else {
            e.target.classList.remove('evencell', 'oddcell')
            e.target.classList.add('visible_cell')
        }
    })
})

// Right click flagging:

// Note that this is currently buggy if clicking on a cupcake image, 
// but I think I'll be able to debug it if I just add some checks to see 
// if e.target.tagName = 'IMG' or not so I can target the parent if needed

// It still works if clicking on the containing div.

cellDiv.forEach(hiddenCell => {
    hiddenCell.addEventListener('contextmenu', (e) => {
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
        if (e.currentTarget.classList.contains('flagged') && allCells.includes(currentIndex)) {
            console.log('We are in the first condition')
            e.target.classList.remove('flagged')

            let randomBalloon = Math.floor(Math.random() * 6)
            document.getElementById(`cell${currentIndex}`).innerHTML = `<img src="images/balloon${randomBalloon}.png" alt="balloon" class="balloon">`
        // If the div is already flagged and it is a numbered square
        // remove flagged class from the div and recalculate the numbers
        // to re-add the number to the DOM 
        } else if (e.currentTarget.classList.contains('flagged') && numCells.includes(currentIndex)) {
            console.log('We are in the second condition')
            e.target.classList.remove('flagged')
            
            calculateNums()
        // If the target is flagged and is not in 
        // the bombs array or the numbers array, it was empty and
        // needs to be reset to empty
        } else if (e.currentTarget.classList.contains('flagged')) {
            console.log('We are in the third condition')
            document.getElementById(`cell${currentIndex}`).innerHTML = ''
            e.target.classList.remove('flagged')
        // If the target was not flagged, add class flagged and
        // set innerHTML to add cupcake to the DOM, replacing number or bomb
        } else {
            console.log('We are in the last condition')
            e.target.classList.add('flagged')
            e.target.innerHTML = '<img src="images/cup-cake.png" alt="cupcake" class="cupcake_img">'
        }
    })
})