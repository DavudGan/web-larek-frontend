import './scss/styles.scss';
import { ProductAPI } from './components/ProductAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { AppState, CardItem } from './components/AppData';
import { Page } from './components/Page';
import { Modal } from './components/common/Modal';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { CatalogItem, CardsItem, BidItem } from './components/Card';
import { Basket } from './components/common/Bascet';
import { Order } from './components/Order';
import { IOrderForm } from './types';
import { Contacts } from './components/common/Form';
import { Success } from './components/common/Success';

const api = new ProductAPI(CDN_URL, API_URL);
const events = new EventEmitter();


//Шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const orderContactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Модель данных приложения
const appData = new AppState({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);
const orderContacts = new Contacts(
	cloneTemplate(orderContactsTemplate),
	events
);

basket.selected = appData.basket;

// Получаем лоты с сервера
api
	.getProduct()
	.then(appData.setCatalog.bind(appData))
	.catch((err) => {
		console.error(err);
	});

/* Обрабатывает изменение списка товаров и обновляет отображение каталога товаров на странице, 
а также обновляет отображение числа элементов в корзине.
*/
events.on('items:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new CatalogItem(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			category: item.category,
			title: item.title,
			image: item.image,
			price: item.price,
		});
	});
});

// Открыть модальное окно карточки
events.on('card:select', (item: CardItem) => {
	appData.setPreview(item);
});

// При клике на корзину в главном меню открывается модальное окно с товарами
events.on('basket:open', () => {
	modal.render({
		content: createElement<HTMLElement>('div', {}, [basket.render()]),
	});
});

// Изменения в лоте
events.on('auction:changed', () => {
	let index = 1
	page.counter = appData.getBasketLength();
	basket.items = appData.getClosedLots().map((item) => {
		const card = new CardsItem(cloneTemplate(cardBasket), {
			onClick: () => {
				appData.deleteItemInBasket(item.id);
				// appData.getSummPriceBascet();
			},
		});
		return card.render({
			title: item.title,
			price: item.price,
            index:(index++ + '')
		});
	});
	
	basket.selected = appData.basket;
	basket.total = appData.getSummPriceBascet();
});

// Изменен открытый выбранный лот
events.on('preview:changed', (item: CardItem) => {
	const showItem = (item: CardItem) => {
		const card = new CardsItem(cloneTemplate(cardPreviewTemplate), {
			onClick: () => {
				appData.basket.push(item);
				appData.getSummPriceBascet();
				appData.placeBid();
				modal.close();
			},
		});
		modal.render({
			content: card.render({
				category: item.category,
				title: item.title,
				image: item.image,
				price: item.price,
				description: item.description,
			}),
		});
	};
	if (item) {
		showItem(item);
	} else {
		modal.close();
	}
});

// Блокировка прокрутки страницы если открыта модальное окно
events.on('modal:open', () => {
	page.locked = true;
});

// Разблокировка прокрутки страницы если закрыта модальное окно
events.on('modal:close', () => {
	page.locked = false;
});

// При нажатии на кнопку "Оформить" открывается модальное окно для оформления заказа - адресс, способ оплаты
events.on('order:open', () => {
	modal.render({
		content: order.render({
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

// При нажатии на кнопку "Далее" открывается модальное окно для оформления заказа - телефон, email
events.on('orderContacts:open', () => {
	modal.render({
		content: orderContacts.render({
			valid: false,
			errors: [],
		}),
	});
});

// Изменилось одно из полей order
events.on(
	/^order\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

// Изменилось одно из полей contacts
events.on(
	/^contacts\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		appData.setContactsField(data.field, data.value);
	}
);


// Изменилось состояние валидации формы ввода адресса и выбора оплаты
events.on('formErrors:change', (errors: Partial<IOrderForm>) => {
	const { address, payment } = errors;
	order.valid = !address && !payment;
	order.errors = Object.values({ address, payment })
		.filter((i) => !!i)
		.join('; ');
});

// Изменилось состояние валидации контактов
events.on('contactsFormErrors:change', (errors: Partial<IOrderForm>) => {
	const { email, phone } = errors;
	orderContacts.valid = !email && !phone;
	orderContacts.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});



// Отправлена форма заказа
// При успешном совершении заказа открывается модальное окно об успешной оплате
events.on('order:submit', () => {
	appData.setItems();
    appData.order.total = appData.getSummPriceBascet()
	api.orderProduct(appData.order)
		.then((result) => {
			const success = new Success(cloneTemplate(successTemplate), {
				onClick: () => {
					modal.close();
					appData.clearBasket();
					events.emit('auction:changed');
				},
                
			});
success.setPrice(appData.getSummPriceBascet())
			modal.render({
				content: success.render({
                }),
			});
		})
		.catch((err) => {
			console.error(err);
		});
});

