import { LOGIN_USER, REGISTER_USER } from "../_actions/types";



export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER: // nextState return
            return {...state, loginSuccess: action.payload} // 서버에서 가져온 reponse 저장
            break;
        case REGISTER_USER:
            return {...state, registerSuccess: action.payload}
            break;
        default:
            return state;
    }
}