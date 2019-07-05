import { SET_POST, COMMENT_ADD, CREATING_POST, CREATED_POST } from '../actions/actionTypes';

const initialState = {
    posts: [],
    isUploading: false
};

export default reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POST:
            return {
                ...state,
                posts: action.payload
            };
        case COMMENT_ADD:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.payload.idPost) {
                        if (post.comments)
                            post.comments = post.comments.concat(action.payload.comment);
                        else
                            post.comments = [action.payload.comment];
                    }

                    return post;
                })
            };
        case CREATING_POST:
            return {
                ...state,
                isUploading: true
            };
        case CREATED_POST:
            return {
                ...state,
                isUploading: false
            };
        default:
            return state;
    }
}
