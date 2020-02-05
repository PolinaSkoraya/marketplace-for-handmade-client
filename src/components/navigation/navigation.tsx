import './navigation.scss'
import React, {Component} from "react";
import {Switch, Route, NavLink} from 'react-router-dom'
import {ROUTES} from "../../routes/routes";

class  Navigation extends Component{
    render(){
        return(
            <div>
                <ul>
                    <li>
                        <NavLink to={ROUTES.goods}>Goods</NavLink>
                    </li>
                </ul>

                <Switch>
                    <Route path={ROUTES.goods} component={Goods}/>
                </Switch>
            </div>
        );
    }
}

function Goods() {
    return <h1>Goods</h1>
}

export default Navigation
