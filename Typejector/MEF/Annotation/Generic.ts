namespace Typejector.Annotation {
    import Class = Typejector.Type.Class;

    export function generic(...classes: Class[]) {
        return (target: Object, propertyKey: string | symbol, paramIndex?: any) =>
            Annotations.add(generic, classes, target, propertyKey, paramIndex instanceof Number ? paramIndex : undefined);
    }
}