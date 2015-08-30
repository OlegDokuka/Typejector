module Typejector.Annotation {
    import Class = Type.Class;

    export function interface(clazz: Class) {
        injection(clazz, new Component.Metadata.InterfaceMetadata());
    }

}  