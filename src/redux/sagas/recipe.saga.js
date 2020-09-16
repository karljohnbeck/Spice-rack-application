import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchRecipes (action) {
    try{
        let response = yield axios.get(`/api/recipe/${action.payload}`);
        yield put({type: 'SET_RECIPES', payload: response.data.hits})
    } catch (error) {
        console.log('error in fetchUserInfo saga ', error)
    }
}

function* fetchRecipesSaga() {
    yield takeLatest('FETCH_RECIPE', fetchRecipes)
}

export default fetchRecipesSaga;
