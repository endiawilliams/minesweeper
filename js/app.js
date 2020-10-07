let allColumns = [
    [], [], [], [],
    [], [], [], [],
    [], [], [], [],
    [], [], [], []
]

let tempArray = []

function generateBombs () {
    while (tempArray.length < 40) {
        // returns a random number from 0 to 15
        let randomCol = Math.floor(Math.random() * 16)
        let randomIndex = Math.floor(Math.random() * 16)

        if (allColumns[randomCol].includes(randomIndex) === false) {
            tempArray.push(`${randomCol} + ${randomIndex}`)
            allColumns[randomCol].push(randomIndex)

            let targetCol = document.getElementById(`col${randomCol}`)
            // targetCol.querySelector(`.square${randomIndex}`).innerHTML = B
        }
    }
}

generateBombs()

function generateNums () {

}