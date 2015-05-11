module Typejector.Annotation {
    import Resolver = Component.Resolver;
    import Class = Type.Class

    export function inject(requestType: Class){
        return (prototype: any, propertyName: string) => {
            Resolver.request(prototype.constructor, propertyName, requestType); 
        }
    }
} 