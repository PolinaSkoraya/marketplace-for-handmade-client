import {observable} from "mobx";
import {UserStore} from "./UserStore";
import Localization from "./Localization";

class RootStore {
    @observable user = new UserStore();
    @observable localization = new Localization();
}


export default new RootStore();