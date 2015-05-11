module Typejector.Component.Interface {
    import Class = Type.Class;
    export interface Resolvable {
        clazz: Class;
        dependencyList: {
            [n: string]: Class;
        }
    }
} 