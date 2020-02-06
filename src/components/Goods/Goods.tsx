import './Goods.scss'
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {GoodsStore} from '../../stores/GoodsStore';

@observer
class Goods extends Component{
    store: GoodsStore = new GoodsStore();

    render () {
        return(
            <div>
                <h3>Goods</h3>

                <button onClick={this.store.handleClick}>
                    Goods
                </button>
            </div>
        )
    }
}

export default Goods;