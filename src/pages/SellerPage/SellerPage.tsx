import style from "./style.module.scss"
import React, {Component} from "react";
import {observer} from "mobx-react";
import {GoodsContainer, GoodsContainerPosition} from "../../components/GoodsContainer/GoodsContainer";
import {FormattedMessage} from "react-intl";
import classNames from "classnames";
import ShopStore from "../../stores/ShopStore";
import Button from "../../components/Button/Button";
import {action, observable} from "mobx";
import {MdCancel} from "react-icons/md";
import {goodsCategories} from "../../stores/helpers/interfaces";
import RootStore from "../../stores/RootStore";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Form, Option, Select, Text, TextArea} from 'informed';
import {validateLength, validateNumber} from "../../stores/helpers/validation";
import axios from "axios";

@observer
class SellerPage extends Component {
    store: ShopStore = new ShopStore();
    @observable isShowModal = false;
    @observable file = [];
    @observable files = [];
    @observable photosURLS: string[] = [];
    @observable imageURL = "";

    image = "";
    photos: string[] = [];

    @action.bound
    toggleForm () {
        this.isShowModal = !this.isShowModal;
    }

    @action.bound
    async onCreateGood (user, values) {
        this.isShowModal = !this.isShowModal;

        // await this.handleDrop (this.files, this.file);

        values.photos = this.photos;
        values.image = this.image;

        try {
            await user.createGood(values);
            if(user.errors.notCreated.length === 0) {
                toast.success("Good was created!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000
                });
            }
            while(user.errors.notCreated.length !== 0) {
                user.errors.notCreated.pop();
                throw Error("good wasn't created");
            }
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }

        let props: any = this.props;
        await this.store.initGoodsOfSeller(props.match.params.id);
    }

    async componentDidMount() {
        let props: any = this.props;
        await this.store.initSeller(props.match.params.id);
        await this.store.initGoodsOfSeller(props.match.params.id);
    }

    @action.bound
    handleInputChange (event) {
        const target = event.target;

        const files = target.files;
        const name = target.name;

        this[name] = files;
        console.log(this[name]);

        if (name == "files") {
            this.photosURLS = Array.from(this.files).map ( file =>
                window.URL.createObjectURL(file)
            );
        } else {
            this.imageURL = window.URL.createObjectURL(files[0]);
        }

    }

    @action.bound
    handleDrop = async (files, file) => {
        const filesArray: string[] = Array.from(files);
        const uploaders = filesArray.map( file => {

            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', 'zefqx6js');

            return axios.post("https://api.cloudinary.com/v1_1/cloudqawsed/image/upload", data, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
                const data = response.data;
                const fileURL = data.secure_url; // You should store this URL for future references in your app
                this.photos.push(fileURL);
            })
        });

        const data = new FormData();
        data.append('file', file[0]);
        data.append('upload_preset', 'zefqx6js');

        await axios.post("https://api.cloudinary.com/v1_1/cloudqawsed/image/upload", data, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        }).then(response => {
            const data = response.data;
            this.image = data.secure_url;
        });

        await axios.all(uploaders).then(() => {
            console.log("all files uploaded", this.photos);
        });
    };

    render () {
        const {user} = RootStore;
        let props: any = this.props;
        const idSeller = props.match.params.id;

        // console.log(this.photosURLS);
        // console.log(this.imageURL);

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

                    <div className={style.sellerPage__backImage}> </div>

                    <div className={style.sellerPage__info}>
                        <div className={style.sellerPage__logo}>
                            <img src={this.store.seller.logo} alt="shop logo" className={style.sellerPage__logoImg}/>
                        </div>

                        <div className={style.sellerPage__text}>
                            <div className={classNames(style.sellerPage__textField, style.sellerPage__textField_name)}>
                                {this.store.seller.name}
                            </div>
                            <div className={style.sellerPage__textField}>
                                <FormattedMessage id="services" values={{sellerServices: this.store.seller.services}}/>
                            </div>
                            <div className={style.sellerPage__textField}>
                                <FormattedMessage id="aboutShop"/>
                                <div className={style.sellerPage__description}>
                                    {this.store.seller.description}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    idSeller === user.seller._id &&
                    <div className={style.createGoodContainer}>
                        <Button type="button" onClick={this.toggleForm} className={style.buttonShowModal}>create good</Button>

                        <Form
                            className={classNames(style.createGoodForm, {[style.createGoodForm__show]: this.isShowModal})}
                        >
                            {({ formState }) => (
                                <div className={style.formContent}>
                                    <div className={style.formTextInfo}>
                                        <Button type="button" styleType="small" onClick={this.toggleForm} className={style.createGoodForm__buttonClose}>
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

                                        <Select
                                            className = {classNames("input", style.createGoodForm__input)}
                                            field="newGoodCategory"
                                        >
                                            <Option disabled value="">Choose category</Option>
                                            <Option value={goodsCategories.art}>art</Option>
                                            <Option value={goodsCategories.accessories}>accessories</Option>
                                            <Option value={goodsCategories.homeware}>homeware</Option>
                                            <Option value={goodsCategories.toys}>toys</Option>
                                        </Select>

                                        <Button
                                            styleType="primary"
                                            type="submit"
                                            onClick={ () => this.onCreateGood(user, formState.values)}
                                            disabled={formState.invalid}
                                        >
                                            create new good
                                        </Button>
                                    </div>

                                    <div className={style.fileInputs}>
                                        <p className={style.fileInputs__text}>
                                            <FormattedMessage id="mainPhoto"/>
                                        </p>
                                        <input id="image" type="file" name="file" onChange={this.handleInputChange} className={style.inputImage}/>
                                        <label htmlFor="image" className={style.labelPhotos}>
                                            <FormattedMessage id="chooseFile"/>
                                        </label>
                                        <div className={style.image}>
                                            {
                                                this.imageURL &&
                                                <div className={style.imageWrap}>
                                                    <img src={this.imageURL} alt="image" className={style.formImage}/>
                                                </div>
                                            }
                                        </div>

                                        <p className={style.fileInputs__text}>
                                            <FormattedMessage id="adPhotos"/>
                                        </p>
                                        <input id="photos" type="file" name="files" onChange={this.handleInputChange}  multiple className={style.inputPhotos}/>
                                        <label htmlFor="photos" className={style.labelPhotos}>
                                            <FormattedMessage id="chooseFile"/>
                                        </label>
                                        {
                                            Boolean(this.photosURLS.length) && <div className={style.photos}>
                                            {
                                                 this.photosURLS.map ( url =>
                                                    <div className={style.imageWrap} key={url}>
                                                        <img src={url} alt="image" className={style.formImage}/>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        }
                                    </div>
                                </div>
                            )}
                        </Form>
                    </div>
                }

                <div className={style.sellerPage__body}>
                    <GoodsContainer
                        goodsContainerTitle = {"Goods of " + this.store.seller.name}
                        goods={this.store.goodsOfSeller}
                        goodsContainerPosition={GoodsContainerPosition.sellerPage}
                    />
                </div>
            </div>
        )
    }
}

export default SellerPage;
