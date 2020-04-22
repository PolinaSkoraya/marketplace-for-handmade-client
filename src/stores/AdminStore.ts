import { action, observable } from "mobx";
import {
  deleteUserById,
  getAllGoods,
  getSellers,
  getUserOrders,
  getUsers,
} from "../http/services";
import { IGood } from "./helpers/interfaces";
import ModalStore from "./ModalStore";
import WarningModal from "../components/WarningModal/WarningModal";

class AdminStore {
  @observable goods: IGood[] = [];
  @observable users: any[] = [];
  @observable sellers: any[] = [];

  @action.bound
  async init() {
    try {
      let responseGoods = await getAllGoods();
      let responseUsers = await getUsers();
      let responseSellers = await getSellers();
      this.goods = responseGoods.data;
      this.users = responseUsers.data;
      this.sellers = responseSellers.data;

      await Promise.all(
          this.users.map(async (user) => {
            const orders = await getUserOrders(user._id);
            user.orders = orders.data;
          })
      );
    } catch (e) {

    }
  }

  @action.bound
  async deleteUser(userId) {
    try {
      await ModalStore.showModal(WarningModal, {
        title: "delUser",
      });

      await deleteUserById(userId);
      await this.init();
    } catch (e) {

    }

  }
}

export default AdminStore;
