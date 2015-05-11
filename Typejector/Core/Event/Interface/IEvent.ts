// Typejector View Module -------
// Realize Typejector view class and halper classes such as Point and etc.
module Typejector.Event.Interface {
    export interface ICallback<ArgType> {
        (arg: ArgType, context?: any);
    }

    export interface ICallbackDesc<ArgType> {
        Callback: ICallback<ArgType>;
        Subscriber: any;
    }
    /** Базовый интерфейс подписки на событие. Минимальная функциональность. Можем просто отписаться и все. */
    export interface ISubscription {
        Unsubscribe: { (): void };
    }

    /** Типизированная версия. Включает ссылки на событие и callback */
    export interface ITypedSubscription<ArgType> extends ISubscription {
        Callback: ICallback<ArgType>;
        Event: Event<ArgType>;
    }
}
