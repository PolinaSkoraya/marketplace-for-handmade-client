import "./AuthLinks.scss"
import React, {Component} from 'react';
import {ROUTES} from "../../routes/routes";
import {NavLink} from 'react-router-dom';

import {FormattedMessage} from 'react-intl';

class AuthLinks extends Component {

    render(){

        return(
            <div className="links">
                <div className="links-circle">
                    <NavLink to={ROUTES.users.login} className="auth-link">
                        <FormattedMessage id="signIn"/>
                    </NavLink>

                    <NavLink to={ROUTES.users.registration} className="auth-link">
                        <FormattedMessage id="register"/>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default AuthLinks;
