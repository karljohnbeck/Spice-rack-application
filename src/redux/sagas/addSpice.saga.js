import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* addSpice(action) {
  try {
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    yield axios.post('/api/spicelist', action.payload);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'FETCH_SPICELIST'});
  } catch (error) {
    console.log('addSpice post request failed', error);
  }
}

function* addSpiceSaga() {
  yield takeLatest('ADD_SPICE', addSpice);
}

export default addSpiceSaga