import React, { Component } from "react";
import ModalStore, {
  DialogActionType,
  ModalProps,
} from "../../stores/ModalStore";
import Modal from "rc-dialog";
import { observer } from "mobx-react";
import Button from "../Button/Button";
import UpdateGoodForm from "./UpdateGoodForm";
import {
  IGood,
  goodsCategories,
} from "../../stores/helpers/interfaces";
import style from "./style.module.scss";
import classNames from "classnames";
import { MdCancel } from "react-icons/md";
import WarningModal from "../WarningModal/WarningModal";
import { Form, Text, TextArea, Select, Option } from "informed";
import {
  validateLength,
  validateNumber,
} from "../../stores/helpers/validation";

interface Props extends ModalProps {
  good: IGood;
}

@observer
class UpdateGoodModal extends Component<Props> {
  good = this.props;
  form = new UpdateGoodForm(this.good);

  onSubmit = async (values) => {
    const { operation } = await ModalStore.showModal(WarningModal, {
      title: "updateGood",
    });

    if (operation === 1) {
      await this.form.onSubmit(values, (payload) =>
        this.props.onClose(DialogActionType.submit, payload)
      );
    }
  };

  onClose = () => {
    this.props.onClose(DialogActionType.close);
  };

  render() {
    const { good, ...rest } = this.props;

    return (
      <Modal
        {...rest}
        destroyOnClose={true}
        closable={false}
        onClose={this.onClose}
        zIndex={999}
        maskStyle={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "100vh",
          backgroundColor: "#00000091",
        }}
        visible
      >
        <Form
          className={style.updateGoodForm}
          initialValues={{
            goodName: this.form.newInfoGood.goodName,
            description: this.form.newInfoGood.description,
            price: this.form.newInfoGood.price,
            goodCategory: this.form.newInfoGood.goodCategory,
          }}
        >
          {({ formState }) => (
            <>
              <Text
                className={classNames("input", style.updateGoodForm__input)}
                field="goodName"
                placeholder="name"
                validate={validateLength}
                validateOnChange
              />
              <label htmlFor="goodName" className={style.messageError}>
                {formState.errors.goodName}
              </label>

              <TextArea
                className={classNames(
                  "input",
                  style.updateGoodForm__input,
                  style.updateGoodForm__textarea
                )}
                field="description"
                placeholder="description"
                validate={validateLength}
                validateOnChange
              />
              <label htmlFor="description" className={style.messageError}>
                {formState.errors.description}
              </label>

              <Text
                type="number"
                className={classNames("input", style.updateGoodForm__input)}
                field="price"
                placeholder="price"
                validate={validateNumber}
                validateOnChange
              />
              <label htmlFor="price" className={style.messageError}>
                {formState.errors.price}
              </label>

              <Select
                className={classNames("input", style.updateGoodForm__input)}
                field="goodCategory"
              >
                <option value={goodsCategories.art}>art</option>
                <option value={goodsCategories.accessories}>accessories</option>
                <option value={goodsCategories.homeware}>homeware</option>
                <option value={goodsCategories.toys}>toys</option>
              </Select>

              <Button
                className={classNames("button-basic", style.buttonUpdate)}
                onClick={() => this.onSubmit(formState)}
              >
                Update good
              </Button>
              <Button
                type="button"
                styleType="small"
                onClick={this.onClose}
                className={style.buttonClose}
              >
                <MdCancel />
              </Button>
            </>
          )}
        </Form>
      </Modal>
    );
  }
}

export default UpdateGoodModal;
