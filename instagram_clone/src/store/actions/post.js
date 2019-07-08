import { SET_POST, CREATING_POST, CREATED_POST } from './actionTypes';
import axios from 'axios';
import { setMessage } from './message';

export const addPost = (post) => {
    return async (dispatch, getState) => {
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
            await axios.post(`/posts.json?auth=${getState().user.token}`, { ...post });

            dispatch(getPosts());
            dispatch(createdPost());
        } catch (error) {
            dispatch(setMessage({ title: 'Erro', message: `Erro: ${error}` }));
        }
    }
}

export const addComment = (payload, getState) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/posts/${payload.idPost}.json?auth=${getState().user.token}`);
            if (res) {
                const comments = res.data.comments || [];
                comments.push(payload.comment);

                await axios.patch(`/posts/${payload.idPost}.json`, { comments });
                dispatch(getPosts());
            }
        } catch (error) {
            dispatch(setMessage({ title: 'Erro', message: `Erro: ${error}` }));
        }
    }
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
            dispatch(setMessage({ title: 'Erro', message: `Erro: ${error}` }));
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
