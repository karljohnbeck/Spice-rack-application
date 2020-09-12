import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* editCategory(action) {
  try{
    yield axios.put(`/api/categorieslist/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_CATEGORIES',});
  } catch (error) {
    console.log('error in editCategory', error)
  }
}

function* editCategorySaga() {
  yield takeLatest('EDIT_CATEGORY', editCategory)
  }

export default editCategorySaga;