namespace Typejector.Component.Context.Config {
    import TypeDescriptor = Factory.Config.TypeDescriptor;
    import AnnotatedObject = Component.Factory.Config.AnnotatedObject;

    export class BeanDescriptor extends TypeDescriptor implements AnnotatedObject {
        annotations: Set<Function> = new Set();
    }
}