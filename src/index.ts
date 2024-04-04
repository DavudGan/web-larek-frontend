import './scss/styles.scss';

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

// При нажатии на кнопку "Оплатить" открывается модальное окно для оформления заказа
'basket:submit'

// Проверка ввода данных пользователя в форме заказа
'orderFormErrors:change'

// При успешном совершении заказа открывается модальное окно об успешной оплате
'order:success'

