import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

interface IFormState {
	valid: boolean;
	errors: string[];
}

export class Form<T> extends Component<IFormState> {
	// Элемент кнопки отправки формы
	protected _submit: HTMLButtonElement;

	//Элемент для отображения ошибок формы
	protected _errors: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);

		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

		// Слушатели событий на input и submit, чтобы реагировать на изменения и отправку формы
		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			// this.events.emit(`${this.container.name}:submit`);
			events.emit('orderContacts:open');
		});
	}

	// Изменении значения поля ввода формы. Отправляет событие с новым значением поля
	protected onInputChange(field: keyof T, value: string) {
		this.events.emit(`${this.container.name}.${String(field)}:change`, {
			field,
			value,
		});
	}

	// Устанавливает доступность кнопки отправки
	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

	// Устанавливает текст ошибок формы
	set errors(value: string) {
		this.setText(this._errors, value);
	}

	// Отображает состояние формы, обновляя валидность, ошибки и значения полей ввода
	render(state: Partial<T> & IFormState) {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}

export interface IContacts {
	// Телефон
	phone: string;

	// Электронная почта
	email: string;
}

export class Contacts extends Form<IContacts> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			events.emit('order:submit');
		});
	}
}
