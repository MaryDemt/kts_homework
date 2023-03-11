import ProductItem from "@components/ProductType/ProductItem";
import { baseUrl, GET_CATEGORIES, GET_PRODUCTS } from "@config/const";
import { Meta } from "@utils/meta";
import axios, { AxiosResponse } from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

type PrivateFields = "_product" | "_meta" | "_listOfSimilarProducts";

const initialProductState = {
  id: 0,
  title: "",
  price: 0,
  description: "",
  images: [],
  creationAt: "",
  updatedAt: "",
  category: {
    id: 0,
    name: "",
    image: "",
    creationAt: "",
    updatedAt: "",
  },
};

export default class ProductStore {
  private _product: ProductItem = initialProductState;
  private _meta: Meta = Meta.initial;
  private _listOfSimilarProducts: ProductItem[] = [];

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _product: observable,
      _meta: observable,
      _listOfSimilarProducts: observable,
      product: computed,
      meta: computed,
      listOfSimilarProducts: computed,
      getProductData: action,
      getSimilarProductData: action,
    });
  }

  get product(): ProductItem {
    return this._product;
  }

  get meta(): Meta {
    return this._meta;
  }

  get listOfSimilarProducts(): ProductItem[] {
    return this._listOfSimilarProducts;
  }

  getProductData = async (id: string | undefined) => {
    this._meta = Meta.loading;
    this._product = initialProductState;
    this._listOfSimilarProducts = [];
    let response: AxiosResponse = await axios({
      method: "get",
      url: `${baseUrl}${GET_PRODUCTS}${id}/`,
    });
    runInAction(async () => {
      if (response.status === 200) {
        this._meta = Meta.success;
        this._product = await response.data;
        this.getSimilarProductData();
      }
      this._meta = Meta.error;
      return;
    });
  };

  getSimilarProductData = async () => {
    this._listOfSimilarProducts = [];
    let response: AxiosResponse = await axios({
      method: "get",
      url: `${baseUrl}${GET_CATEGORIES}${this.product.category.id}/${GET_PRODUCTS}`,
    });
    runInAction(() => {
      if (response.status === 200) {
        this._meta = Meta.success;
        this._listOfSimilarProducts = response.data.slice(0, 3);
        return;
      }
      this._meta = Meta.error;
      return;
    });
  };

  destroy(): void {}
}
