namespace Typejector.Annotation {
    export function postConstructor(target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void
    export function postConstructor(order: number): any
    export function postConstructor(target: any, propertyKey?: string | symbol, descriptor?: PropertyDescriptor): any {
        if (propertyKey && descriptor) {

        }
        else {
            return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
                postConstructor(target, propertyKey, descriptor);
            }
        }
    }
}