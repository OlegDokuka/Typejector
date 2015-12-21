namespace Typejector.Annotation {
    import Annotations = Utils.Annotations;

    export function postConstructor(target: Object, propertyKey: string): void {
        Annotations.add(postConstructor, {}, target, propertyKey);
    }
}