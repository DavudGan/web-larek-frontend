import {Component} from "../base/Component";
import {createElement} from "../../utils/utils";
import {EventEmitter} from "../base/events";

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
        this._list = ;
        this._total = ;
        this._button = ;

        // Установит Event на нажатие по кнопке
        if (this._button) {
        }

        // Массив элементов в корзине
        this.items = [];
    }

    // Передача элемента в корзину для отображения
    set items(items:HTMLElement[]) {
    }

    // Установка ценны
    set total(total: number) {
    }
}