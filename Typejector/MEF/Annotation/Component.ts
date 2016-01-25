module Typejector.Annotation {
    import Class = Type.Class;

    export function component(clazz: Class, ...annotations: Function[]): void {
        Class.register(clazz);
        Annotations.add(component, {}, clazz);

        annotations.forEach(annotation=> Annotations.add(annotation, {}, clazz))
    }
} 