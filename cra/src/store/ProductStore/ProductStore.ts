import { baseUrl, GET_CATEGORIES, GET_PRODUCTS } from "@src/config/const";
import axios, { AxiosResponse } from "axios";

export default class ProductStore {
  getProductData = async (id: string | undefined) => {
    let responseData: AxiosResponse = await axios({
      method: "get",
      url: `${baseUrl}${GET_PRODUCTS}${id}/`,
    });
    return responseData;
  };

  getSimilarProductData = async (categoryId: number | undefined) => {
    let responseData: AxiosResponse = await axios({
      method: "get",
      url: `${baseUrl}${GET_CATEGORIES}${categoryId}/${GET_PRODUCTS}`,
    });
    return responseData;
  };

  destroy(): void {}
}
