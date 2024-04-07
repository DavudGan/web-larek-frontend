import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';

interface IModalData {
	content: HTMLElement;
}

// Класс создания и управления модальным окном
export class Modal extends Component<IModalData> {
	// Элемент кнопки закрытия модального окна
	protected _closeButton: HTMLButtonElement;

	//Элемент содержимого модального окна
	protected _content: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._content = ensureElement<HTMLElement>('.modal__content', container);

		this._closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	// Устанавливает содержимое модального окна
	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	// Открывает модальное окно
	open() {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	// Закрывает модальное окно
	close() {
		this.container.classList.remove('modal_active');
		this.content = null;
		this.events.emit('modal:close');
	}

	// Подготовка разметки и открытие модального окна
	render(data: IModalData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
