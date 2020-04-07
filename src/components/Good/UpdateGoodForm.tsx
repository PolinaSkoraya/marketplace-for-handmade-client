import style from './style.module.scss';
import {GoodInterface, goodsCategories} from "../../stores/helpers/interfaces";
import {observer} from "mobx-react";
import React, {Component} from "react";
import OneGoodStore from "../../stores/OneGoodStore";
import {action, observable} from "mobx";
import classNames from 'classnames';
import Button from "../Button/Button";

interface Props {
    good: GoodInterface
}

@observer
class UpdateGoodForm extends Component<Props> {
    store = new OneGoodStore();
    @observable goodName = this.props.good.name;
    @observable description = this.props.good.description;
    @observable price = this.props.good.price;
    @observable goodCategory = this.props.good.category;

    @action.bound
    handleInputChange (event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this[name] = value;
    }

    @action.bound
    async update (id, goodName, description, price, category ) {
        await this.store.update(id, goodName, description, price, category);
    }

    render () {
        return (
            <form className={style.updateGoodForm}>
                <input
                    className = {classNames("input", style.updateGoodForm__input)}
                    type='text'
                    name="goodName"
                    onChange={this.handleInputChange}
                    placeholder='name'
                    value={this.goodName}
                />
                <textarea
                    className = {classNames("input", style.updateGoodForm__input, style.updateGoodForm__textarea)}
                    name="description"
                    onChange={this.handleInputChange}
                    placeholder='description'
                    value={this.description}
                />
                <input
                    className = {classNames("input", style.updateGoodForm__input)}
                    type='text'
                    name="price"
                    onChange={this.handleInputChange}
                    placeholder='price'
                    value={this.price}
                />

                <select
                    className = {classNames("input", style.updateGoodForm__input)}
                    name="goodCategory"
                    onChange={this.handleInputChange}
                    value={this.goodCategory}
                >
                    <option value={goodsCategories.art}>art</option>
                    <option value={goodsCategories.accessories}>accessories</option>
                    <option value={goodsCategories.homeware}>homeware</option>
                    <option value={goodsCategories.toys}>toys</option>
                </select>

                <Button type="submit" onClick={() => this.update(this.props.good._id, this.goodName, this.description, this.price, this.goodCategory)} className="button-basic">Update good</Button>
            </form>
        )
    }
}

export default UpdateGoodForm;