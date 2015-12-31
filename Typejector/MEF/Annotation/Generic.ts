module Typejector.Annotation {

    export function generic(target:Object, propertyKey:string | symbol) {
        Annotations.add(generic, {}, target, propertyKey);
    }
}