import { POST_ADD } from '../actions/actionTypes';

const initialState = {
    posts: [
        {
            id: Math.random(),
            nickName: 'Fulano 1',
            email: 'fulano1@email.com',
            image: require('../../../assets/imgs/fence.jpg'),
            comments: [
                { nickName: 'Test 1', comment: 'Comment 1' },
                { nickName: 'Test 2', comment: 'Comment 2' }
            ]
        },
        {
            id: Math.random(),
            nickName: 'Fulano 2',
            email: 'fulano1@email.com',
            image: require('../../../assets/imgs/bw.jpg'),
            comments: [
                { nickName: 'Test 3', comment: 'Comment 3' },
                { nickName: 'Test 4', comment: 'Comment 4' }
            ]
        }
    ]
};

export default reducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_ADD:
            return {
                ...state,
                posts: state.posts.concat({ ...action.payload })
            };
        default:
            return state;
    }
}