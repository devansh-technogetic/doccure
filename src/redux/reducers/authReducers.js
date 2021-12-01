import { LOGIN_LOAD, LOGIN_SUCCESS, LOGIN_ERROR } from '../types'
const initialState = {
    email: "",
    password: ""
}
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_LOAD:
            return { loading: true };
        case LOGIN_SUCCESS:
            return { loading: true, userInfo: action.payload };
        case LOGIN_ERROR:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}