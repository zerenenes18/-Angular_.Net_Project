import { Category } from "./category";
import { responseModel } from "./responseModel";

export interface CategoryResponseModel extends responseModel{
    data: Category[]
}