import {Model} from "./base/Model";
import {FormErrors, IAppState, ICard, IOrderForm, IBasketItem} from "../types";

export class AppState extends Model<IAppState> {
    basket: [];
    catalog: ICard[];
    loading: boolean;
    order: IOrderForm = {
        address:'',
        email: '',
        phone: '',
        price:''
    };

    formErrors: FormErrors = {};

    setPreview(item: ICard) {
    }
    
    setCatalog(items: ICard[]) {
    }

    setBasket(item: IBasketItem) {
    }

    clearBasket(){
    }

    getBasketLength(){
    }

    setOrderField(field: keyof IOrderForm, value: string) {
    }

    validateOrder() {
    }
}