namespace Typejector.Annotation {
    import PostConstructorDependencyDescriptor = Component.Context.Config.PostConstructorDependencyDescriptor;

    export function postConstructor(target: Object, propertyKey: string, descriptor: PropertyDescriptor): void
    export function postConstructor(target: Object, propertyKey: string, descriptor: PropertyDescriptor, order: number): void
    export function postConstructor(order: number): any
    export function postConstructor(target: any, propertyKey?: string, descriptor?: PropertyDescriptor, order?: number): any {
        if (propertyKey && descriptor) {
            let descriptor = new PostConstructorDependencyDescriptor();
            descriptor.parent = target.constructor;
            descriptor.name = propertyKey;
            descriptor.order = order;

            Typejector.getContext().register(descriptor);
        }
        else {
            return (parent: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
                postConstructor(parent, propertyKey, descriptor, target);
            }
        }
    }
}