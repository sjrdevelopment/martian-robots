import { turnLeft } from './movements.js'

const compassPoints = ['N', 'E', 'S', 'W']
// TODO: are compassPoints just used for turning? can keep black-boxed in movements.js

test('Turn left moves one compass point anti-clockwise', () => {
    expect(turnLeft('N', compassPoints)).toBe('W')
    expect(turnLeft('E', compassPoints)).toBe('N')
    expect(turnLeft('S', compassPoints)).toBe('E')
    expect(turnLeft('W', compassPoints)).toBe('S')
})

test('Turn left passes with lowercase letter input', () => {
    expect(turnLeft('n', compassPoints)).toBe('W')
})

test('Turn left fails with invalid compass point', () => {
    expect(() => turnLeft('X', compassPoints)).toThrow('invalid compass point')
})
