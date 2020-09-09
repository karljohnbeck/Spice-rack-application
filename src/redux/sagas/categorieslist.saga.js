import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchSpiceList() {
  try {
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/categorieslist');

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_CATEGORIES', payload: response.data });

    //AFTER we have al the categories, some drop downs unique categories,
    // so this these store unique categories in a reducer. 
    const uniq = yield {}
    const arrFiltered = yield response.data.filter(obj => !uniq[obj.id] && (uniq[obj.id] = true));
    yield put ({ type: 'SET_UNIQUE_CATEGORIES', payload: arrFiltered})
    
  } catch (error) {
    console.log('SpiceList get request failed', error);
  }
}

function* categoriesListSaga() {
  yield takeLatest('FETCH_CATEGORIES', fetchSpiceList);
}

export default categoriesListSaga;
