import { Component } from './base/Component';
// import {ICard} from "../types";
import { bem, createElement, ensureElement } from '../utils/utils';
// import clsx from "clsx";

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export interface ICard {
	title: string;
	description: string | string[];
	image: string;
	price: number;
	category: string;
	index: string;
}

export class Card extends Component<ICard> {
	protected _category?: HTMLSpanElement;
	protected _title?: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _text?: HTMLElement;
	protected _button?: HTMLButtonElement;
	protected _price?: HTMLSpanElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardActions
	) {
		super(container);

		this._category = container.querySelector(`.${blockName}__category`);
		this._image = container.querySelector(`.${blockName}__image`);
		this._button = container.querySelector(`.${blockName}__button`);
		this._text = container.querySelector(`.${blockName}__text`);
		this._price = container.querySelector(`.${blockName}__price`);
		this._title = container.querySelector(`.${blockName}__title`);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set category(value: string) {
		this.setText(this._category, value);
		switch (this._category.textContent) {
			case 'другое':
				this._category.style.background = 'rgba(250, 216, 131, 1)';
				break;

			case 'дополнительное':
				this._category.style.background = 'rgba(183, 131, 250, 1)';
				break;

			case 'кнопка':
				this._category.style.background = 'rgba(131, 221, 250, 1)';
				break;

			case 'хард-скил':
				this._category.style.background = 'rgba(250, 160, 131, 1)';
				break;

			case 'софт-скил':
				this._category.style.background = 'rgba(131, 250, 157, 1)';
				break;
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set price(value: string) {
		if (value) {
			this.setText(
				this._price,
				(value + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' синапсов'
			);
		} else {
			this.setText(this._price, 'Бесценно');
		}
	}

	get price(): string {
		return this._price.textContent;
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set description(value: string | string[]) {
		if (Array.isArray(value)) {
			this._text.replaceWith(
				...value.map((str) => {
					const descTemplate = this._text.cloneNode() as HTMLElement;
					this.setText(descTemplate, str);
					return descTemplate;
				})
			);
		} else {
			this.setText(this._text, value);
		}
	}
}

export type CatalogItemStatus = {
	label: string;
};

export class CatalogItem extends Card {
	constructor(container: HTMLElement, actions?: ICardActions) {
		super('card', container, actions);
	}
}

export class CardsItem extends Card {
	protected _index?: HTMLSpanElement;
	constructor(container: HTMLElement, actions?: ICardActions) {
		super('card', container, actions);

		this._index = container.querySelector(`.basket__item-index`);
	}
	set index(value: string) {
		this.setText(this._index, value);
	}

	get index(): string {
		return this._index.textContent;
	}
}

export class BidItem extends Card {
	protected _amount: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super('basket', container, actions);
		// this._amount = ensureElement<HTMLElement>(`.basket__item-index`, container);
	}
}
