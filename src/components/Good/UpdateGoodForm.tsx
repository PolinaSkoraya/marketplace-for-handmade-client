import {GoodInterface} from "../../stores/helpers/interfaces";
import {observer} from "mobx-react";
import React, {Component} from "react";
import {action, observable} from "mobx";

interface props {
    good: GoodInterface
}

class UpdateGoodForm {
    @observable newInfoGood = {
        id: "",
        goodName: "",
        description: "",
        price: 0,
        goodCategory: ""
    };

    constructor(payload) {
        console.log(payload.good);

        this.newInfoGood.id = payload.good._id;
        this.newInfoGood.goodName = payload.good.name;
        this.newInfoGood.description = payload.good.description as string;
        this.newInfoGood.price = payload.good.price;
        this.newInfoGood.goodCategory = payload.good.category as string;
    }

    @action.bound
    handleInputChange (event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.newInfoGood[name] = value;
    }

    @action.bound
    async onSubmit(func?) {
        func(this.newInfoGood);
    }
}

export default UpdateGoodForm;