import './Order.scss'
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import RootStore from "../../stores/RootStore";

@observer
class Order extends Component {

    render () {
        const {user} = RootStore;

        return(
            <div>
            </div>
        )
    }
}

export default Order;