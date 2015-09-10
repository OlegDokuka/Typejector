namespace Typejector.Component.Context.Config {
    import DependencyDescriptor = Factory.Config.DependencyDescriptor;
    import MethodDescriptor = Factory.Config.MethodDescriptor;

    export class MethodDependencyDescriptor extends FieldDependencyDescriptor implements MethodDescriptor {
        arguments: Array<FieldDependencyDescriptor>;
    }
}