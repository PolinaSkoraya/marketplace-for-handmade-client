import {instance} from "./instance";
import {URLS} from "./urls";
import {TOKEN} from "../stores/UserStore";

export function getUsers() {
    return instance.get(URLS.users);
}

export function getSellers() {
    return instance.get(URLS.sellers);
}


export function getPageGoods(page) {
    return instance.get(URLS.goods + page, {
        headers: {
            'auth-token': localStorage.getItem(TOKEN)
        }
    });
}

export function getAllGoods() {
    return instance.get("/goods", {
        headers: {
            'auth-token': localStorage.getItem(TOKEN),
        }
    });
}

export function postGood(good) {
    return instance.post("/goods",{
        "name": good.name,
        "price": good.price,
        "idSeller": good.idSeller,
        "likes": good.likes,
        "description": good.description,
        "image": good.image,
        "tags": good.tags,
        "category": good.category
    })
}

export function getBuyerById (id) {
    return instance.get(URLS.users + id);
}

export function getSellerById (id) { //user/id/shop
    return instance.get(URLS.sellers + id);
}

export function getGoodsOfSeller (id) {
    return instance.get(URLS.sellers + id + "/goods");
}

export function getGoodById (id) {
    return instance.get(URLS.goods + id,{
        headers: {
            'auth-token': localStorage.getItem(TOKEN),
        },
    });
}

export function getGoodWithSellerById (id) {
    return instance.get(URLS.goods + id + "/seller",{
        headers: {
            'auth-token': localStorage.getItem(TOKEN),
        },
    });
}

export function getGoodsInBasket (id) {
    return instance.get(URLS.users + id + "/basket",{
        headers: {
            'auth-token': localStorage.getItem(TOKEN),
        },
    })
}

export function postGoodIntoBasket (idBuyer, idGood) {
    return instance.post(URLS.users + idBuyer + "/basket",{
        "idGood" : idGood
    })
}

export function deleteGoodFromBasket (idBuyer, idGood) {
    return instance.post(URLS.users + idBuyer + "/basket/delete",{
        "idGood" : idGood
    })
}

export function getLikedGoods (id) {
    return instance.get(URLS.users + id + "/liked",{
        headers: {
            'auth-token': localStorage.getItem(TOKEN),
        },
    })
}

export function postGoodIntoLikedGoods (idBuyer, idGood) {
    return instance.post(URLS.users + idBuyer + "/liked",{
        "idGood" : idGood
    })
}

export function deleteGoodFromLikedGoods (idBuyer, idGood) {
    return instance.post(URLS.users + idBuyer + "/liked/delete",{
        "idGood" : idGood
    })
}

export function updateLikes (idGood, likes) {
    return instance.post(URLS.goods + idGood + "/updateLikes", {
        "likes" : likes
    })
}

export function getShopByUserId(idUser) {
    return instance.get(URLS.users + idUser + "/shop", {
        headers: {
            'auth-token': localStorage.getItem(TOKEN),
        },
    })
}

export function updateUserRole(idUser, role) {
    return instance.post(URLS.users + idUser, {
        'roles' : role
    })
}

export function updateGood(idGood, good) {
    return instance.post(URLS.goods + idGood, {
        'name' : good.name,
        'description' : good.description,
        'price' : good.price,
        'category': good.category
    })
}

export function postOrder(idUser, idGood, idSeller) {
    return instance.post(URLS.users + idUser + "/orders",{
        'idGood': idGood,
        'idSeller': idSeller
    })
}

export function getUserOrders(idUser) {
    return instance.get(URLS.users + idUser + "/orders")
}

export function getSellerOrders(idSeller) {
    return instance.get(URLS.sellers + idSeller + "/orders")
}

export function updateOrderState(idOrder) {
    return instance.post(URLS.sellers + "orders/" + idOrder);
}

export function deleteOrders(idOrder) {
    return instance.delete("/orders/" + idOrder);
}

export function postShop(seller) {
    return instance.post("/sellers",{
        "name": seller.name,
        "idUser": seller.idUser,
        "description": seller.description,
        "logo": seller.logo,
        "services": seller.services
    })
}
