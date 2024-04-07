import { Component } from './base/Component';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

// Предоставляет функциональность для управления элементами на главной странице
export class Page extends Component<IPage> {
	protected _counter: HTMLElement;
	protected _catalog: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		// Элемент счетчика корзины
		this._counter = ensureElement<HTMLElement>('.header__basket-counter');

		// Элемент каталога товаров
		this._catalog = ensureElement<HTMLElement>('.gallery');

		// Элемент-обертка для главной страницы
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');

		// Элемент корзины
		this._basket = ensureElement<HTMLElement>('.header__basket');

		// слушатель события клика на элемент корзины для открытия списка ставок
		this._basket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	// Устанавливает значение счетчика корзины
	set counter(value: number) {
		this.setText(this._counter, String(value));
	}

	// Устанавливает элементы каталога товаров
	set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}

	// Устанавливает блокировку или разблокировку главной страницы
	set locked(value: boolean) {
		if (value) {
			this._wrapper.classList.add('page__wrapper_locked');
		} else {
			this._wrapper.classList.remove('page__wrapper_locked');
		}
	}
}
