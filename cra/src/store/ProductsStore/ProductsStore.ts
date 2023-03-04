import { baseUrl, GET_PRODUCTS } from "@src/config/const";
import axios, { AxiosResponse } from "axios";

export default class ProductsStore {
  handleGetListOfProducts = async (preparedUrl: string) => {
    let responseData: AxiosResponse = await axios({
      method: "get",
      url: `${baseUrl}${GET_PRODUCTS}${preparedUrl}`,
    });
    return responseData;
  };

  handleAddNewItems = async (url: string) => {
    let responseData: any = await axios({
      method: "get",
      url,
    });
    return responseData;
  };

  makeFiltersUrl = (
    title: string | null,
    categoryId: string | null,
    offset: string | null,
    limit: string | null
  ) => {
    let result: string = "";
    if (title) {
      result += `?title=${title}`;
    }
    if (categoryId) {
      result += result.length
        ? `&categoryId=${categoryId}`
        : `?categoryId=${categoryId}`;
    }
    if (offset) {
      result += result.length ? `&offset=${offset}` : `?offset=${offset}`;
    }
    if (limit) {
      result += result.length ? `&limit=${limit}` : `?limit=${limit}`;
    }
    return result;
  };

  findSearchByTitle = async (preparedUrl: string) => {
    let responseData: any = await axios({
      method: "get",
      url: `${baseUrl}${GET_PRODUCTS}${preparedUrl}`,
    });
    return responseData;
  };
  destroy(): void {}
}
