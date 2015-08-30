namespace Typejector.Component.Factory {

    export interface ObjectFactory<T> {
        getObject(): T;
    }
} 