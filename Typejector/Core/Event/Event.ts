/// <reference path="Interface/IEvent.ts" />
// Typejector View Module -------
// Realize Typejector view class and halper classes such as Point and etc.
module Typejector.Event {
    export class Event<ArgType>
    {
        private Callbacks: Interface.ICallbackDesc<ArgType>[] = [];

        /** Подписаться на событие
        * @param {ICallback<ArgType>} callback Callback, который будет вызван при вызове функции
        * @param {any} subscriber Контекст, в котором должен быть вызван callback
        * @returns {ITypedSubscription<ArgType>} Объект типизированной подписки
        */
        public Subscribe(callback: Interface.ICallback<ArgType>, subscriber: any): Interface.ITypedSubscription<ArgType> {
            var that = this,
                res: Interface.ITypedSubscription<ArgType> =
                    {
                        Callback: callback,
                        Event: that,
                        Unsubscribe: function () { that.Unsubscribe(callback); }
                    }

            this.Callbacks.push({ Callback: callback, Subscriber: subscriber });

            return res;
        }

        /**
        *   Unsubscribe some callback from current event
        *   @param {Interface.ICallback<ArgType>} subscribet callback
        **/
        public Unsubscribe(callback: Interface.ICallback<ArgType>): void {
            var filteredList: Interface.ICallbackDesc<ArgType>[] = [];

            for (var i = 0; i < this.Callbacks.length; i++) {
                if (this.Callbacks[i].Callback !== callback) {
                    filteredList.push(this.Callbacks[i]);
                }
            }

            this.Callbacks = filteredList;
        }

        public Trigger: Interface.ICallback<ArgType> = function (arg: ArgType, context?: any) {
            var callbacks: Interface.ICallbackDesc<ArgType>[] = this.Callbacks,
                callback: Interface.ICallbackDesc<ArgType>;

            for (var i = 0; i < callbacks.length; i++) {
                callback = callbacks[i];
                callback.Callback.apply(callback.Subscriber, [arg, context]);
            }
        }
    }
}

