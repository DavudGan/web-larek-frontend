import {Model} from "./base/Model";
import {FormErrors, IAppState, ICasrd, IOrderForm, IBasketItem} from "../types";

export class AppState extends Model<IAppState> {
    basket: [];
    catalog: ICasrd[];
    loading: boolean;
    order: IOrderForm = {
        address:'',
        email: '',
        phone: '',
        price:''
    };

    formErrors: FormErrors = {};

    setPreview(item: ICasrd) {
    }
    
    setCatalog(items: ICasrd[]) {
    }

    setBasket(item: IBasketItem) {
    }

    cleansBascet(){
    }

    getBasketLength(){
    }

    setOrderField(field: keyof IOrderForm, value: string) {
    }

    validateOrder() {
    }
}