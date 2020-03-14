import './Good.scss';
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import {observer} from 'mobx-react';
import {action, computed, observable} from "mobx";
import {getSellerById, updateOrderState} from "../../http/services";
import {ROUTES} from "../../routes/routes";
import {GoodInterface} from "../../stores/helpers/interfaces";
import {STATIC_IMAGES} from "../../http/urls";
import OneGoodStore from "../../stores/OneGoodStore";
import {GoodsContainerPosition} from "../GoodsContainer/GoodsContainer";
import {FormattedMessage} from 'react-intl';
import Modal from "../Modal/Modal";

import {FaRegLemon, FaTrash, FaRegSquare, FaPen} from "react-icons/fa";
import SmallButton from "../SmallButton/SmallButton";
import RootStore from "../../stores/RootStore";

@observer
class Good extends Component<{good: GoodInterface, idSeller: string, goodsContainerPosition?: GoodsContainerPosition}> {
    store = new OneGoodStore();
    @observable sellerName = "";
    @observable show = false;

    constructor (props) {
        super(props);
        this.store.initUpdatingGood(this.props.good);
    }

    componentDidMount () : void {
        this.store.getShopName(this.props.idSeller)
            .then( response =>
                this.sellerName = response
            );
    }

    @action.bound
    update (id) {
        this.store.update(id);
    }

    showModal = () => {
        this.show = true;
    }

    hideModal = () => {
        this.show = false;
    }

    render () {
        const {user} = RootStore;

        const form = <form className="createGood-form">
            <input
                className = 'createGood-form__input'
                type='text'
                name="goodName"
                onChange={this.store.handleInputChange}
                placeholder='name'
                value={this.store.goodName}
            />
            <textarea
                className = 'createGood-form__input'
                name="description"
                onChange={this.store.handleInputChange}
                placeholder='description'
                value={this.store.description}
            />
            <input
                className = 'createGood-form__input'
                type='text'
                name="price"
                onChange={this.store.handleInputChange}
                placeholder='price'
                value={this.store.price}
            />
            <button onClick={() => this.update(this.props.good._id)}>Update good</button>
        </form>


        //flexDirection: "row", width: "300px", height: "250px"
        return(
                <div
                    className="good"
                    id = {this.props.good._id + this.props.good.idOrder}
                    style = {this.props.good.status === "accepted" ?
                        {backgroundColor: "#efefef"}
                        :
                        {backgroundColor: "white"}
                    }
                >

                    {
                        <div className="good__buttons">
                            {
                                this.props.good.idSeller === user.seller._id &&
                                this.props.goodsContainerPosition === GoodsContainerPosition.sellerPage &&
                                <>
                                    <button id={this.props.good.name} className="updateGoodButton" onClick={this.showModal}/>
                                    <SmallButton htmlFor={this.props.good.name} icon={<FaPen/>}/>
                                    <Modal
                                        children={form}
                                        goodName={this.props.good.name}
                                        handleClose={this.hideModal}
                                        show={this.show}
                                    />
                                </>
                            }
                            {
                                this.props.goodsContainerPosition === GoodsContainerPosition.basket &&
                                <>
                                    <button
                                        id={this.props.good.name + "-remove"}
                                        className="removeButton"
                                        onClick={() => user.removeFromBasket(this.props.good._id)}
                                    >
                                    </button>
                                    <SmallButton htmlFor={this.props.good.name + "-remove"} icon={<FaTrash/>}/>

                                    <button
                                        id={this.props.good.name + "-addOrder"}
                                        className="addOrderButton"
                                        onClick={() => user.addOrder(user.id, this.props.good._id, this.props.idSeller)}
                                    >
                                    </button>
                                    <SmallButton htmlFor={this.props.good.name + "-addOrder"} icon={<FaRegLemon/>}/>
                                </>
                            }
                            {
                                this.props.goodsContainerPosition === GoodsContainerPosition.ordersBuyer &&
                                    <p>status: {this.props.good.status}</p>
                            }
                            {
                                this.props.good.status === "accepted" &&
                                this.props.goodsContainerPosition === GoodsContainerPosition.ordersBuyer &&
                                <button onClick={()=>{user.deleteOrder(this.props.good.idOrder)}
                                }>
                                    done
                                </button>
                            }
                            {
                                this.props.good.status === "processing" &&
                                this.props.goodsContainerPosition === GoodsContainerPosition.ordersSeller &&
                                <>
                                    <button
                                        id={this.props.good.idOrder}
                                        className="updateOrderState"
                                        onClick={() => user.acceptOrder(this.props.good.idOrder)}
                                    >
                                    </button>
                                    <SmallButton htmlFor={this.props.good.idOrder as string} icon={<FaRegSquare/>}/>
                                </>
                            }
                        </div>
                    }

                    <div className="good__image">
                        <NavLink
                            className="good__link-image"
                            to={ROUTES.goods.goods+ this.props.good._id}
                        >
                            <img src={STATIC_IMAGES + this.props.good.image } alt="knitting"/>
                        </NavLink>
                    </div>

                    <div className="good__about">
                        <NavLink
                            to={ROUTES.goods.goods + this.props.good._id}
                            className="good__title good__link"
                        >
                            {this.props.good.name}
                        </NavLink>

                        <div className="good__info">
                            <NavLink
                                to={ROUTES.sellers.sellers + this.props.idSeller}
                                className="good__shop-name good__link"
                            >
                                {this.sellerName}
                            </NavLink>

                            <div className="good__price">{this.props.good.price}$</div>
                        </div>

                        <div className="good__likes">
                            <div>
                                <FormattedMessage id="likes" values={{likes: this.props.good.likes}}/>
                            </div>
                        </div>

                    </div>
                </div>
        )
    }
}

export default Good;
