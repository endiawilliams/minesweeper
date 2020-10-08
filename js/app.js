let allCells = []

function generateBombs () {
    let count = 0
    while (count < 40) {
        // returns a random number from 0 to 255
        let randomCell = Math.floor(Math.random() * 256)

        if (allCells.includes(randomCell) === false) {
            allCells.push(randomCell)
            count += 1

            document.getElementById(`cell${randomCell}`).innerHTML = 0
        }
    }
}

generateBombs()

let numCells = []

function generateNums () {
    for (let i = 0; i < 40; i++) {
        let bombCell = allCells[i]
        console.log(bombCell)

        const rightCol = [
            15, 31, 47, 63, 79, 95, 111, 127, 
            143, 159, 175, 191, 207, 223, 239, 255
        ]

        const leftCol = [
            0, 16, 32, 48, 64, 80, 96, 112, 
            128, 144, 160, 176, 192, 208, 224, 240
        ]

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