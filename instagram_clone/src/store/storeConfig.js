import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/user';
import postReducer from './reducers/post';

const reducers = combineReducers({
    user: userReducer,
    posts: postReducer
});

export default storeConfig = () => {
    return createStore(reducers);
}