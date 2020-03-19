import './Good.scss';
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {observer} from 'mobx-react';
import {action, observable} from "mobx";
import {ROUTES} from "../../routes/routes";
import {GoodInterface, goodsCategories} from "../../stores/helpers/interfaces";
import {STATIC_IMAGES} from "../../http/urls";
import OneGoodStore from "../../stores/OneGoodStore";
import {GoodsContainerPosition} from "../GoodsContainer/GoodsContainer";
import {FormattedMessage} from 'react-intl';
import Modal from "../Modal/Modal";

import {FaRegLemon, FaTrash, FaRegSquare, FaPen} from "react-icons/fa";
import SmallButton from "../SmallButton/SmallButton";
import RootStore from "../../stores/RootStore";

import {MdDone} from "react-icons/md";
import {CSSTransition, TransitionGroup} from "react-transition-group";

@observer
class Good extends Component<{good: GoodInterface, idSeller: string, goodsContainerPosition?: GoodsContainerPosition, shadow?: boolean}> {
    store = new OneGoodStore();
    @observable sellerName = "";
    @observable show = false;

    @observable appear = true;

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

    @action
    deleteGood (user, id) {
        console.log(this.appear);
        user.removeFromBasket(this.props.good._id);
    }

    showModal = () => {
        this.show = true;
    };

    hideModal = () => {
        this.show = false;
    };

    render () {
        const {user} = RootStore;

        const form = <form className="updateGood-form">
            <input
                className = 'input updateGood-form__input'
                type='text'
                name="goodName"
                onChange={this.store.handleInputChange}
                placeholder='name'
                value={this.store.goodName}
            />
            <textarea
                className = 'input updateGood-form__input updateGood-form__textarea'
                name="description"
                onChange={this.store.handleInputChange}
                placeholder='description'
                value={this.store.description}
            />
            <input
                className = 'input updateGood-form__input'
                type='text'
                name="price"
                onChange={this.store.handleInputChange}
                placeholder='price'
                value={this.store.price}
            />

            <select
                className = 'input updateGood-form__input'
                name="goodCategory"
                onChange={this.store.handleInputChange}
            >
                <option value={goodsCategories.art}>art</option>
                <option value={goodsCategories.accessories}>accessories</option>
                <option value={goodsCategories.homeware}>homeware</option>
                <option value={goodsCategories.toys}>toys</option>
            </select>

            <button onClick={() => this.update(this.props.good._id)} className="button-basic">Update good</button>
        </form>

        return(
            // <TransitionGroup className="card-container">
            <CSSTransition
                key={this.props.good._id}
                in={this.appear}
                timeout={1000}
                classNames="fade"
            >
                <div
                    className="good"
                    id = {this.props.good._id + this.props.good.idOrder}
                    style = {
                        this.props.shadow === false?
                        {boxShadow: "none"}
                        :
                        {}
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
                                        onClick={() => this.deleteGood(user, this.props.good._id)}
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
                                <>
                                    <button id="button-done-order" onClick={ () => {user.deleteOrder(this.props.good.idOrder)}}/>
                                    <SmallButton style={{color: "black"}} htmlFor="button-done-order" icon={<MdDone/>}/>
                                </>
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
            </CSSTransition>
            // </TransitionGroup>
        )
    }
}

export default Good;
