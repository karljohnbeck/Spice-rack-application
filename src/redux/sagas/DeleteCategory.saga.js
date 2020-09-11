import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* deleteCategory(action) {
  try {

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    yield axios.delete(`/api/categorieslist/${action.payload}`, action.payload);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'FETCH_CATEGORIES'});
  } catch (error) {
    console.log('delete category post request failed', error);
  }
}

function* deleteCategorySaga() {
  yield takeLatest('DELETE_CATEGORY', deleteCategory);
}

export default deleteCategorySaga