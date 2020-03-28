import style from "./style.module.scss"
import React, {Component} from 'react';
import {ROUTES} from "../../routes/routes";
import {NavLink} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

class AuthLinks extends Component {
    render () {
        return(
            <div className={style.links}>
                <div className={style.linksCircle}>
                    <NavLink to={ROUTES.users.login} className={style.authLink}>
                        <FormattedMessage id="signIn"/>
                    </NavLink>

                    <NavLink to={ROUTES.users.registration} className={style.authLink}>
                        <FormattedMessage id="register"/>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default AuthLinks;
