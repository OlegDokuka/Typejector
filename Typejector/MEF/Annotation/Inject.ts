module Typejector.Annotation {
    import Annotations = Utils.Annotations;

    export function inject(target:Object, propertyKey:string | symbol) {
        Annotations.add(inject, {}, target, propertyKey);
    }
} 