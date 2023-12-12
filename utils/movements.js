const compassPoints = ['N', 'E', 'S', 'W']

const offGridPoints = []

const moveForward = (coordinates, heading, gridSize) => {
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
        // ignore this, we're about to lose the robot!
        newCoordinates = { ...coordinates }
    } else if (
        newCoordinates.y < 0 ||
        newCoordinates.x < 0 ||
        newCoordinates.y > gridSize.y ||
        newCoordinates.x > gridSize.x
    ) {
        offGridPoints.push(newCoordinates)
        newCoordinates = { ...coordinates }
        lost = true
    }

    return [newCoordinates, lost]
}

const turnLeft = (heading) => {
    const reversedCompassPoints = compassPoints.slice(0).reverse()
    const compassIndex = reversedCompassPoints.indexOf(heading.toUpperCase())

    if (compassIndex < 0) {
        throw new Error(`invalid compass point`)
    }
    const newHeading =
        reversedCompassPoints[(compassIndex + 1) % reversedCompassPoints.length]

    return newHeading
}

const turnRight = (heading) => {
    const compassIndex = compassPoints.indexOf(heading.toUpperCase())
    if (compassIndex < 0) {
        throw new Error(`invalid compass point`)
    }

    const newHeading = compassPoints[(compassIndex + 1) % compassPoints.length]

    return newHeading
}

export { turnRight, turnLeft, moveForward }
