namespace Typejector.Component.Factory.Support {
    import Class = Typejector.Type.Class;
    import BeanDefinition = Typejector.Component.Factory.Config.BeanDefinition;
    import Scope = Typejector.Component.Factory.Config.Scope;

    export class Provider<T> implements TypedPropertyDescriptor<T> {
        private cachedValue: T;
        private getter: () => T;
        configurable: boolean = true;
        enumerable: boolean = true;

        get = (): T=> {
            if (this.cachedValue == undefined) {
                this.cachedValue = this.getter();
            }

            return this.cachedValue;
        }
        
        set = (value: T): void => {
            this.cachedValue = value;
        }

        public static of<T>(getter: () => T): Provider<T> {
            assert(getter);

            const provider = new Provider<T>();

            provider.getter = getter;

            return provider;
        }
    }
}