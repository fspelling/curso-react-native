import { POST_ADD } from './actionTypes';

export const addPost = (post) => {
    return {
        type: POST_ADD,
        payload: post
    };
}