import {Component} from "./base/Component";
import {ICard} from "../types";
import {bem, createElement, ensureElement} from "../utils/utils";
// import clsx from "clsx";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}



export class Card extends Component<ICard> {
    protected _title: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _text?: HTMLElement;
    protected _button?: HTMLButtonElement;
    protected _price?: HTMLSpanElement

    constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._title = ensureElement<HTMLElement>(`.${blockName}__category`, container);
        this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
        this._button = container.querySelector(`.${blockName}__button`);
        this._text = container.querySelector(`.${blockName}__text`);
        this._price = container.querySelector(`.${blockName}__price`)

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }

    }

    set id(value: string) {
    }

    get id(): string {
    }

    set title(value: string) {
    }

    get title(): string {
    }


    set price(value: string) {
    }

    get price():string {
    }


    set image(value: string) {
    }

    set description(value: string | string[]) {
    }
}