import React, { useContext, useState, useMemo, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { UserContext } from './contexts';
import Posts from '../components/post/post';
import Login from '../components/login/login';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import DelPost from '../components/post/delPost/delPost';
import CreatePost from '../components/post/createPost/createPost';
import EditPost from '../components/post/editPost/editPost';
import PrivateRoute from '../privateRoute';
import { CtrlButton } from '../styles/globalStyles';
import Axios from 'axios';
import { baseUrl } from '../config';
import {toast} from 'react-toastify';

//User session authentication
export function AuthContext() {
    const cookie = new Cookies();
    const [isAuthenticated, setAuthentication] = useState(false);

    //update context object when isAuthenticated value changes
    const providerValue = useMemo(() => ({isAuthenticated, setAuthentication}), [isAuthenticated, setAuthentication]);

    function validateToken(){
        const authToken = cookie.get('admin_auth');

        if(!authToken){
            setAuthentication(false);
        } else {
            //if admin auth cookie exists verify with backend, if token doesn't match backend use logout() method to wipe users cookies and update context.
            const res = Axios.get(baseUrl + `session/${authToken}`);
            res
                .then((res) => {
                    if(res.status === 200){
                        res.data.tokenValidated ? setAuthentication(true) : Logout();  
                    } else {
                        setAuthentication(false);
                    }
                })
                .catch(setAuthentication(false));
        }
    }
    
    useEffect(() => {
        validateToken();
    }, []);

    return (
        <UserContext.Provider value={providerValue}>
            <UserContext.Consumer>
                {() => 
                    <React.Fragment>
                    <Route path="/" exact component={Posts} />
                    <Route path="/login" exact component={Login} />
                    <PrivateRoute path="/editpost/:postId" component={EditPost} />
                    <PrivateRoute path="/delpost/:postId" component={DelPost} />
                    <PrivateRoute path='/createpost' component={CreatePost} />
                    </React.Fragment>
                }
            </UserContext.Consumer>
        </UserContext.Provider>
    )
}

//Remove user cookies and update context then redirect to home route
export function Logout() {
    const { isAuthenticated, setAuthentication } = useContext(UserContext);

    const delAuth = () => {
        //delete token
        const cookie = new Cookies();
        cookie.remove('admin_auth');

        //update user auth context
        setAuthentication(false);
        
        //successful logout notification
        toast.info('Logged out.');
    }

    //redirect to desired location after logout
    if(!isAuthenticated){
        return(
            <Redirect to="/" />
        )
    }

    //when isAuthenticated use styled Link tag as logout button
    return (
        <CtrlButton onClick={delAuth}>LOGOUT</CtrlButton>
    )
}