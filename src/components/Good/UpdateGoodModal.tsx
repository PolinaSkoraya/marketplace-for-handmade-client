import React, {Component} from "react";
import {DialogActionType, ModalProps} from "../../stores/ModalStore";
import Modal from 'rc-dialog';
import {observer} from "mobx-react";
import Button from "../Button/Button";
import UpdateGoodForm from "./UpdateGoodForm";
import {GoodInterface, goodsCategories} from "../../stores/helpers/interfaces";
import style from "./style.module.scss";
import classNames from "classnames";

interface Props extends ModalProps {
    good: GoodInterface
}

@observer
class UpdateGoodModal extends Component<Props> {
    good = this.props;
    form = new UpdateGoodForm(this.good);

    onSubmit = async event => {
        event.preventDefault();

        await this.form.onSubmit(payload =>
            this.props.onClose(DialogActionType.submit, payload)
        );
    };

    onClose = () => {
        this.props.onClose(DialogActionType.close);
    };

    render() {
        const {good, ...rest} = this.props;

        return (
            <Modal
                {...rest}
                destroyOnClose={true}
                closable={false}
                onClose={this.onClose}
                wrapClassName={style.wrapModal}
                visible
                className="modal"
            >
                <form className={style.updateGoodForm} onSubmit={this.onSubmit}>
                    <input
                        className = {classNames("input", style.updateGoodForm__input)}
                        type='text'
                        name="goodName"
                        onChange={this.form.handleInputChange}
                        placeholder='name'
                        value={this.form.newInfoGood.goodName}
                    />
                    <textarea
                        className = {classNames("input", style.updateGoodForm__input, style.updateGoodForm__textarea)}
                        name="description"
                        onChange={this.form.handleInputChange}
                        placeholder='description'
                        value={this.form.newInfoGood.description}
                    />
                    <input
                        className = {classNames("input", style.updateGoodForm__input)}
                        type='text'
                        name="price"
                        onChange={this.form.handleInputChange}
                        placeholder='price'
                        value={this.form.newInfoGood.price}
                    />

                    <select
                        className = {classNames("input", style.updateGoodForm__input)}
                        name="goodCategory"
                        onChange={this.form.handleInputChange}
                        value={this.form.newInfoGood.goodCategory}
                    >
                        <option value={goodsCategories.art}>art</option>
                        <option value={goodsCategories.accessories}>accessories</option>
                        <option value={goodsCategories.homeware}>homeware</option>
                        <option value={goodsCategories.toys}>toys</option>
                    </select>

                    <Button type="submit" className="button-basic">Update good</Button>
                    <Button onClick={this.onClose} className={style.buttonClose}>close</Button>
                </form>
            </Modal>
        );
    }
}

export default UpdateGoodModal;