import {observable} from "mobx";
import {UserStore} from "./UserStore";
import Localization from "./Localization";
import {SellerStore} from "./SellerStore";

class RootStore {
    @observable user = new UserStore();
    // @observable seller = new SellerStore();
    @observable localization = new Localization();
}


export default new RootStore();