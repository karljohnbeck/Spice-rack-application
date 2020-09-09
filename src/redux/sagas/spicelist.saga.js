import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchSpiceList() {
  try {
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/spicelist');
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_SPICELIST', payload: response.data });
  } catch (error) {
    console.log('SpiceList get request failed', error);
  }
}

function* deleteSpice(action) {
  try {
   
    yield axios.delete(`/api/spicelist/${action.payload}`);
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'FETCH_SPICELIST',});
} catch (error) {
  console.log('SpiceList delete request failed', error);
}
}

// function* storeSpiceForEdit(action) {
//   try{
//     yield put({ type: 'STORE_SPICE_FOR_EDIT', payload: action.payload});
//   } catch (error) {
//     console.log('error in storeSpiceForEdit', error)
//   }
// }

function* spiceListSaga() {
  yield takeLatest('FETCH_SPICELIST', fetchSpiceList);
  yield takeLatest('DELETE_SPICE', deleteSpice);
  // yield takeLatest('STORE_CLICKED_SPICE', storeSpiceForEdit)
  }


export default spiceListSaga;
