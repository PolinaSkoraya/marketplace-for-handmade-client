import {action, observable} from "mobx";
import {deleteUserById, getAllGoods, getSellers, getUserOrders, getUsers} from "../http/services";
import {GoodInterface} from "./helpers/interfaces";
import ModalStore from "./ModalStore";
import WarningModal from "../components/WarningModal/WarningModal";

class AdminStore {
    @observable goods: GoodInterface[] = [];
    @observable users: any[] = [];
    @observable sellers: any[] = [];

    @action.bound
    async initAdmin () {
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

    @action.bound
    async deleteUser(idUser) {
        const {operation} = await ModalStore.showModal(WarningModal, {title: "Delete user?"});

        if (operation === 1) {
            await deleteUserById(idUser);
            await this.initAdmin();
        }
    }
}

export default AdminStore;