namespace Typejector.Component.Factory.Config {
    import Class = Typejector.Type.Class;

    export class ReferenceDescriptor extends TypeDescriptor {
        parentBeanName: string;
        occurrence: AnnotatedObject;
    }
} 