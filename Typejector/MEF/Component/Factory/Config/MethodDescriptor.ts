module Typejector.Component.Factory.Config {
    import Class = Type.Class;
    
    export class MethodDescriptor implements AnnotatedObject {
        name: string;
        arguments: Array<MethodArgumentDescriptor>;
        returnType: TypeDescriptor;
        annotations: Map<Function, any>;
    }
} 