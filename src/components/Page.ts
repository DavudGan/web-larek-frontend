import {Component} from "./base/Component";
import {IEvents} from "./base/events";
import {ensureElement} from "../utils/utils";

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
        this._counter = ;

        // Элемент каталога товаров
        this._catalog = ;

        // Элемент-обертка для главной страницы
        this._wrapper = ;

        // Элемент корзины
        this._basket = ;

        // слушатель события клика на элемент корзины для открытия списка ставок
        this._basket.addEventListener('click', () => {
        });
    }

    // Устанавливает значение счетчика корзины
    set counter(value: number) {
    }

    // Устанавливает элементы каталога товаров
    set catalog(items: HTMLElement[]) {
    }

    // Устанавливает блокировку или разблокировку главной страницы
    set locked(value: boolean) {
    }
}