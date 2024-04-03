import { Api, ApiListResponse } from './base/api';
import {ICasrd} from "../types";


export interface IProductAPI {
    getProduct: () => Promise<ICasrd[]>;
}

export class PeoductAPI extends Api implements IProductAPI {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProduct(): Promise<ICasrd[]> {
        return this.get('/product').then((data: ApiListResponse<ICasrd>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        );
    }

}