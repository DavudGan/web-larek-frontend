import { Api, ApiListResponse } from './base/api';
import { ICard, IOrderResult } from '../types';
import { IOrder } from './Order';

export interface IProductAPI {
	getProduct: () => Promise<ICard[]>;
	orderLots: (order: IOrder) => Promise<IOrderResult>;
}

export class ProductAPI extends Api implements IProductAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}
	orderLots: (order: IOrder) => Promise<IOrderResult>;

	getProduct(): Promise<ICard[]> {
		return this.get('/product').then((data: ApiListResponse<ICard>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	orderProduct(order: IOrder): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}
