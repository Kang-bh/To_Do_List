import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

const Register = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // state 생성
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value) // email 타이핑 가능
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        // 비밀번호 확인과 비밀번호 같을 때
        event.preventDefault(); // 할 때마다 page refresh 방지.
        // 밑의 해야할 일 못하는 것 방지. (refresh 방지.)
        if (Password !== ConfirmPassword){
            return alert("비밀번호가 일치하지 않습니다.")
        }
        // 같지 않으면 아래로 진입 불가
        
        const body ={
            email: Email,
            password: Password,
            name : Name
        }

        dispatch(registerUser(body)) // loginUser 라는 ACTION
            .then(response => {
                console.log(response.payload.success)
                if(response.payload.success){
                    navigate("/login") // login 으로 보내기
                } else{
                    alert("Failed to sign up")
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
                
                <label>Name</label>
                <input type = "text" value = {Name} onChange = {onNameHandler} />

                <label>Password</label>
                <input type = "password" value = {Password} onChange = {onPasswordHandler} />
                
                <label>Confirm Password</label>
                <input type = "password" value = {ConfirmPassword} onChange = {onConfirmPasswordHandler} />

                <br/>
                <button type ="submit">
                    Register
                </button>

            </form>

        </div>
    );
};

export default Register;