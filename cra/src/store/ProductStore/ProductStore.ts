import ProductItem from "@components/ProductType/ProductItem";
import { baseUrl, GET_CATEGORIES, GET_PRODUCTS } from "@src/config/const";
import { Meta } from "@utils/meta";
import axios, { AxiosResponse } from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

type PrivateFields =
  | "_product"
  | "_meta"
  | "_listOfSimilarProducts"
  | "_categoryId"
  | "_listOfImages";

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
  private _product: ProductItem = {
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
  private _meta: Meta = Meta.initial;
  private _categoryId: number = -1;
  private _listOfSimilarProducts: ProductItem[] = [];
  private _listOfImages: any = [];

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _product: observable,
      _meta: observable,
      _categoryId: observable,
      _listOfSimilarProducts: observable,
      _listOfImages: observable,
      product: computed,
      meta: computed,
      listOfSimilarProducts: computed,
      categoryId: computed,
      listOfImages: computed,
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

  get categoryId(): number {
    return this._categoryId;
  }

  get listOfSimilarProducts(): ProductItem[] {
    return this._listOfSimilarProducts;
  }

  get listOfImages(): string[] {
    return this._listOfImages;
  }

  getProductData = async (id: string | undefined) => {
    this._meta = Meta.loading;
    this._product = initialProductState;
    this._listOfSimilarProducts = [];
    this._categoryId = -1;
    let response: AxiosResponse = await axios({
      method: "get",
      url: `${baseUrl}${GET_PRODUCTS}${id}/`,
    });
    runInAction(() => {
      if (response.status === 200) {
        this._meta = Meta.success;
        this._product = response.data;
        this._categoryId = response.data?.category?.id;
        this._listOfImages = response.data?.images;
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
      url: `${baseUrl}${GET_CATEGORIES}${this._categoryId}/${GET_PRODUCTS}`,
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
