namespace Typejector.Component.Context.Config {
    import DependencyDescriptor = Factory.Config.DependencyDescriptor;
    import AnnotatedObject = Component.Factory.Config.AnnotatedObject;

    export class FieldDependencyDescriptor extends DependencyDescriptor implements AnnotatedObject {
        name: string;
        annotations: Set<Function> = new Set();
    }
}