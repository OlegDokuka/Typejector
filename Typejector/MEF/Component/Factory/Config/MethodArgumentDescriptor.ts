module Typejector.Component.Factory.Config {
    import Class = Type.Class;
    export interface MethodArgumentDescriptor extends AnnotatedObject {
        index: number;
        type: TypeDescriptor;
        methodDescriptor: MethodDescriptor;
    }
} 