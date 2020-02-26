import "./AuthLinks.scss"
import React, {Component} from 'react';
import {ROUTES} from "../../routes/routes";
import {NavLink} from 'react-router-dom';

class AuthLinks extends Component {

    render(){

        return(
            <div className="links">
                <NavLink to={ROUTES.buyers.login} className="auth-link">Log in</NavLink>

                <NavLink to={ROUTES.buyers.registration} className="auth-link">Registration</NavLink>
            </div>
        )
    }
}

export default AuthLinks;
