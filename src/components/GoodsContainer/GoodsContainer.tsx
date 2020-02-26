import "./GoodsContainer.scss"
import React, {Component} from "react";
import Good from "../Good/Good";
import {observer} from "mobx-react";
import {GoodInterface} from "../../stores/helpers/interfaces";

@observer
class GoodsContainer extends Component <{goodsContainerTitle: string, goods: GoodInterface[]}> {

    render () {
        return (
            <>
                <div className="goodsContainer">
                    <div className="goodsContainer__title">
                        {this.props.goodsContainerTitle}
                    </div>

                    <div className="goodsContainer__grid">
                        {
                            this.props.goods.map ( good =>
                            <Good key={good._id} good={good} idSeller={good.idSeller}/>
                            )
                        }
                    </div>
                </div>
            </>
        )
    }
}

export {GoodsContainer};
