import style from "./style.module.scss"
import React, {Component} from "react";
import {observer} from "mobx-react";
import {GoodsContainer, GoodsContainerPosition} from "../../components/GoodsContainer/GoodsContainer";
import {FormattedMessage} from "react-intl";
import classNames from "classnames";
import ShopStore from "../../stores/ShopStore";
import Button from "../../components/Button/Button";
import {MdCancel} from "react-icons/md";
import {goodsCategories} from "../../stores/helpers/interfaces";
import RootStore from "../../stores/RootStore";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Form, Option, Select, Text, TextArea} from 'informed';
import {validateLength, validateNumber} from "../../stores/helpers/validation";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import dropdownStyle from "../../styles/dropdownStyle.module.scss";

@observer
class SellerPage extends Component {
    store: ShopStore = new ShopStore();

    async componentDidMount() {
        let props: any = this.props;
        await this.store.initSeller(props.match.params.id);
        await this.store.initGoodsOfSeller(props.match.params.id);
    }

    render () {
        const {user} = RootStore;
        let props: any = this.props;
        const idSeller = props.match.params.id;

        console.log(this.store.photosURLS);
        console.log(this.store.imageURL);

        const options = [
            goodsCategories.art, goodsCategories.toys, goodsCategories.homeware, goodsCategories.accessories
        ];

        return (
            <div className={style.sellerPage}>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnHover
                />
                <div className="sellerPage__header">
                    <div className={style.sellerPage__backImage}>
                        <div className={style.sellerPage__logo}>
                            <img src={this.store.seller.logo} alt="shop logo" className={style.sellerPage__logoImg}/>
                        </div>
                    </div>

                    <div className={style.sellerPage__info}>
                        <div className={classNames(style.sellerPage__textField, style.sellerPage__textField_name)}>
                            {this.store.seller.name}
                        </div>

                        {/*<div className={style.sellerPage__textField}>*/}
                        {/*    <FormattedMessage id="services" values={{sellerServices: this.store.seller.services}}/>*/}
                        {/*</div>*/}

                        <div className={style.sellerPage__textField}>
                            {/*<p><FormattedMessage id="aboutShop"/></p>*/}
                            <div className={style.sellerPage__description}>
                                {this.store.seller.description}
                            </div>
                        </div>
                    </div>
                </div>

                {
                    idSeller === user.seller._id &&
                    <div className={style.createGoodContainer}>
                        <Button type="button" onClick={this.store.toggleForm} className={style.buttonShowModal}>create good</Button>

                        <Form
                            className={classNames(style.createGoodForm, {[style.createGoodForm__show]: this.store.isShowModal})}
                        >
                            {({ formState }) => (
                                <>
                                <div className={style.formContent}>
                                    <div className={style.formTextInfo}>
                                        <Button type="button" styleType="small" onClick={this.store.toggleForm} className={style.createGoodForm__buttonClose}>
                                            <MdCancel/>
                                        </Button>

                                        <p className={style.formTitle}>
                                            <FormattedMessage id="addNewGood"/>
                                        </p>
                                        <Text
                                            className = {classNames("input", style.createGoodForm__input)}
                                            field="newGoodName"
                                            placeholder='name'
                                            validate={validateLength}
                                            validateOnChange
                                        />
                                        <label htmlFor="newGoodName" className={style.messageError}>{formState.errors.newGoodName}</label>

                                        <TextArea
                                            className = {classNames("input", style.createGoodForm__input, style.createGoodForm__textarea)}
                                            field="newGoodDescription"
                                            placeholder='description'
                                            validate={validateLength}
                                            validateOnChange
                                        />
                                        <label htmlFor="newGoodDescription" className={style.messageError}>{formState.errors.newGoodDescription}</label>

                                        <Text
                                            type="number"
                                            className = {classNames("input", style.createGoodForm__input)}
                                            field="newGoodPrice"
                                            placeholder='price'
                                            validate={validateNumber}
                                            validateOnChange
                                        />
                                        <label htmlFor="newGoodPrice" className={style.messageError}>{formState.errors.newGoodPrice}</label>

                                        <Dropdown
                                            onChange={(event)=> formState.values.newGoodCategory = event.value }
                                            options={options}
                                            placeholder="Choose category"
                                            arrowClassName={dropdownStyle.dropArrow}
                                            controlClassName={dropdownStyle.dropControl}
                                            menuClassName={dropdownStyle.dropMenu}
                                            className={dropdownStyle.drop}
                                        />
                                    </div>

                                    <div className={style.fileInputs}>
                                        <p className={style.fileInputs__text}>
                                            <FormattedMessage id="adPhotos"/>
                                        </p>
                                        <input id="photos" type="file" name="files" onChange={this.store.handleInputChange}  multiple className={style.inputPhotos}/>
                                        <label htmlFor="photos" className={style.labelPhotos}>
                                            <FormattedMessage id="chooseFile"/>
                                        </label>
                                        {
                                            Boolean(this.store.photosURLS.length) && <div className={style.photos}>
                                            {
                                                 this.store.photosURLS.map ( url =>
                                                    <div className={style.imageWrap} key={url}>
                                                        <img src={url} alt="image" className={style.formImage}/>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        }
                                    </div>
                                </div>
                                <Button
                                styleType="primary"
                                type="submit"
                                onClick={ () => this.store.onCreateGood(user, formState.values)}
                                disabled={formState.invalid}
                                >
                                create new good
                                </Button>
                                </>
                            )}
                        </Form>
                    </div>
                }

                <div className={style.sellerPage__body}>
                    <GoodsContainer
                        goodsContainerTitle = {"Goods of " + this.store.seller.name}
                        goods={this.store.goodsOfSeller}
                        goodsContainerPosition={GoodsContainerPosition.sellerPage}
                        func={this.store.initGoodsOfSeller}
                    />
                </div>
            </div>
        )
    }
}

export default SellerPage;
