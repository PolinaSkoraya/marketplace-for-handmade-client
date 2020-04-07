import style from './style.module.scss';
import {observer} from "mobx-react";
import React, {Component} from "react";
import {GoodInterface} from "../../stores/helpers/interfaces";
import {observable} from "mobx";
import {
    getAllGoods,
    getSellers,
    getUserOrders,
    getUsers
} from "../../http/services";
import GridRowShop from "./GridRowShop";
import GridRowUser from "./GridRowUser";
import GridRowGood from "./GridRowGood";

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
            })
        )

    }

    render () {
        return (
            <>
                <div className={style.adminPage}>
                    <div className={style.gridContainer}>
                        goods
                        <div className={style.gridRow} key="0">
                            <div className="grid-column grid-column-1">name</div>
                            <div className="grid-column grid-column-2">price</div>
                            <div className="grid-column grid-column-3">category</div>
                            <div className="grid-column grid-column-4">description</div>
                            <div className="grid-column grid-column-5">seller</div>
                        </div>
                        {
                            this.goods.map ( good =>
                                {
                                    return <GridRowGood good={good} idSeller={good.idSeller}  key={good._id}/>
                                }
                            )
                        }
                    </div>

                    <div className={style.gridContainer}>
                        users
                        <div className={style.gridRow} key="0">
                            <div className="grid-column grid-column-0">button</div>
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

                    <div className={style.gridContainer}>
                        shops
                        <div className={style.gridRow} key="0">
                            <div className="grid-column grid-column-0">owner</div>
                            <div className="grid-column grid-column-1">shop name</div>
                            <div className="grid-column grid-column-2">description</div>
                            <div className="grid-column grid-column-3">orders</div>
                        </div>
                        {
                            this.sellers.map ( seller =>
                                {
                                    return <GridRowShop seller={seller} key={seller._id}/>
                                }
                            )
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default Admin;