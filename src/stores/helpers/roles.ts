import RootStore from "../RootStore";
import {ROUTES} from "../../routes/routes";

export enum Roles {
    seller = 'SELLER',
    buyer = 'BUYER'
}

export function getRole(role: Roles) {
    return RootStore.user.role == role;
}

export function getDefaultRouteByRole() {
    if (getRole(Roles.seller)) {
        return ROUTES.sellers.profile;
    } else if (getRole(Roles.buyer)) {
        return ROUTES.buyers.profile;
    }
}

