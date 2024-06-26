//Описание карточки товара
export interface ICard {
	// ID товара
	id: string;

	// описание
	description: string | string[];

	// ссылка на картинку
	image: string;

	// название
	title: string;

	// ценна товара
	price: number;

	// категория
	category: string;
}

//Основные сведения для отображения и управления корзиной
export type IBasketItem = Pick<ICard, 'id' | 'title' | 'price'>;

/*
    Данный интерфейф задает первоначалные состояние приложения.
*/
export interface IAppState {
	// Массив товаров
	catalog: ICard[];

	// Массив товаров в корзине
	basket: string[];

	// информация о заказе
	order: IOrderForm | null;

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
	payment: string;
}

export interface IOrder extends IOrderForm {
	items: string[];
	total: number;
}

//Ошибки валидации для формы заказа
export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

export interface IOrderResult {
	id: string;
}
