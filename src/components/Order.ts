import {Form} from "./common/Form";
import {IOrderForm} from "../types";
import {IEvents} from "./base/events";

// Предоставляет возможность работы с формой заказа
export class Order extends Form<IOrderForm> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    // Устанавливает значение в поле ввода phone
    set phone(value: string) {
        
    }

    // Устанавливает значение в поле ввода email
    set email(value: string) {
        
    }

    // Устанавливает значение в поле ввода address
    set address(value: string) {
        
    }
}