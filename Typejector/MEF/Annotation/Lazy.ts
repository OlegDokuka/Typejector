namespace Typejector.Annotation {

    export function lazy(target: Object, propertyKey: string | symbol) {
        Annotations.add(lazy, {}, target, propertyKey);
    }
}
