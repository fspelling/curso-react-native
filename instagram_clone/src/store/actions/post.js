import { POST_ADD, COMMENT_ADD } from './actionTypes';
import axios from 'axios';

export const addPost = (post) => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/posts.json', { ...post });
            console.debug(res.data);
        } catch(error) {
            console.debug('erro = ', error);
        }
    }
}

export const addComment = (comment) => {
    return {
        type: COMMENT_ADD,
        payload: comment
    };
}