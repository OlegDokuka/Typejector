namespace Typejector.Annotation {
    import MethodDependencyDescriptor = Component.Context.Config.MethodDependencyDescriptor;

    export function postConstructor(target: Object, propertyKey: string, descriptor: PropertyDescriptor): void;
    export function postConstructor(target: Object, propertyKey: string, descriptor: PropertyDescriptor, order: number): void;
    export function postConstructor(order: number): MethodDecorator;
    export function postConstructor(target: any, propertyKey?: string, descriptor?: PropertyDescriptor, order?: number): any {
        if (propertyKey && descriptor) {
            const dependencyDescriptor = new MethodDependencyDescriptor();

            dependencyDescriptor.parent = target.constructor;
            dependencyDescriptor.name = propertyKey;
            dependencyDescriptor.annotations.push(postConstructor);

            Typejector.getContext().register(dependencyDescriptor);
        }
        else {
            return (parent: Object, propertyName: string, propertyDescriptor: PropertyDescriptor) => {
                postConstructor(parent, propertyName, propertyDescriptor, target);
            };
        }
    }
}