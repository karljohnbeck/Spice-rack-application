import recipe from './spiceList.reducer';

describe('TESTING uniqueCategories REDUCER', () => {
    // initialization

    test('initial state is an object', () => {
        let testAction = [];
        let returnedState = recipe(undefined, testAction);

        expect(returnedState).toEqual([])
    })

    test('SET_RECIPES will correctly set payload', () => {
        let testPayload = []

        let testAction = {
            type: 'SET_RECIPES',
            payload: testPayload
        };

        let returnedState = recipe([], testAction);

        expect(returnedState).toEqual(testPayload)
    })

    test('UNSET_USER will correctly empty', () => {
        
        let testAction = [{
            type: 'UNSET_USER',
            payload: {}
        }];

        let returnedState = recipe([], testAction);

        expect(returnedState).toEqual([])
    })

    test('ANYTHING will correctly do nothing', () => {
        
        let testAction = {
            type: 'ANYTHING',
            payload: {}
        };

        let returnedState = recipe([], testAction);

        expect(returnedState).not.toEqual(testAction)
    })
})