module Typejector.Component.Factory.Config {
    import Class = Type.Class;
    export class TypeDescriptor {
        clazz: Class;
        genericTypes: Array<Class>;
    }
} 