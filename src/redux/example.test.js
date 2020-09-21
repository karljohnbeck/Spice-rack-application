// addinator

import addinator from './addinator'

describe('CHECKING ADDINATOR', () => {

    test('sum of 1 and 2 is 3', () => {
        expect(addinator(1,2)).toBe(3)
    })

    test('one number returns self', () => {
        expect(addinator(1)).toBe(1)
    }) 

    test('negative', () => {
        expect(addinator(-1, 2)).toBe(1)
    }) 

    test('decimals to work', () => {
        expect(addinator(1.5, 2)).toBe(3.5)
    }) 

    test('string incorrect input', () => {
        expect(addinator('1', 2)).toBe(3)
    }) 
})