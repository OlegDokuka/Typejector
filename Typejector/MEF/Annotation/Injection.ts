module Typejector.Annotation {
    import Injector = Component.Injector;
    export function injection(isSingleton?: boolean) 
    export function injection(clazz: any)
    export function injection(value: any = true) {
        if (typeof value === typeof true) {
            return (clazz: { new (): any }) => {
                Injector.register({ isSingleton: value, clazz: clazz });
            }
        }
        else {
            Injector.register({ isSingleton: true, clazz: value });
        }
    }
} 