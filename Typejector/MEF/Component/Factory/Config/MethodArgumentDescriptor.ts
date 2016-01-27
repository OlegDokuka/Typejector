module Typejector.Component.Factory.Config {
    import Class = Type.Class;
    export class MethodArgumentDescriptor implements AnnotatedObject {
        index: number;
        type: TypeDescriptor;
        methodDescriptor: MethodDescriptor;
        annotations: Map<Function, any>;
    }
} 