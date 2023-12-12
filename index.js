const gridSize = {
    x: 0,
    y: 0,
}

const allowedCommands = ['F', 'L', 'R']

const compassPoints = ['N', 'E', 'S', 'W']

const readline = require('node:readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

const moveForwards = (coordinates, heading) => {
    switch (heading) {
        case 'N':
            coordinates.y += 1
            break
        case 'E':
            coordinates.x += 1
            break
        case 'S':
            coordinates.y -= 1
            break
        case 'W':
            coordinates.x -= 1
            break
    }

    return [coordinates, heading]
}

const turnLeft = (heading) => {
    const reversedCompassPoints = compassPoints.slice(0).reverse()
    const compassIndex = reversedCompassPoints.indexOf(heading)
    const newHeading =
        reversedCompassPoints[(compassIndex + 1) % reversedCompassPoints.length]

    return newHeading
}

const turnRight = (heading) => {
    const compassIndex = compassPoints.indexOf(heading)
    const newHeading = compassPoints[(compassIndex + 1) % compassPoints.length]

    return newHeading
}

const moveFromStartingPosition = (gridSize) => {
    // TODO: validate input string is letters and numbers, convert uppercase etc.
    readline.question(
        `Enter start position for next robot (within ${gridSize.x},${gridSize.y}): `,
        (startPosition) => {
            console.log(`Setting start position ${startPosition}`)

            const startPosArr = startPosition.split(' ') // x y heading
            let currentCoordinates = {
                x: parseInt(startPosArr[0]),
                y: parseInt(startPosArr[1]),
            }
            let currentHeading = startPosArr[2]

            readline.question('Enter command string: ', (command) => {
                console.log(`Moving ${command}`)

                command.split('').forEach((command) => {
                    if (!allowedCommands.includes(command)) {
                        console.error(
                            'Command not allowed, skipping to next command'
                        )
                    } else {
                        switch (command) {
                            case 'F':
                                console.log('moving forwards')
                                ;[currentCoordinates, currentHeading] =
                                    moveForwards(
                                        currentCoordinates,
                                        currentHeading
                                    )

                                console.log(currentCoordinates)
                                break
                            case 'L':
                                console.log('turning left')
                                currentHeading = turnLeft(currentHeading)
                                console.log('new heading ' + currentHeading)
                                break
                            case 'R':
                                console.log('turning right')
                                currentHeading = turnRight(currentHeading)
                                console.log('new heading ' + currentHeading)
                                break
                        }
                    }
                })

                console.log('final position:')
                console.log(currentCoordinates, currentHeading)
                moveFromStartingPosition(gridSize)
            })
        }
    )
}

readline.question('Enter grid max coordinates: ', (gridMaxCoordinates) => {
    console.log(`Setting grid size ${gridMaxCoordinates}`)

    const gridSizeCoordinates = gridMaxCoordinates.split(' ')
    gridSize.x = gridSizeCoordinates[0]
    gridSize.y = gridSizeCoordinates[1]

    moveFromStartingPosition(gridSize)
})
