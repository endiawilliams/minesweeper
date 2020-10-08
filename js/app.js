// let allColumns = [
//     [], [], [], [],
//     [], [], [], [],
//     [], [], [], [],
//     [], [], [], []
// ]

// function generateBombs () {
//     let count = 0
//     while (count < 40) {
//         // returns a random number from 0 to 15
//         let randomCol = Math.floor(Math.random() * 16)
//         let randomIndex = Math.floor(Math.random() * 16)

//         if (allColumns[randomCol].includes(randomIndex) === false) {
//             allColumns[randomCol].push(randomIndex)
//             count += 1

//             let columnDiv = document.getElementById(`col${randomCol}`)
//             columnDiv.querySelector(`.square${randomIndex}`).innerHTML = 0
//         }
//     }
// }

// generateBombs()

// function generateNums () {
//     allColumns.forEach(element => {
//         let colArray = element
//         let colArrayIndex = element.indexOf
//         element.forEach(element => {
//             // typeof returns number for both element and bombSquare
//             // and columnArray[bombIndex] works
//             let bombIndex = element.indexOf
//             let squareAbove = element - 1
//             let colDiv = document.getElementById(`col${colArrayIndex}`)
            
//             // If the above square is empty AND this bomb is not on the top 
//             // row mark as numbered (refactor with ! not operator, not sure 
//             // how to make it work)
//             if (colArray.includes(squareAbove) === false && bombIndex !== 0) {
//                 console.log(colDiv.querySelector(`.square1`).innerHTML)
//                 console.log(colDiv.querySelector(`.square${squareAbove}`))
//             // If the bomb is on the top row
//             } else if (bombIndex === 0) {
                
//             // If the the square above the bomb has another bomb
//             } else if (colArray.includes(squareAbove)) {
                
//             }
//         })
//     })
// }

// generateNums()

// New code starts here

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