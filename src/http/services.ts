import {instance} from "./instance";
import {URLS} from "./urls";
import {TOKEN} from "../stores/UserStore";

function getAllGoods() {
    return instance.get(URLS.goods, {
        headers: {
            'auth-token': localStorage.getItem(TOKEN),
        },
    });
}

function getBuyerById (id) {
    return instance.get(URLS.buyers + id);
}

function getSellerById (id) {
    return instance.get(URLS.sellers + id);
}

function getGoodsOfSeller (id) {
    return instance.get(URLS.sellers + id + "/goods");
}

function getGoodById (id) {
    return instance.get(URLS.goods + id,{
        headers: {
            'auth-token': localStorage.getItem(TOKEN),
        },
    });
}

function getGoodWithSellerById (id) {
    return instance.get(URLS.goods + id + "/seller",{
        headers: {
            'auth-token': localStorage.getItem(TOKEN),
        },
    });
}

function getGoodsInBasket (id) {
    return instance.get(URLS.buyers + id + "/basket",{
        headers: {
            'auth-token': localStorage.getItem(TOKEN),
        },
    })
}

function postGoodIntoBasket (idBuyer, idGood) {
    return instance.post(URLS.buyers + idBuyer + "/basket",{
        "idGood" : idGood
    })
}

function deleteGoodFromBasket (idBuyer, idGood) {
    return instance.post(URLS.buyers + idBuyer + "/basket/delete",{
        "idGood" : idGood
    })
}

function getLikedGoods (id) {
    return instance.get(URLS.buyers + id + "/liked",{
        headers: {
            'auth-token': localStorage.getItem(TOKEN),
        },
    })
}

function postGoodIntoLikedGoods (idBuyer, idGood) {
    return instance.post(URLS.buyers + idBuyer + "/liked",{
        "idGood" : idGood
    })
}

function deleteGoodFromLikedGoods (idBuyer, idGood) {
    return instance.post(URLS.buyers + idBuyer + "/liked/delete",{
        "idGood" : idGood
    })
}

function updateLikes (idGood, likes) {
    return instance.post(URLS.goods + idGood + "/updateLikes", {
        "likes" : likes
    })
}

export {
    getAllGoods,
    getSellerById,
    getGoodsOfSeller,
    getGoodById,
    getGoodWithSellerById,
    getBuyerById,
    getGoodsInBasket,
    postGoodIntoBasket,
    deleteGoodFromBasket,
    postGoodIntoLikedGoods,
    deleteGoodFromLikedGoods,
    getLikedGoods,
    updateLikes
};
