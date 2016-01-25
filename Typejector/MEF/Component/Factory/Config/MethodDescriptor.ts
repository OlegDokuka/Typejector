module Typejector.Component.Factory.Config {
    import Class = Type.Class;
    export interface MethodDescriptor extends AnnotatedObject {
        name: string;
        arguments: Array<MethodArgumentDescriptor>;
        returnType: TypeDescriptor;
    }
} 