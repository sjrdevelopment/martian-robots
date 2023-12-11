const readline = require('node:readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

const moveFromStartingPosition = (gridSize) => {
    readline.question(
        `Enter start position for next robot (within ${gridSize}): `,
        (startCoordinates) => {
            console.log(`Setting start position ${startCoordinates}`)

            readline.question('Enter command string: ', (command) => {
                console.log(`Moving ${command}`)

                moveFromStartingPosition(gridSize)
            })
        }
    )
}

readline.question('Enter grid max coordinates: ', (gridSize) => {
    console.log(`Setting grid size ${gridSize}`)
    moveFromStartingPosition(gridSize)
})
