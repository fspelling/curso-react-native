import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import userReducer from './reducers/user';
import postReducer from './reducers/post';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    user: userReducer,
    posts: postReducer
});

export default storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)));
}