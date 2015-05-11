module Typejector.Component.Interface {
    import Class = Type.Class;
    export interface Singleton<T> {
        clazz: Class;
        instance: T;
    }
}