import {action, observable} from 'mobx';
import {getGoodsOfSeller, getSellerById} from "../http/services";
import {GoodInterface} from "./helpers/interfaces";
import {toast} from "react-toastify";
import axios from "axios";

class ShopStore {
    @observable seller = {
        _id: "",
        description: "",
        name: "",
        services: [],
        logo: "",
        idUser: ""
    };
    @observable file = [];
    @observable files = [];
    @observable photosURLS: string[] = [];
    @observable imageURL = "";
    @observable isShowModal = false;

    image = "";
    photos: string[] = [];

    @observable goodsOfSeller: GoodInterface[] = [];

    @action.bound
    async initSeller (id) {
        try {
            const responseSeller = await getSellerById(id);
            this.seller = responseSeller.data;

        } catch (error) {
            console.log(error);
        }
    }

    @action.bound
    async initGoodsOfSeller (id) {
        try {
            const responseGoodsOfSeller = await getGoodsOfSeller(id);
            this.goodsOfSeller = responseGoodsOfSeller.data;

        } catch (error) {
            console.log(error);
        }
    }

    @action.bound
    toggleForm () {
        this.isShowModal = !this.isShowModal;
    }

    @action.bound
    async onCreateGood (user, values) {
        this.isShowModal = !this.isShowModal;

        await this.handleDrop (this.files, this.file);

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

        await this.initGoodsOfSeller(this.seller._id);
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
}

export default ShopStore;