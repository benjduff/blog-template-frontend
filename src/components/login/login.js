import React, { useState, useContext } from 'react';
import axios from 'axios';
import Cookie from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import { LabelDiv, FormLabel, Wrapper, FormDiv, SubmitButton } from '../../styles/globalStyles';
import { baseUrl } from '../../config';
import { UserContext } from '../../context/contexts';
import { toast } from 'react-toastify';

//Login Form 
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {isAuthenticated, setAuthentication} = useContext(UserContext);

    //Post user login data to api, update session context and redirect if successful else handle the error
    async function Authenticate(e) {
        e.preventDefault();
        const res = axios({
            method: 'POST',
            url: baseUrl + 'login',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                "username": username,
                "password": password
            }
        });
        res
            .then((res) => {
                const cookies = new Cookie();
                cookies.set('admin_auth', res.data.token, { path: "/" });
                setAuthentication(true);
            })
            .catch(res => toast.error(res.response.data.msg));
    }

    if (isAuthenticated) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <Wrapper>
            <FormDiv className="Login">
                <form onSubmit={Authenticate}>
                    <LabelDiv>
                        <FormLabel>Username</FormLabel>
                        <input type="text" data-test="username" value={username} onChange={e => setUsername(e.target.value)} required />
                    </LabelDiv>
                    <LabelDiv>
                        <FormLabel>Password</FormLabel>
                        <input type="password" data-test="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </LabelDiv>
                    <SubmitButton type="submit" value="LOG IN" data-test="submit" required />
                </form>
            </FormDiv>
        </Wrapper>
    )
}

export default Login;