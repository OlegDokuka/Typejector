namespace Typejector.Component.Context.Config {
    import DependencyDescriptor = Factory.Config.DependencyDescriptor;

    export class ArgumentDependencyDescriptor extends DependencyDescriptor {
        position: number;
        methodName: string;
    }
}