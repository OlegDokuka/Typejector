namespace Typejector.Component.Factory.Config {
    import Class = Typejector.Type.Class;

    export class ReferenceDescriptor extends TypeDescriptor implements AnnotatedObject {
        parentBeanName: string;
        occurrence: AnnotatedObject;
        annotations: Map<any, any>;
    }
} 