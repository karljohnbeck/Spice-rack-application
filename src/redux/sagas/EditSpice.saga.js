import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* storeSpiceForEdit(action) {
  try{
    const response = yield axios.get('/api/spicelist');
    let uniq = yield {}
    yield response.data.map((spice, i) => {
        console.log(spice)
        if (spice.id == action.payload) {
            uniq = spice
        }
    })  
    yield put({ type: 'STORE_SPICE_FOR_EDIT', payload: uniq});
  } catch (error) {
    console.log('error in storeSpiceForEdit', error)
  }
}

function* editSpiceSaga() {
  yield takeLatest('STORE_CLICKED_SPICE', storeSpiceForEdit)
  }

export default editSpiceSaga;
