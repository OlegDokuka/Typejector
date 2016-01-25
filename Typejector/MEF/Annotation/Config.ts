module Typejector.Annotation {
    import Class = Type.Class;

    export function config(clazz: Class) {
        component(clazz, config, singleton);
    }

}  