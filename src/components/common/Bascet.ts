import { Component } from '../base/Component';
import { createElement, ensureElement } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { CardItem } from '../AppData';

interface IBasketView {
	items: HTMLElement[];
	total: number;
	button: HTMLElement;
}

export class Basket extends Component<IBasketView> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.basket__button');

		// Установит Event на нажатие по кнопке
		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('order:open');
			});
		}

		// Массив элементов в корзине
		this.items = [];
	}

	// Передача элемента в корзину для отображения
	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

	set selected(items: CardItem[]) {
		if (items.length) {
			this.setDisabled(this._button, false);
		} else {
			this.setDisabled(this._button, true);
		}
	}

	// Установка ценны
	set total(total: number) {
		this.setText(
			this._total,
			(total + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' синапсов'
		);
	}
}
