module Typejector.Component.Factory.Config {
    import Class = Type.Class;
    export interface MethodDescriptor {
        name: string;
        arguments: Array<TypeDescriptor>;
    }
} 