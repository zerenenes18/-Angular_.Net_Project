import { Product } from "./product";
import { responseModel } from "./responseModel";

export interface ProductResponseModel extends responseModel{
    data:Product[]
}