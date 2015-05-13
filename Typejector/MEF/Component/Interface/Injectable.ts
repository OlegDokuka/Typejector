module Typejector.Component.Interface {
    import Class = Type.Class;
    export interface Injectable {
        clazz: Class;
        isSingleton: boolean;
        creator: Class;
    }
} 