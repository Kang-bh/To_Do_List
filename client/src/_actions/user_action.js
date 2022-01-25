import Axios from 'axios';
import {
    LOGIN_USER, REGISTER_USER
} from './types';

export function loginUser(datatosubmit){
    
    const request = Axios.post('/api/users/login', datatosubmit) // 서버로 보내기
            .then(response => response.data) 

    return { //Reducer 로 보내기
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(datatosubmit){
    
    const request = Axios.post('/api/users/register', datatosubmit) // 서버로 보내기
            .then(response => response.data) 

    return { //Reducer 로 보내기
        type: REGISTER_USER,
        payload: request
    }
}