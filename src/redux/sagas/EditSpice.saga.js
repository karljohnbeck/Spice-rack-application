import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* editSpice(action) {
  try{
    yield axios.put(`/api/spicelist/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_SPICELIST',});
    yield put({ type: 'FETCH_CATEGORIES',});
  } catch (error) {
    console.log('error in storeSpiceForEdit', error)
  }
}

function* editSpiceSaga() {
  yield takeLatest('EDIT_SPICE', editSpice)
  }

export default editSpiceSaga;
