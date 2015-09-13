namespace Typejector.Component.Context.Config {
    import DependencyDescriptor = Factory.Config.DependencyDescriptor;
    import MethodDescriptor = Factory.Config.MethodDescriptor;
    import TypeDescriptor = Factory.Config.TypeDescriptor;

    export class PostConstructorDependencyDescriptor extends MethodDependencyDescriptor {
        order: number;
    }
}