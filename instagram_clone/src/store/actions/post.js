import { SET_POST, COMMENT_ADD, CREATING_POST, CREATED_POST } from './actionTypes';
import axios from 'axios';

export const addPost = (post) => {
    return async (dispatch) => {
        try {
            dispatch(creatingPost());

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

            dispatch(getPosts());
            dispatch(createdPost());
        } catch (error) {
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

export const getPosts = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/posts.json');
            const rawPosts = res.data;
            const posts = [];

            for (let key in rawPosts)
                posts.push({ ...rawPosts[key], id: key });
            
            dispatch(setPost(posts.reverse()));
        } catch (error) {
            console.log(error);
        }
    }
}

export const creatingPost = () => {
    return {
        type: CREATING_POST
    };
}

export const createdPost = () => {
    return {
        type: CREATED_POST
    };
}

const setPost = (posts) => {
    return {
        type: SET_POST,
        payload: posts
    };
}
