import { POST_ADD, COMMENT_ADD } from './actionTypes';

export const addPost = (post) => {
    return {
        type: POST_ADD,
        payload: post
    };
}

export const addComment = (comment) => {
    return {
        type: COMMENT_ADD,
        payload: comment
    };
}