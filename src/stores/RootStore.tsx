import {observable} from "mobx";
import {UserStore} from "./UserStore";

class RootStore {
    @observable user = new UserStore();

}


export default new RootStore();