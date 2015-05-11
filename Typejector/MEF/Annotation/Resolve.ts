module Typejector.Annotation {
    import Class = Type.Class;
    import Resolver = Component.Resolver;
    import Injector = Component.Injector;

    var __extends =  function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        __.prototype = b.prototype;
        d.prototype = new __();
    }

    export function resolve(clazz: Class) {
        let classWrapper = function (...argArray: any[]) {
            let dependencyList = Resolver.resolve(clazz);

            for (let propertyName in dependencyList) {
                let propertyType = dependencyList[propertyName];
                this[propertyName] = Injector.instance(propertyType);
            }

            clazz.apply(this, argArray);
        };
        __extends(classWrapper, clazz);
        return <any>classWrapper;
    }
}