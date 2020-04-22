import { action, observable } from "mobx";
import { UserStore } from "./UserStore";
import Localization from "./Localization";

class RootStore {
  @observable isLoading = true;
  @observable isServerError = false;
  @observable user = new UserStore();

  @observable localization = new Localization();

  @action
  init() {
    this.isLoading = false;
    // setTimeout(() => this.isLoading = false, 3000);
  }
}

export default new RootStore();
