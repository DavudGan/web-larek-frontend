import {Component} from "../base/Component";
import {IEvents} from "../base/events";
import {ensureElement} from "../../utils/utils";

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

        this._submit = ;
        this._errors = ;


        // Слушатели событий на input и submit, чтобы реагировать на изменения и отправку формы
        this.container.addEventListener('input', (e: Event) => {
        });

        this.container.addEventListener('submit', (e: Event) => {
        });
    }

    // Изменении значения поля ввода формы. Отправляет событие с новым значением поля
    protected onInputChange(field: keyof T, value: string) {
    }

    // Устанавливает доступность кнопки отправки
    set valid(value: boolean) {
    }

    // Устанавливает текст ошибок формы
    set errors(value: string) {
    }

    // Отображает состояние формы, обновляя валидность, ошибки и значения полей ввода
    render(state: Partial<T> & IFormState) {
    }
}