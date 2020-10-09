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

let cellDiv = document.querySelectorAll('.cell')

function revealAdjEmpties (currentIndex) {
        // let divAtCurrentIndex = document.querySelector(`#cell${currentIndex}`)

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
        console.log(`We're checking ${currentIndex} for cellAbove which is ${cellAbove}`)
        document.getElementById(`cell${cellAbove}`).click()
        // document.querySelector(`#cell${cellAbove}`).classList.remove('evencell', 'oddcell')
        // document.querySelector(`#cell${cellAbove}`).classList.add('visible_cell')
    }

    if (currentIndex >= 240 === false && (emptyCells.includes(cellBelow) || numCells.includes(cellBelow))) {
        console.log(`We're checking ${currentIndex} for cellBelow which is ${cellBelow}`)
        document.getElementById(`cell${cellBelow}`).click()
        // document.querySelector(`#cell${cellBelow}`).classList.remove('evencell', 'oddcell')
        // document.querySelector(`#cell${cellBelow}`).classList.add('visible_cell')
    }

    if (rightCol.includes(currentIndex) === false && (emptyCells.includes(cellRight) || numCells.includes(cellRight))) {
        console.log(`We're checking ${currentIndex} for cellRight which is ${cellRight}`)
        document.getElementById(`cell${cellRight}`).click()
        // document.querySelector(`#cell${cellRight}`).classList.remove('evencell', 'oddcell')
        // document.querySelector(`#cell${cellRight}`).classList.add('visible_cell')
    }

    if (leftCol.includes(currentIndex) === false && (emptyCells.includes(cellLeft) || numCells.includes(cellLeft))) {
        console.log(`We're checking ${currentIndex} for cellLeft which is ${cellLeft}`)
        document.getElementById(`cell${cellLeft}`).click()
        // document.querySelector(`#cell${cellLeft}`).classList.remove('evencell', 'oddcell')
        // document.querySelector(`#cell${cellLeft}`).classList.add('visible_cell')
    }
    
    if (rightCol.includes(currentIndex) === false && currentIndex <= 15 === false && (emptyCells.includes(cellTopRight) || numCells.includes(cellTopRight))) {
        console.log(`We're checking ${currentIndex} for cellTopRight which is ${cellTopRight}`)
        document.getElementById(`cell${cellTopRight}`).click()
        // document.querySelector(`#cell${cellTopRight}`).classList.remove('evencell', 'oddcell')
        // document.querySelector(`#cell${cellTopRight}`).classList.add('visible_cell')
    }

    if (leftCol.includes(currentIndex) === false && currentIndex <= 15 === false && (emptyCells.includes(cellTopLeft) || numCells.includes(cellTopLeft))) {
        console.log(`We're checking ${currentIndex} for cellTopLeft which is ${cellTopLeft}`)
        document.getElementById(`cell${cellTopLeft}`).click()
        // document.querySelector(`#cell${cellTopLeft}`).classList.remove('evencell', 'oddcell')
        // document.querySelector(`#cell${cellTopLeft}`).classList.add('visible_cell')
    }
    
    if (rightCol.includes(currentIndex) === false && currentIndex >= 240 === false && (emptyCells.includes(cellBottomRight) || numCells.includes(cellBottomRight))) {
        console.log(`We're checking ${currentIndex} for cellBottomRight which is ${cellBottomRight}`)
        document.getElementById(`cell${cellBottomRight}`).click()
        // document.querySelector(`#cell${cellBottomRight}`).classList.remove('evencell', 'oddcell')
        // document.querySelector(`#cell${cellBottomRight}`).classList.add('visible_cell')
    }

    if (leftCol.includes(currentIndex) === false && currentIndex >= 240 === false && (emptyCells.includes(cellBottomLeft) || numCells.includes(cellBottomLeft))) {
        console.log(`We're checking ${currentIndex} for cellBottomLeft which is ${cellBottomLeft}`)
        document.getElementById(`cell${cellBottomLeft}`).click()
        // document.querySelector(`#cell${cellBottomLeft}`).classList.remove('evencell', 'oddcell')
        // document.querySelector(`#cell${cellBottomLeft}`).classList.add('visible_cell')
    }

    console.log("We're at the end of revealAdjEmpties")
}

const popSound = document.getElementById('pop_sound')
const balloon = document.querySelector('.balloon')

// I know there is a better way to do this than adding an event listener
// every cell but I did not have time to figure it out

cellDiv.forEach(hiddenCell => {
    hiddenCell.addEventListener('click', (e) => {
        let cellID = e.target.id

        if (e.target.classList.contains('visible_cell')) {
            return
        }

        if (cellID.length === 5) {
            // Extracts last character (e.g. index)
            // Note this is a string without parseInt()
            let currentIndex = parseInt(cellID.slice(-1))

            console.log("We're in cellID length 5")

            if (emptyCells.includes(currentIndex) && e.target) {
                revealAdjEmpties(currentIndex)
            }
        } else if (cellID.length === 6) {
            // Extracts last 2 characters etc
            let currentIndex = parseInt(cellID.slice(-2))

            console.log("We're in cellID length 6")
            
            if (emptyCells.includes(currentIndex)) {
                revealAdjEmpties(currentIndex)
            }
        } else if (cellID.length === 7) {
            let currentIndex = parseInt(cellID.slice(-3))

            console.log("We're in cellID length 7")
            
            if (emptyCells.includes(currentIndex)) {
                revealAdjEmpties(currentIndex)
            }
        }

        if (e.target.tagName === 'IMG') {
            e.target.parentNode.classList.remove('evencell', 'oddcell')
            e.target.parentNode.classList.add('visible_cell')
            popSound.play()
            alert('You lose! Click the refresh button to play again')
        } else {
            e.target.classList.remove('evencell', 'oddcell')
            e.target.classList.add('visible_cell')
            // bug: cannot figure out how to make balloon sound work unless
            // user clicks on the actual balloon image and not the div it's contained in
        }
    })
})