const gridSize = {
    x: 0,
    y: 0,
}

const allowedCommands = ['F', 'L', 'R']

const compassPoints = ['N', 'E', 'S', 'W']

const offGridPoints = []

const readline = require('node:readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

const moveForwards = (coordinates, heading) => {
    let newCoordinates = { ...coordinates }
    let lost = false
    switch (heading) {
        case 'N':
            newCoordinates.y += 1
            break
        case 'E':
            newCoordinates.x += 1
            break
        case 'S':
            newCoordinates.y -= 1
            break
        case 'W':
            newCoordinates.x -= 1
            break
    }

    if (
        offGridPoints.find(
            (coord) =>
                coord.x === newCoordinates.x && coord.y === newCoordinates.y
        )
    ) {
        // ignore this, we;re about to lose the robot!
        newCoordinates = { ...coordinates }
    }
    if (
        newCoordinates.y < 0 ||
        newCoordinates.x < 0 ||
        newCoordinates.y > gridSize.y ||
        newCoordinates.x > gridSize.x
    ) {
        console.log('LOST')
        offGridPoints.push(newCoordinates) // add the coordinate that caused the robot to go off grid
        newCoordinates = { ...coordinates }
        lost = true
    }

    return [newCoordinates, heading, lost]
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

                if (command.length > 100) {
                    console.error('Command is too long (max 100)')
                    //TODO: throw error
                    // TODO: put parameter constants in consts
                }

                let isLost = false

                command.split('').forEach((command) => {
                    console.log(isLost)
                    if (!allowedCommands.includes(command)) {
                        console.error(
                            'Command not allowed, skipping to next command'
                        )
                    } else if (isLost) {
                    } else {
                        switch (command) {
                            case 'F':
                                console.log('moving forwards')
                                ;[currentCoordinates, currentHeading, isLost] =
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

                console.log('final position: ')
                console.log(
                    `${currentCoordinates.x} ${
                        currentCoordinates.y
                    } ${currentHeading}${isLost ? ' LOST' : ''}`
                )
                moveFromStartingPosition(gridSize)
            })
        }
    )
}

readline.question('Enter grid max coordinates: ', (gridMaxCoordinates) => {
    console.log(`Setting grid size ${gridMaxCoordinates}`)

    const gridSizeCoordinates = gridMaxCoordinates
        .split(' ')
        .map((coordinate) => parseInt(coordinate))

    if (gridSizeCoordinates[0] > 50 || gridSizeCoordinates[1] > 50) {
        console.error('Exceeded allowed grid size')
        //TODO: throw new error
    } else {
        gridSize.x = gridSizeCoordinates[0]
        gridSize.y = gridSizeCoordinates[1]

        moveFromStartingPosition(gridSize)
    }
})
