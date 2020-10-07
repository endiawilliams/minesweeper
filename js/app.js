let allColumns = [
    [], [], [], [],
    [], [], [], [],
    [], [], [], [],
    [], [], [], []
]

function generateBombs () {
    let count = 0
    while (count < 40) {
        // returns a random number from 0 to 15
        let randomCol = Math.floor(Math.random() * 16)
        let randomIndex = Math.floor(Math.random() * 16)

        if (allColumns[randomCol].includes(randomIndex) === false) {
            allColumns[randomCol].push(randomIndex)
            count += 1

            let targetCol = document.getElementById(`col${randomCol}`)
            targetCol.querySelector(`.square${randomIndex}`).innerHTML = 0
        }
    }
}

generateBombs()

function generateNums () {
    allColumns.forEach(element => {
        let column = element
        element.forEach(element => {
            let bombSquare = element
            
        })
    })
}

generateNums()