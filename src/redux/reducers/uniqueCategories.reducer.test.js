import uniqueCategories from './uniqueUserCategories.reducer';


describe('TESTING uniqueCategories REDUCER', () => {
    // initialization

    test('initial state is an object', () => {
        let testAction = [];
        let returnedState = uniqueCategories(undefined, testAction);

        expect(returnedState).toEqual([])
    })

    test('SET_USER will correctly set payload', () => {
        let testPayload = [ 'sadf', 'asdfasdf']

        let testAction = {
            type: 'SET_UNIQUE_CATEGORIES',
            payload: testPayload
        };

        let returnedState = uniqueCategories([], testAction);

        expect(returnedState).toEqual(testPayload)
    })

    test('UNSET_USER will correctly empty', () => {
        
        let testAction = [{
            type: 'UNSET_USER',
            payload: {}
        }];

        let returnedState = uniqueCategories([], testAction);

        expect(returnedState).toEqual([])
    })

    test('ANYTHING will correctly do nothing', () => {
        
        let testAction = {
            type: 'ANYTHING',
            payload: {}
        };

        let returnedState = uniqueCategories([], testAction);

        expect(returnedState).not.toEqual(testAction)
    })
})