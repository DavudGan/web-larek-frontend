import { Form } from './common/Form';
import { IOrderForm } from '../types';
import { IEvents } from './base/events';

export interface IOrder {
	// Адрес
	address: string;

	// Способ оплаты
	payment: string;
}

// Предоставляет возможность работы с формой заказа
export class Order extends Form<IOrder> {
	// Сссылки на внутренние элементы
	protected _card?: HTMLButtonElement;
	protected _cash?: HTMLButtonElement;

	// Конструктор принимает имя блока, родительский элемент и обработчик событий
	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container, events);

		this._card = container.elements.namedItem('card') as HTMLButtonElement;
		this._cash = container.elements.namedItem('cash') as HTMLButtonElement;

		if (this._cash) {
			this._cash.addEventListener('click', () => {
				this._cash.classList.add('button_alt-active');
				this._card.classList.remove('button_alt-active');
				this.onInputChange('payment', 'cash');
			});
		}
		if (this._card) {
			this._card.addEventListener('click', () => {
				this._card.classList.add('button_alt-active');
				this._cash.classList.remove('button_alt-active');
				this.onInputChange('payment', 'card');
			});
		}
	}

	// Метод, отключающий подсвечивание кнопок
	disableButtons() {
		this._cash.classList.remove('button_alt-active');
		this._card.classList.remove('button_alt-active');
	}
}
