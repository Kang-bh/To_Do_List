import React, { useState } from 'react';
import { Axios } from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

const LoginPage = (props) => {
    
    const dispatch = useDispatch();
    // state 생성
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value) // email 타이핑 가능
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault(); // 할 때마다 page refresh 방지.
        // 밑의 해야할 일 못하는 것 방지. (refresh 방지.)
        
        const body ={
            email: Email,
            password: Password
        }

        dispatch(loginUser(body)) // loginUser 라는 ACTION
            .then(response => {
                if(response.payload.loginSuccess){
                    props.history.push('/')
                } else{
                    alert('Error')
                }
            })
        
    }

    return (
        <div style ={{ display:'flex', justifyContent:'center', alignItems: 'center',
        width: '100%', height: '100vh'}}>
            
            <form style ={{display: 'flex', flexDirection : 'column' }}
                onSubmit = {onSubmitHandler}
            >
                <label>Email</label>
                <input type = "email" value = {Email} onChange = {onEmailHandler} />
                <label>Password</label>
                <input type = "password" value = {Password} onChange = {onPasswordHandler} />
                <br/>
                <button type ="submit">
                    Login
                </button>

            </form>

        </div>
    );  
};

export default LoginPage;