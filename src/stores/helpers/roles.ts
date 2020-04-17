import RootStore from "../RootStore";

export enum Roles {
    seller = 'SELLER',
    buyer = 'BUYER'
}

export function getRole(role: Roles) {
    return RootStore.user.roles.includes(role);
}

// export function getDefaultRouteByRole() {
//     if (getRole(Roles.seller)) {
//         return ROUTES.sellers.profile;
//     } else if (getRole(Roles.buyer)) {
//         return ROUTES.users.profile;
//     }
// }

