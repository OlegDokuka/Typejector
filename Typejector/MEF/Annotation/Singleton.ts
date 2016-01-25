module Typejector.Annotation {
    import Class = Type.Class;

    export function singleton(clazz: Class) {
        component(clazz, singleton);
    }

} 