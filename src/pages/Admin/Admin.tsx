import './Admin.scss'
import {observer} from "mobx-react";
import React, {Component} from "react";
import RootStore from "../../stores/RootStore";
import Good from "../../components/Good/Good";
import GoodsStore from "../../stores/GoodsStore";
import {GoodsContainer} from "../../components/GoodsContainer/GoodsContainer";
import OneGoodStore from "../../stores/OneGoodStore";
import {GoodInterface} from "../../stores/helpers/interfaces";
import {observable} from "mobx";
import ReactDataGrid from "react-data-grid";
import {getAllGoods, getSellerOrders, getSellers, getUserOrders, getUsers} from "../../http/services";

@observer
class Admin extends Component {
    @observable goods: GoodInterface[] = [];
    @observable users: any[] = [];
    @observable sellers: any[] = [];

    async componentDidMount() {
        let responseGoods = await getAllGoods();
        let responseUsers = await getUsers();
        let responseSellers = await getSellers();
        this.goods = responseGoods.data;
        this.users = responseUsers.data;
        this.sellers = responseSellers.data;
        await Promise.all (
            this.users.map(async user => {
                const orders = await getUserOrders(user._id);
                user.orders = orders.data;
                console.log(user);
            })
        )

    }

    render () {
        const {user} = RootStore;

        return (
            <>

                <div className="admin-page">
                    <div className="grid-container">
                        goods
                        <div className="grid-row grid-row-good grid-row-good__title" key="0">
                            <div className="grid-column grid-column-1">name</div>
                            <div className="grid-column grid-column-2">price</div>
                            <div className="grid-column grid-column-3">description</div>
                            <div className="grid-column grid-column-4">seller</div>
                            {/*<div className="grid-column grid-column-5"></div>*/}
                        </div>
                        {
                            this.goods.map ( good =>
                                {
                                    return <GridRowGood good={good} idSeller={good.idSeller}  key={good._id}/>
                                }
                            )
                        }
                    </div>
                    <div className="grid-container grid-container-users">
                        users
                        <div className="grid-row grid-row-user grid-row-user__title" key="0">
                            <div className="grid-column grid-column-1">name</div>
                            <div className="grid-column grid-column-2">email</div>
                            <div className="grid-column grid-column-3">roles</div>
                            <div className="grid-column grid-column-4">orders</div>
                        </div>
                        {
                            this.users.map ( user =>
                                {
                                    return <GridRowUser user={user} key={user._id}/>
                                }
                            )
                        }
                    </div>
                </div>
            </>
        )
    }
}

@observer
class GridRowGood  extends Component<{good: GoodInterface, idSeller: string}> {
    oneGoodStore: OneGoodStore = new OneGoodStore();
    @observable sellerName = "";

    componentDidMount(): void {
        this.oneGoodStore.getShopName(this.props.idSeller).then( response =>
            this.sellerName = response
        )
    }

    render () {
        const {good} = this.props;

        return (
            <div className="grid-row grid-row-good">
                <div className="grid-column grid-column-1">{good.name}</div>
                <div className="grid-column grid-column-2">{good.price}</div>
                <div className="grid-column grid-column-3">{good.description}</div>
                <div className="grid-column grid-column-4">{this.sellerName}</div>
            </div>
        );
    }
}

@observer
class GridRowOrder  extends Component<{order: GoodInterface}> {
    render () {
        const {order} = this.props;

        return (
            <div className="grid-row grid-row-order">
                <div className="grid-column ">{order.name}</div>
                <div className="grid-column ">{order.price}</div>
                <div className="grid-column ">{order.status}</div>
            </div>
        );
    }
}

@observer
class GridRowUser  extends Component<{user: any}> {
    render () {
        console.log(this.props.user.orders);

        return (
            <div className="grid-row grid-row-user">
                <div className="grid-column grid-column-1">{this.props.user.name}</div>
                <div className="grid-column grid-column-2">{this.props.user.email}</div>
                <div className="grid-column grid-column-3">{this.props.user.roles.sort().join(', ')}</div>
                <div className="grid-column grid-column-4">
                    <div className="grid-container grid-container-order">
                        <div className="grid-row grid-row-order">
                            <div className="grid-column ">name</div>
                            <div className="grid-column ">price</div>
                            <div className="grid-column ">status</div>
                        </div>
                        {
                            this.props.user.orders &&
                            this.props.user.orders.map ( order =>
                                {
                                    return <GridRowOrder order={order} key={order._id + "o"}/>
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;