import { USER_LOGGED_IN, USER_LOGGED_OUT, LOADING_USER, USER_LOADED } from './actionTypes';
import axios from 'axios';
import { setMessage } from './message';

const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
const API_KEY = 'AIzaSyA27HgWmLVIfXCJVZDbnV2B_vT3ieT5Jlw';

export const userLogged = (user) => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    };
}

export const logout = () => {
    return {
        type: USER_LOGGED_OUT
    };
}

export const createUser = (user) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`, {
                email: user.email,
                password: user.password,
                returnSecureToken: true
            });

            if (res.data.localId) {
                await axios.put(`/users/${res.data.localId}.json`, { name: user.name });
                dispatch(login(user));
            }
        } catch (error) {
            dispatch(setMessage({ title: 'Erro', message: `Erro: ${error}` }));
        }
    }
}

export const loadingUser = () => {
    return {
        type: LOADING_USER
    };
}

export const userLoaded = () => {
    return {
        type: USER_LOADED
    };
}

export const login = (user) => {
    return async (dispatch) => {
        dispatch(loadingUser());

        try {
            const res = await axios.post(`${authBaseURL}/verifyPassword?key=${API_KEY}`, {
                email: user.email,
                password: user.password,
                returnSecureToken: true
            });

            if (res.data.localId) {
                user.token = res.data.idToken;
                const userRes = await axios.get(`users/${res.data.localId}.json`);
                user.name = userRes.data.name;
                user.password = null;

                dispatch(userLogged(user));
                dispatch(userLoaded());
            }
        } catch (error) {
            dispatch(setMessage({ title: 'Erro', message: `Erro: ${error}` }));
        }
    }
}