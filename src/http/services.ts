import {instance} from "./instance";
import {URLS} from "./urls";
import {TOKEN} from "../stores/UserStore";
import {GoodInterface} from "../stores/helpers/interfaces";

export function getAllGoods() {
    return instance.get(URLS.goods, {
        headers: {
            'auth-token': localStorage.getItem(TOKEN),
        },
    });
}

export function postGood(good) {
    return instance.post("/goods",{
        "name": good.name,
        "price": good.price,
        "idSeller": good.idSeller,
        "likes": good.likes,
        "description": good.description,
        "image": good.image
    })
}

export function getBuyerById (id) {
    return instance.get(URLS.buyers + id);
}

export function getSellerById (id) {
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
    return instance.get(URLS.buyers + id + "/basket",{
        headers: {
            'auth-token': localStorage.getItem(TOKEN),
        },
    })
}

export function postGoodIntoBasket (idBuyer, idGood) {
    return instance.post(URLS.buyers + idBuyer + "/basket",{
        "idGood" : idGood
    })
}

export function deleteGoodFromBasket (idBuyer, idGood) {
    return instance.post(URLS.buyers + idBuyer + "/basket/delete",{
        "idGood" : idGood
    })
}

export function getLikedGoods (id) {
    return instance.get(URLS.buyers + id + "/liked",{
        headers: {
            'auth-token': localStorage.getItem(TOKEN),
        },
    })
}

export function postGoodIntoLikedGoods (idBuyer, idGood) {
    return instance.post(URLS.buyers + idBuyer + "/liked",{
        "idGood" : idGood
    })
}

export function deleteGoodFromLikedGoods (idBuyer, idGood) {
    return instance.post(URLS.buyers + idBuyer + "/liked/delete",{
        "idGood" : idGood
    })
}

export function updateLikes (idGood, likes) {
    return instance.post(URLS.goods + idGood + "/updateLikes", {
        "likes" : likes
    })
}
