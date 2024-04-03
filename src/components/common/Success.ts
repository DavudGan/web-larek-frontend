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

    constructor(container: HTMLElement, actions: ISuccessActions) {
        super(container);

        this._close = ;

        if (actions?.onClick) {
            this._close.addEventListener('click', actions.onClick);
        }
    }
}