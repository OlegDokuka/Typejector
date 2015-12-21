module Typejector.Annotation {
    import Class = Type.Class;
    import Annotations = Utils.Annotations;

    export function injection(clazz:Class, ...annotations:Function[]):void {
        Annotations.add(injection, {}, clazz);

        annotations.forEach(annotation=>Annotations.add(annotation, {}, clazz))
    }
} 