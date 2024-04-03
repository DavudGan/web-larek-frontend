


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