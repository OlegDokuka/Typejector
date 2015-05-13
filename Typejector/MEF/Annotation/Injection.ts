module Typejector.Annotation {
    import Injector = Component.Injector;
    import Class = Type.Class;

    export function injection(isSingleton?: boolean)
    export function injection(clazz: Class)
    export function injection(clazz: Class|boolean, exportAs: Class)
    export function injection(value: any = true, exportAs?: Class) {
        if (typeof value === typeof true && !exportAs) {
            return (clazz: Class) => {
                Injector.register({ isSingleton: value, clazz: clazz, creator: clazz });
            }
        }
        else if (exportAs) {
            return (clazz: Class) => {
                if (!(clazz.prototype instanceof exportAs)) {
                    throw new Error("Current class should be prototype of exported");
                }
                Injector.register({
                    isSingleton: typeof value === typeof true ? value : true,
                    clazz: clazz,
                    creator: clazz
                });

                Injector.register({
                    isSingleton: typeof value === typeof true ? value : true,
                    clazz: exportAs,
                    creator: clazz
                });
            }
        }
        else {
            Injector.register({ isSingleton: true, clazz: value, creator: value });
        }
    }
} 