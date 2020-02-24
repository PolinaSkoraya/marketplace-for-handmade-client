import {action, observable} from "mobx";
import {UserStore} from "./UserStore";

class RootStore {
    @observable user = new UserStore();

    // @action.bound
    // async init() {
    //
    // }
}


export default new RootStore();