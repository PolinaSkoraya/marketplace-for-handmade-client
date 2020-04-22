import { action, observable } from "mobx";
import { getGoodsOfSeller, getSellerById } from "../http/services";
import { IGood } from "./helpers/interfaces";
import { toast } from "react-toastify";
import axios from "axios";

class ShopStore {
  @observable seller = {
    _id: "",
    description: "",
    name: "",
    services: [],
    logo: "",
    idUser: "",
  };
  @observable files = [];
  @observable photosURLS: string[] = [];
  @observable imageURL = "";
  @observable isShowModal = false;
  photos: string[] = [];

  @observable goodsOfSeller: IGood[] = [];

  @action.bound
  async initSeller(id) {
    try {
      const responseSeller = await getSellerById(id);
      this.seller = responseSeller.data;
    } catch (error) {
      console.log(error);
    }
  }

  @action.bound
  async initGoodsOfSeller(id) {
    try {

      const responseGoodsOfSeller = await getGoodsOfSeller(id);
      this.goodsOfSeller = responseGoodsOfSeller.data;
    } catch (error) {
      console.log(error);
    }
  }

  @action.bound
  toggleForm() {
    this.isShowModal = !this.isShowModal;
  }

  @action.bound
  async onCreateGood(user, values) {
    this.isShowModal = !this.isShowModal;

    await this.handleDrop(this.files);

    values.photos = this.photos;

    try {
      await user.createGood(values);
      if (user.errors.notCreated.length === 0) {
        toast.success("Good was created!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
      console.log(this.seller);
      await this.initGoodsOfSeller(user.seller.id);


      while (user.errors.notCreated.length !== 0) {
        user.errors.notCreated.pop();
        throw Error("good wasn't created");
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  @action.bound
  handleInputChange(event) {
    const target = event.target;

    const files = target.files;
    const name = target.name;

    this[name] = files;

    this.photosURLS = Array.from(this.files).map((file) =>
      window.URL.createObjectURL(file)
    );
  }

  @action.bound
  handleDrop = async (files) => {
    const filesArray: string[] = Array.from(files);
    const uploaders = filesArray.map((file) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "zefqx6js");

      return axios
        .post(
          "https://api.cloudinary.com/v1_1/cloudqawsed/image/upload",
          data,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }
        )
        .then((response) => {
          const data = response.data;
          const fileURL = data.secure_url;
          this.photos.push(fileURL);
        });
    });

    await axios.all(uploaders)
  };
}

export default ShopStore;
