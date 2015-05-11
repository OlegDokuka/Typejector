module Typejector.Annotation {
    import Class = Type.Class;
    import Resolver = Component.Resolver;
    import Injector = Component.Injector;

    declare var __extends;

    export function resolve(clazz: Class) {
        let classWrapper = function (...argArray: any[]) {
            clazz.apply(this, argArray);
            let dependencyList = Resolver.resolve(clazz);

            for (let propertyName in dependencyList) {
                let propertyType = dependencyList[propertyName];
                this[propertyName] = Injector.instance(propertyType);
            }
        };
        __extends(classWrapper, clazz);
        return <any>classWrapper;
    }
}