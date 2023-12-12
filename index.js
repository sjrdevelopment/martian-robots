import { turnLeft, turnRight, moveForward } from './utils/movements.js'
import * as readline from 'node:readline'
import { stdin as input, stdout as output } from 'node:process'

const rl = readline.createInterface({
    input,
    output,
})

const allowedCommands = ['F', 'L', 'R']
const commandSizeLimit = 100
const coordinateSizeLimit = 50
const gridSize = {
    x: 0,
    y: 0,
}

const moveFromStartingPosition = (
    command,
    currentCoordinates,
    currentHeading
) => {
    let isLost = false

    command
        .toUpperCase()
        .split('')
        .forEach((command) => {
            if (!allowedCommands.includes(command)) {
                console.error('Command not allowed, skipping to next command')
            } else if (!isLost) {
                switch (command) {
                    case 'F':
                        ;[currentCoordinates, isLost] = moveForward(
                            currentCoordinates,
                            currentHeading,
                            gridSize
                        )
                        break
                    case 'L':
                        currentHeading = turnLeft(currentHeading)
                        break
                    case 'R':
                        currentHeading = turnRight(currentHeading)
                        break
                }
            }
        })

    return `${currentCoordinates.x} ${currentCoordinates.y} ${currentHeading}${
        isLost ? ' LOST' : ''
    }`
}

const getMovementCommand = (currentCoordinates, currentHeading) => {
    rl.question('Enter command string: ', (command) => {
        if (command.length > commandSizeLimit) {
            throw new Error(
                `Command length exceeds limit of ${commandSizeLimit}`
            )
        }

        console.log(
            moveFromStartingPosition(
                command,
                currentCoordinates,
                currentHeading
            )
        )
        getStartingPosition(gridSize)
    })
}

const getStartingPosition = (gridSize) => {
    rl.question(
        `Enter start position for next robot (within ${gridSize.x},${gridSize.y}): `,
        (startPosition) => {
            const startPosArr = startPosition.split(' ') // x y heading
            let currentCoordinates = {
                x: parseInt(startPosArr[0]),
                y: parseInt(startPosArr[1]),
            }
            let currentHeading = startPosArr[2].toUpperCase()

            getMovementCommand(currentCoordinates, currentHeading)
        }
    )
}

const getGridSize = () => {
    rl.question(
        'Enter grid max coordinates separated by a space: ',
        (gridMaxCoordinates) => {
            const gridSizeCoordinates = gridMaxCoordinates
                .split(' ')
                .map((coordinate) => {
                    const returnVal = parseInt(coordinate)

                    if (isNaN(returnVal)) {
                        throw new Error(`Invalid grid coordinate ${coordinate}`)
                    } else {
                        return returnVal
                    }
                })

            if (
                gridSizeCoordinates[0] > coordinateSizeLimit ||
                gridSizeCoordinates[1] > coordinateSizeLimit
            ) {
                throw new Error(
                    `Exceeded allowed grid size of ${coordinateSizeLimit}x${coordinateSizeLimit}`
                )
            } else {
                gridSize.x = gridSizeCoordinates[0]
                gridSize.y = gridSizeCoordinates[1]

                getStartingPosition(gridSize)
            }
        }
    )
}

getGridSize()

export { moveFromStartingPosition, gridSize }
