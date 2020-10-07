let col0, col1, col2, col3,
col4, col5, col6, col7,
col8, col9, col10, col11,
col12, col13, col14, col15 = []

let tempArray = []

function generateBombs () {
    while (tempArray.length < 40) {
        // returns a random number from 0 to 15
        let randomCol = Math.floor(Math.random() * 16)
        let randomIndex = Math.floor(Math.random() * 16)

        // console.log(tempArray.includes(`${randomCol} + ${randomIndex}`))

        if (tempArray.includes(`${randomCol} + ${randomIndex}`) === false) {
            tempArray.push(`${randomCol} + ${randomIndex}`)

            let targetCol = document.getElementById(`col${randomCol}`)
            targetCol.querySelector(`.square${randomIndex}`).innerHTML = 0
        }
    }
}

document.querySelector('button').addEventListener('click', generateBombs)