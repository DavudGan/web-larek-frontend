# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Документация

MVP

1. Model (Модель) - класс, который работает с данными, проводит вычисления и руководит всеми бизнес-процессами.
2. View (Вид или представление) - классы, показывающие пользователю интерфейс и данные из модели на экране.
3. Presenter (Представитель) - класс, который обеспечивает связь, является посредником между моделью и видом.

>> Этот проект следует архитектурному шаблону MVP, где каждый класс соответствует одному из компонентов: Model, View или Presenter.

Типы данных

```

//Описание карточки товара
export interface ICard {
    // ID товара
    id:string,

    // описание
    descripption:string | string[],
    
    // ссылка на картинку
    image: string,

    // название
    title: string,

    // ценна товара
    price:number | null,

    // категория
    category:string,
}


//Основные сведения для отображения и управления корзиной
export type IBasketItem = Pick<ICard, 'id'|'title'|'price'>

/*
    Данный интерфейф задает первоначалные состояние приложения.
*/
export interface IAppState {
    // Массив товаров
    catalog: ICard[];

    // Массив товаров в корзине
    basket: string[];

    // Информация о заказе
    order: IOrderForm | null;

    // Предварительный просмотр для указанногой карточки
    setPreview(item: ICard): void;

    //Добавление товаров в массив
    setCatalog(items: ICard[]): void;

    //Добавление товара в корзину
    setBasket(item: IBasketItem): void;

    //Очистка корзины
    clearBasket(): void;
    
    //Получение колличества товаров в корзине
    getBasketLength(): number;

    // Заполнение полей в order
    setOrderField(field: keyof IOrderForm, value: string): void;

    //волидация
    validateOrder(): boolean;
}


//Интерфейс для формы заказа товара
export interface IOrderForm {
    email: string;
    phone: string;
    address: string;
    price:string;
}


//Ошибки валидации для формы заказа
export type FormErrors = Partial<Record<keyof IOrderForm, string>>;
```
Модел данных Model (Model-MVP)

```

// Гарда для проверки на модель
export const isModel = (obj: unknown): obj is Model<any> => {
    return obj instanceof Model;
}

/**
 * Базовая модель, чтобы можно было отличить ее от простых объектов с данными
 */
export abstract class Model<T> {
    constructor(data: Partial<T>, protected events: IEvents) {
        Object.assign(this, data);
    }

    // Сообщить всем что модель поменялась
    emitChanges(event: string, payload?: object) {
        this.events.emit(event, payload ?? {});
    }

}
```
Модел данных AppState (Model-MVP) наследует Model (Model-MVP)

```

export class AppState extends Model<IAppState> {
	basket: CardItem[] = [];
	catalog: CardItem[];
	loading: boolean;
	order: IOrder = {
		address: '',
		payment: '',
		email: '',
		phone: '',
		items: [],
		total: null,
	};
	preview: string | null;
	formErrors: FormErrors = {};

	setItems() {
	}

	setPreview(item: ICard) {
	}

	setCatalog(items: ICard[]) {
	}

	setBasket(value: CardItem) {
	}

	getClosedLots(): CardItem[] {
	}

	placeBid() {
	}

	getSummPriceBascet() {
	}

	deleteItemInBasket(id: string) {
	}

	getIndex(id: string) {
	}

	clearBasket() {
	}

	getBasketLength() {
	}

	setOrderField(field: keyof IOrderForm, value: string) {
	}

	setContactsField(field: keyof IOrderForm, value: string) {
	}

	validateOrder() {
	}

	validateOrderContacts() {
	}
}
```

Класс EventEmitter (Presenter-MVP)  представитель между Model и View

```

type EventName = string | RegExp;
type Subscriber = Function;
type EmitterEvent = {
    eventName: string,
    data: unknown
};

export interface IEvents {
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}


// Брокер событий
export class EventEmitter implements IEvents {
    _events: Map<EventName, Set<Subscriber>>;

    constructor() {
        this._events = new Map<EventName, Set<Subscriber>>();
    }

    /**
     * Установить обработчик на событие
     */
    on<T extends object>(eventName: EventName, callback: (event: T) => void) {
        if (!this._events.has(eventName)) {
            this._events.set(eventName, new Set<Subscriber>());
        }
        this._events.get(eventName)?.add(callback);
    }

    /**
     * Снять обработчик с события
     */
    off(eventName: EventName, callback: Subscriber) {
        if (this._events.has(eventName)) {
            this._events.get(eventName)!.delete(callback);
            if (this._events.get(eventName)?.size === 0) {
                this._events.delete(eventName);
            }
        }
    }

    /**
     * Инициировать событие с данными
     */
    emit<T extends object>(eventName: string, data?: T) {
        this._events.forEach((subscribers, name) => {
            if (name instanceof RegExp && name.test(eventName) || name === eventName) {
                subscribers.forEach(callback => callback(data));
            }
        });
    }

    /**
     * Слушать все события
     */
    onAll(callback: (event: EmitterEvent) => void) {
        this.on("*", callback);
    }

    /**
     * Сбросить все обработчики
     */
    offAll() {
        this._events = new Map<string, Set<Subscriber>>();
    }

    /**
     * Сделать коллбек триггер, генерирующий событие при вызове
     */
    trigger<T extends object>(eventName: string, context?: Partial<T>) {
        return (event: object = {}) => {
            this.emit(eventName, {
                ...(event || {}),
                ...(context || {})
            });
        };
    }
}
```

Класс API (Model-MVP) и ProductAPI (Model-MVP)

```

export type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';


export class Api {
    readonly baseUrl: string;
    protected options: RequestInit;

    constructor(baseUrl: string, options: RequestInit = {}) {
        this.baseUrl = baseUrl;
        this.options = {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers as object ?? {})
            }
        };
    }

    protected handleResponse(response: Response): Promise<object> {
        if (response.ok) return response.json();
        else return response.json()
            .then(data => Promise.reject(data.error ?? response.statusText));
    }

    // Получение данных с сервера
    get(uri: string) {
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method: 'GET'
        }).then(this.handleResponse);
    }

    // Изменение данных на сервере
    post(uri: string, data: object, method: ApiPostMethods = 'POST') {
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method,
            body: JSON.stringify(data)
        }).then(this.handleResponse);
    }
}

// Данный класс наследует основой Api
export class ProductAPI extends Api{
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    //Получение списка товаров 
    getProduct(): Promise<ICard[]> {
        return this.get('/product').then((data: ApiListResponse<ICard>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        );
    }

    //Отправка на сервер заказа
    orderProduct(order: IOrder): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}
```


Класс Component
```
//Базовый компонент
export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {
    }

    // Переключить класс
    toggleClass(element: HTMLElement, className: string, force?: boolean) {
    }

    // Установить текстовое содержимое
    protected setText(element: HTMLElement, value: unknown) {
    }

    // Сменить статус блокировки
    setDisabled(element: HTMLElement, state: boolean) {
    }

    // Скрыть
    protected setHidden(element: HTMLElement) {
        element.style.display = 'none';
    }

    // Показать
    protected setVisible(element: HTMLElement) {
        element.style.removeProperty('display');
    }

    // Установить изображение с алтернативным текстом
    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
    }

    // Вернуть корневой DOM-элемент
    render(data?: Partial<T>): HTMLElement {
    }
}
```

Класс Bascet (View-MVP)
```
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
```
Класс Form (View-MVP)

```
interface IFormState {
    valid: boolean;
    errors: string[];
}

export class Form<T> extends Component<IFormState> {
    // Элемент кнопки отправки формы
    protected _submit: HTMLButtonElement;

    // Элемент для отображения ошибок формы
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
```

Класс Modal (View-MVP)

```

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
```
Класс Success (View-MVP)

```

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

        this._close = ;
        this._price = ;

        if (actions?.onClick) {
            this._close.addEventListener('click', actions.onClick);
        }
    }

    //Установка суммы заказа
    setPrice(value: number){}
}
```
Класс Page (View-MVP)

```

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
```

Описание событий

```
/* Обрабатывает изменение списка товаров и обновляет отображение каталога товаров на странице, 
а также обновляет отображение числа элементов в корзине.
*/
'items:changed'

// Открыть модальное окно карточки
'card:select'

// Обновление модального окна в случае изменения выбранной карточки
'preview:changed'

// Блокировка прокрутки страницы если открыта модальное окно
'modal:open'

// Разблокировка прокрутки страницы если закрыта модальное окно
'modal:close'

// При клике на корзину в главном меню открывается модальное окно с товарами
'basket:open'

// При нажатии на кнопку "Оформить" открывается модальное окно для оформления заказа - адресс, способ оплаты
'order:open'

// При нажатии на кнопку "Далее" открывается модальное окно для оформления заказа - телефон, email
'orderContacts:open'

// Изменилось одно из полей order
/^order\..*:change/

// Изменилось одно из полей contacts
/^contacts\..*:change/,

// Изменилось состояние валидации формы ввода адресса и выбора оплаты
'formErrors:change'

// Изменилось состояние валидации контактов
'contactsFormErrors:change'


// Отправлена форма заказа
// При успешном совершении заказа открывается модальное окно об успешной оплате
'order:submit'
```