import categoriesList from './categoriesList.reducer';

describe('TESTING uniqueCategories REDUCER', () => {
    // initialization

    test('initial state is an object', () => {
        let testAction = [];
        let returnedState = categoriesList(undefined, testAction);

        expect(returnedState).toEqual([])
    })

    test('SET_CATEGORIES will correctly set payload', () => {
        let testPayload = [{}, {}]

        let testAction = {
            type: 'SET_CATEGORIES',
            payload: testPayload
        };

        let returnedState = categoriesList([], testAction);

        expect(returnedState).toEqual(testPayload)
    })

    test('UNSET_USER will correctly empty', () => {
        
        let testAction = [{
            type: 'UNSET_USER',
            payload: {}
        }];

        let returnedState = categoriesList([], testAction);

        expect(returnedState).toEqual([])
    })

    test('ANYTHING will correctly do nothing', () => {
        
        let testAction = {
            type: 'ANYTHING',
            payload: {}
        };

        let returnedState = categoriesList([], testAction);

        expect(returnedState).not.toEqual(testAction)
    })
})