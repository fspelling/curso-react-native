import { POST_ADD, COMMENT_ADD } from './actionTypes';
import axios from 'axios';

export const addPost = (post) => {
    return async (dispatch) => {
        try {
            const resp = await axios({
                url: 'uploadImage/',
                baseURL: 'https://us-central1-lambe-f0a43.cloudfunctions.net/',
                method: 'post',
                data: {
                    image: post.image.base64
                }
            });

            post.image = resp.data.imageUrl;
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