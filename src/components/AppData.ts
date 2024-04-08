import { Model } from './base/Model';
import { FormErrors, IAppState, ICard, IOrder, IOrderForm } from '../types';

export class CardItem extends Model<ICard> {
	id: string;

	description: string | string[];

	image: string;

	title: string;

	price: number;

	category: string;

	placeBid(): void {
		this.emitChanges('auction:changed');
	}
}

export class AppState extends Model<IAppState> {
	basket: CardItem[] = [];
	catalog: CardItem[];
	loading: boolean;
	order: IOrder = {
		address: '',
		payment: '',
		email: '',
		phone: '',
		items: [],
		total: null,
	};
	preview: string | null;
	formErrors: FormErrors = {};

	setItems() {
		this.order.items = this.basket.map((item) => item.id);
	}

	setPreview(item: ICard) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	setCatalog(items: CardItem[]) {
		this.catalog = items;
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	setBasket(value: CardItem) {
		this.basket.push(value);
	}

	getClosedLots(): CardItem[] {
		return this.basket;
	}

	placeBid() {
		this.emitChanges('auction:changed');
	}

	getSummPriceBascet() {
		let sum = 0;
		if (this.basket.length > 0) {
			this.basket.forEach((item) => {
				sum += item.price;
			});
		} else {
			return (sum = 0);
		}
		return sum;
	}

	deleteItemInBasket(id: string) {
		let i = this.basket.findIndex((item) => item.id == id);
		this.basket.splice(i, 1);
		this.emitChanges('auction:changed');
	}

	getIndex(id: string) {
		// return this.basket.lastIndexOf((item: CardItem) => item.id == id);
		const filteredItems = this.basket.filter((item) => item.id === id);
		return filteredItems.length > 0
			? this.basket.lastIndexOf(filteredItems[filteredItems.length - 1])
			: -1;
	}

	clearBasket() {
		this.basket = [];
	}

	getBasketLength() {
		return this.basket.length;
	}

	setOrderField(field: keyof IOrderForm, value: string) {
		this.order[field] = value;

		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}

		if (this.validateOrderContacts()) {
			this.events.emit('contacts:ready', this.order);
		}
	}

	setContactsField(field: keyof IOrderForm, value: string) {
		this.order[field] = value;

		if (this.validateOrderContacts()) {
			this.events.emit('contacts:ready', this.order);
		}
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.address) {
			errors.address = 'Необходимо указать адресс';
		}
		if (!this.order.payment) {
			errors.payment = 'Необходимо указать способ оплаты';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	validateOrderContacts() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать почту';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать номер телефона';
		}
		this.formErrors = errors;
		this.events.emit('contactsFormErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}
