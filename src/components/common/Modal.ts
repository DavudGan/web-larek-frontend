import {Component} from "../base/Component";
import {ensureElement} from "../../utils/utils";
import {IEvents} from "../base/events";

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

        this._closeButton = ;
        this._content = ;

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

    }

    // Закрывает модальное окно
    close() {

    }

    // Подготовка разметки и открытие модального окна
    render(data: IModalData): HTMLElement {
    }
}