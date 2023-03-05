import ProductItem from "@components/ProductType/ProductItem";
import { baseUrl, GET_PRODUCTS } from "@src/config/const";
import { Meta } from "@utils/meta";
import axios, { AxiosResponse } from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

type PrivateFields = "_list" | "_meta" | "_listLength";

export default class ProductsStore {
  private _list: ProductItem[] = [];
  private _meta: Meta = Meta.initial;
  private _listLength: number = 0;

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _list: observable,
      _meta: observable,
      _listLength: observable,
      list: computed,
      meta: computed,
      listLength: computed,
      handleGetListOfProducts: action,
      handleAddNewItems: action,
      findSearchByTitle: action,
    });
  }

  get list(): ProductItem[] {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  get listLength(): number {
    return this._listLength;
  }

  handleGetListOfProducts = async (preparedUrl: string) => {
    this._meta = Meta.loading;
    this._list = [];
    this._listLength = 0;
    let response: AxiosResponse = await axios({
      method: "get",
      url: `${baseUrl}${GET_PRODUCTS}${preparedUrl}`,
    });
    runInAction(() => {
      if (response.status === 200) {
        this._meta = Meta.success;
        this._list = response.data.slice(0, 12);
        this._listLength = response.data.length;
        return;
      }
      this._meta = Meta.error;
      return;
    });
  };

  handleAddNewItems = async (url: string) => {
    this._meta = Meta.loading;
    let response: AxiosResponse = await axios({
      method: "get",
      url,
    });
    runInAction(() => {
      if (response.status === 200) {
        this._list.push(...response.data);
        this._meta = Meta.success;
        return;
      }
      this._meta = Meta.error;
      return;
    });
  };

  findSearchByTitle = async (preparedUrl: string) => {
    this._meta = Meta.loading;
    let response: AxiosResponse = await axios({
      method: "get",
      url: `${baseUrl}${GET_PRODUCTS}${preparedUrl}`,
    });
    runInAction(() => {
      if (response.status === 200) {
        this._list = response.data.slice(0, 12);
        this._meta = Meta.success;
        this._listLength = response.data.length;
        return;
      }
      this._meta = Meta.error;
      return;
    });
  };
  destroy(): void {}
}
