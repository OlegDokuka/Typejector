module Typejector.Component.Factory.Config {
    import Class = Type.Class;
    
    export class PropertyDescriptor implements AnnotatedObject {
        name: string;
        type: TypeDescriptor;
        annotations: Map<Function, any>;
    }
} 