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

export default class ProductStore {
  private _product: ProductItem | null = null;
  private _meta: Meta = Meta.initial;
  private _listOfSimilarProducts: ProductItem[] = [];

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _product: observable.ref,
      _meta: observable,
      _listOfSimilarProducts: observable.ref,
      product: computed,
      meta: computed,
      listOfSimilarProducts: computed,
      getProductData: action,
      getSimilarProductData: action,
    });
  }

  get product(): ProductItem | null {
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
    this._product = null;
    this._listOfSimilarProducts = [];
    const response: AxiosResponse = await axios({
      method: "get",
      url: `${baseUrl}${GET_PRODUCTS}${id}/`,
    });
    runInAction(() => {
      if (response.status === 200) {
        this._product = response.data;
        this.getSimilarProductData();
      }
      return;
    });
    runInAction(() => {
      if (response.status === 200) {
        this._meta = Meta.success;
      }
      this._meta = Meta.error;
      return;
    });
  };

  getSimilarProductData = async () => {
    if (this.product) {
      this._listOfSimilarProducts = [];
      const response: AxiosResponse = await axios({
        method: "get",
        url: `${baseUrl}${GET_CATEGORIES}${this.product.category.id}/${GET_PRODUCTS}`,
      });
      runInAction(() => {
        if (response.status === 200) {
          this._listOfSimilarProducts = response.data.slice(0, 3);
          return;
        }
        return;
      });
      runInAction(() => {
        if (response.status === 200) {
          this._meta = Meta.success;
          return;
        }
        this._meta = Meta.error;
        return;
      });
    }
  };

  destroy(): void {}
}
