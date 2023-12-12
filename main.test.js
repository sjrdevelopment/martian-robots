import { moveFromStartingPosition, gridSize } from './index.js'

gridSize.x = 5
gridSize.y = 3

describe('Calling moveFromStartingPosition returns updated position', () => {
    test('moveFromStartingPosition updates position on-grid where expected', () => {
        expect(moveFromStartingPosition('RFRFRFRF', { x: 1, y: 1 }, 'E')).toBe(
            '1 1 E'
        )
    })

    test('moveFromStartingPosition returns last position and LOST when moved off-grid', () => {
        expect(
            moveFromStartingPosition('FRRFLLFFRRFLL', { x: 3, y: 2 }, 'N')
        ).toBe('3 3 N LOST')
    })
})
