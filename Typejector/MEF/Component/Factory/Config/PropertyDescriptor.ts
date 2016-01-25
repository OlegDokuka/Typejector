module Typejector.Component.Factory.Config {
    import Class = Type.Class;
    export interface PropertyDescriptor extends AnnotatedObject {
        name: string;
        type: TypeDescriptor;
    }
} 