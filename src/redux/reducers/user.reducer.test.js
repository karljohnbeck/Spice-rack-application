import user from './user.reducer';


describe('TESTING USER REDUCER', () => {
    // initialization

    test('initial state is an object', () => {
        let testAction = {};
        let returnedState = user(undefined, testAction);

        expect(returnedState).toEqual({})
    })

    test('SET_USER will correctly set payload', () => {
        let testPayload = {
            username: 'test',
            id: 1
        }

        let testAction = {
            type: 'SET_USER',
            payload: testPayload
        };

        let returnedState = user({}, testAction);

        expect(returnedState).toEqual(testPayload)
    })

    test('UNSET_USER will correctly empty', () => {
        
        let testAction = {
            type: 'UNSET_USER',
            payload: {}
        };

        let returnedState = user({}, testAction);

        expect(returnedState).toEqual({})
    })

    test('ANYTHING will correctly do nothing', () => {
        
        let testAction = {
            type: 'ANYTHING',
            payload: {}
        };

        let returnedState = user({}, testAction);

        expect(returnedState).not.toEqual(testAction)
    })
})