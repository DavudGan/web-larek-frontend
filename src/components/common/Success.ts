import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

interface ISuccess {
	total: number;
}

interface ISuccessActions {
	onClick: () => void;
}

// Элемент для отображения успешного состояния
export class Success extends Component<ISuccess> {
	// Элемент, предназначенный для закрытия состояния
	protected _close: HTMLElement;

	//Отображение суммы заказа
	protected _price: HTMLElement;

	constructor(container: HTMLElement, actions: ISuccessActions) {
		super(container);

		this._close = ensureElement<HTMLElement>(
			'.order-success__close',
			this.container
		);
		this._price = ensureElement<HTMLElement>(
			'.order-success__description',
			this.container
		);

		if (actions?.onClick) {
			this._close.addEventListener('click', actions.onClick);
		}
	}

	setPrice(value: number) {
		this.setText(
			this._price,
			'Списано ' +
				(value + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') +
				' синапсов'
		);
	}
}
