import { turnLeft, turnRight, moveForwards } from './utils/movements.js'
import * as readline from 'node:readline'
import { stdin as input, stdout as output } from 'node:process'

const gridSize = {
    x: 0,
    y: 0,
}

const allowedCommands = ['F', 'L', 'R']

const compassPoints = ['N', 'E', 'S', 'W']

const offGridPoints = []

const commandSizeLimit = 100
const coordinateSizeLimit = 50

const rl = readline.createInterface({
    input,
    output,
})

const moveFromStartingPosition = (gridSize) => {
    rl.question(
        `Enter start position for next robot (within ${gridSize.x},${gridSize.y}): `,
        (startPosition) => {
            const startPosArr = startPosition.split(' ') // x y heading
            let currentCoordinates = {
                x: parseInt(startPosArr[0]),
                y: parseInt(startPosArr[1]),
            }
            let currentHeading = startPosArr[2].toUpperCase()

            rl.question('Enter command string: ', (command) => {
                if (command.length > commandSizeLimit) {
                    throw new Error(
                        `Command length exceeds limit of ${commandSizeLimit}`
                    )
                }

                let isLost = false

                command
                    .toUpperCase()
                    .split('')
                    .forEach((command) => {
                        if (!allowedCommands.includes(command)) {
                            console.error(
                                'Command not allowed, skipping to next command'
                            )
                        } else if (!isLost) {
                            switch (command) {
                                case 'F':
                                    ;[currentCoordinates, isLost] =
                                        moveForwards(
                                            currentCoordinates,
                                            currentHeading,
                                            offGridPoints,
                                            gridSize
                                        )
                                    break
                                case 'L':
                                    currentHeading = turnLeft(
                                        currentHeading,
                                        compassPoints
                                    )
                                    break
                                case 'R':
                                    currentHeading = turnRight(
                                        currentHeading,
                                        compassPoints
                                    )
                                    break
                            }
                        }
                    })

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

            moveFromStartingPosition(gridSize)
        }
    }
)
