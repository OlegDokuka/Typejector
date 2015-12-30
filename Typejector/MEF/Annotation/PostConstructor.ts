namespace Typejector.Annotation {

    export function postConstructor(target: Object, propertyKey: string): void {
        Annotations.add(postConstructor, {}, target, propertyKey);
    }
}