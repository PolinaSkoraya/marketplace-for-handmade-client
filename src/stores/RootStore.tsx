import {observable} from "mobx";
import {UserStore} from "./UserStore";
import Localization from "./Localization";

class RootStore {
    @observable user = new UserStore();
    // @observable seller = new ShopStore();
    @observable localization = new Localization();
}


export default new RootStore();