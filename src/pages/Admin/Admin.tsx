import style from './style.module.scss';
import {observer} from "mobx-react";
import React, {Component} from "react";
import GridRowShop from "./GridRowShop";
import GridRowUser from "./GridRowUser";
import GridRowGood from "./GridRowGood";
import {FormattedMessage} from "react-intl";
import AdminStore from "../../stores/AdminStore";

@observer
class Admin extends Component {
    store: AdminStore = new AdminStore();

    async componentDidMount() {
        await this.store.initAdmin();
    }

    render () {

        return (
            <>
                <div className={style.adminPage}>
                    <div className={style.tableTitle}>
                        <FormattedMessage id="goods"/>
                    </div>

                    <div className={style.gridContainer}>
                        <div className={style.gridRow} key="0">
                            <div className="grid-column grid-column-1">name</div>
                            <div className="grid-column grid-column-2">price</div>
                            <div className="grid-column grid-column-3">category</div>
                            <div className="grid-column grid-column-4">description</div>
                            <div className="grid-column grid-column-5">seller</div>
                        </div>
                        {
                            this.store.goods.map ( good =>
                                {
                                    return <GridRowGood good={good} idSeller={good.idSeller}  key={good._id}/>
                                }
                            )
                        }
                    </div>

                    <div className={style.tableTitle}>
                        <FormattedMessage id="users"/>
                    </div>
                    <div className={style.gridContainer}>
                        <div className={style.gridRow} key="0">
                            <div className="grid-column grid-column-0">button</div>
                            <div className="grid-column grid-column-1">name</div>
                            <div className="grid-column grid-column-2">email</div>
                            <div className="grid-column grid-column-3">roles</div>
                            <div className="grid-column grid-column-4">orders</div>
                        </div>
                        {
                            this.store.users.map ( user =>
                                {
                                    return <GridRowUser user={user} key={user._id} deleteUser={this.store.deleteUser}/>
                                }
                            )
                        }
                    </div>

                    <div className={style.tableTitle}>
                        <FormattedMessage id="shops"/>
                    </div>
                    <div className={style.gridContainer}>
                        <div className={style.gridRow} key="0">
                            <div className="grid-column grid-column-0">owner</div>
                            <div className="grid-column grid-column-1">shop name</div>
                            <div className="grid-column grid-column-2">description</div>
                            <div className="grid-column grid-column-3">orders</div>
                        </div>
                        {
                            this.store.sellers.map ( seller =>
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