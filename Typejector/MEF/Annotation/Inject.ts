module Typejector.Annotation {
    export function inject(target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata("design:annotation", inject, target, propertyKey);
    }
} 