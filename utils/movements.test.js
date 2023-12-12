import { turnLeft, turnRight, moveForward } from './movements.js'

describe('Turning robot to the left with turnLeft function', () => {
    test('Calling turnLeft moves one compass point anti-clockwise from current heading', () => {
        expect(turnLeft('N')).toBe('W')
        expect(turnLeft('E')).toBe('N')
        expect(turnLeft('S')).toBe('E')
        expect(turnLeft('W')).toBe('S')
    })

    test('Calling turnLeft passes with lowercase letter input', () => {
        expect(turnLeft('n')).toBe('W')
    })

    test('Calling turnLeft fails with invalid compass point', () => {
        expect(() => turnLeft('X')).toThrow('invalid compass point')
    })
})

describe('Turning robot to the right with turnRight function', () => {
    test('Calling turnRight moves one compass point clockwise', () => {
        expect(turnRight('N')).toBe('E')
        expect(turnRight('E')).toBe('S')
        expect(turnRight('S')).toBe('W')
        expect(turnRight('W')).toBe('N')
    })

    test('Calling turnRight passes with lowercase letter input', () => {
        expect(turnRight('n')).toBe('E')
    })

    test('Calling turnRight fails with invalid compass point', () => {
        expect(() => turnRight('X')).toThrow('invalid compass point')
    })
})

describe('Moving forward 1 grid point with moveForward function', () => {
    const startCoordinates = {
        x: 1,
        y: 2,
    }

    const gridSize = {
        x: 5,
        y: 5,
    }

    test('Calling moveForward moves one point in the current heading', () => {
        expect(moveForward(startCoordinates, 'N', gridSize)).toEqual([
            {
                x: 1,
                y: 3,
            },
            false,
        ])

        expect(moveForward(startCoordinates, 'E', gridSize)).toEqual([
            {
                x: 2,
                y: 2,
            },
            false,
        ])

        expect(moveForward(startCoordinates, 'S', gridSize)).toEqual([
            {
                x: 1,
                y: 1,
            },
            false,
        ])

        expect(moveForward(startCoordinates, 'W', gridSize)).toEqual([
            {
                x: 0,
                y: 2,
            },
            false,
        ])
    })

    test('Calling moveForward when going beyond grid results in LOST being returned', () => {
        startCoordinates.x = 0

        expect(moveForward(startCoordinates, 'W', gridSize)).toEqual([
            {
                x: 0,
                y: 2,
            },
            true,
        ])
    })
})
