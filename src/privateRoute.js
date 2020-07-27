import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import { UserContext } from './context/contexts';

//take in route path, component etc.. as props, if user is authenticated then continue to load the component w/ props. If not, redirect to homepage.
function PrivateRoute({component: Component, ...rest}){

    const {isAuthenticated} = useContext(UserContext);
    
    return(
        <Route 
            {...rest} 
            render={props => 
                isAuthenticated? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            } 
        />
    )
}

export default PrivateRoute;